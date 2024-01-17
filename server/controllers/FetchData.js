import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import "dotenv/config";
const prisma = new PrismaClient();

export const fetchData = async (req, res) => {
  const { userId } = req.body;
  console.log(req.body);

  const id = jwt.verify(userId, process.env.ACCESS_TOKEN_SECRET).username;

  const found = await prisma.bookDetails.findMany({
    where: {
      bookedBy: id,
    },
    include: {
      flBook: true,
    },
  });
  if (found) {
    res.status(200).send({ found: found });
  } else {
    res.status(404).send({ msg: "No Data Found" });
  }
};
