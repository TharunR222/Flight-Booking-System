import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import "dotenv/config";

const prisma = new PrismaClient();

export const postFlightData = async (req, res) => {
  const { id, postData } = req.body;
  console.log(req.body);
  const userId = jwt.verify(id, process.env.ACCESS_TOKEN_SECRET).username;
  try {
    const checkAdmin = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!checkAdmin.isAdmin) {
      return res.status(404).send({ mssg: "Doesn't have admin rights" });
    }

    if (!checkAdmin) {
      return res.status(404).send({ mssg: "Username not found" });
    }

    const postedData = await prisma.flights.create({
      data: {
        flname: postData.flName,
        fromLoc: postData.fromLoc,
        toLoc: postData.toLoc,
        pricing: parseInt(postData.pricing),
        FlightAvailDates: {
          create: postData.dates.map((availDate) => ({
            availDates: new Date(availDate),
            seatAvail: parseInt(postData.seatAvail),
          })),
        },
      },
    });
    if (postedData) {
      return res.status(200).send({ mssg: "Data Posted Successfully" });
    } else {
      return res
        .status(404)
        .send({ mssg: "Data has not been inserted! Check your data once" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ mssg: "Internal Server Error" });
  }
};
