import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
const prisma = new PrismaClient();

export const signup = async (req, res) => {
  const { email, username, password } = req.body;
  const userData = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (userData) {
    res.status(404).send({ mssg: "User already exists" });
  } else {
    const hashPassword = async (password) => {
      return bcrypt.hash(password, 10);
    };

    const hashedPassword = await hashPassword(password);
    const SignUpData = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hashedPassword,
      },
    });

    if (SignUpData) {
      const access_token = jwt.sign(
        { id: SignUpData.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).send({
        SignupData: {
          mssg: "User successfully created",
          access_token: access_token,
          isAdmin: "false",
        },
      });
    } else res.status(404).send({ mssg: "Error with creating user" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const userData = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (userData) {
    const isSamePassword = async (password) => {
      return bcrypt.compare(password, userData.password);
    };
    if (await isSamePassword(password)) {
      const access_token = jwt.sign(
        { id: userData.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      if (userData.isAdmin) {
        res.status(200).send({
          userData: {
            mssg: "Login Successful as Admin",
            access_token: access_token,
            isAdmin: true,
          },
        });
      } else {
        res.status(200).send({
          userData: {
            mssg: "Login Successful",
            access_token: access_token,
            isAdmin: false,
          },
        });
      }
    } else {
      res.status(404).send({ mssg: "Wrong Password" });
    }
  } else {
    res.status(404).send({ mssg: "User not found" });
  }
};
