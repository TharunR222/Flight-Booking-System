import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export const bookFlights = async (req, res) => {
  const { userId, flightId, date, noOfSeats } = req.body;
  const id = jwt.verify(userId, process.env.ACCESS_TOKEN_SECRET).id;
  const booked = await prisma.bookDetails.create({
    data: {
      bookUser: {
        connect: {
          id: id,
        },
      },
      flBook: {
        connect: {
          fid: flightId,
        },
      },
      bookedDate: new Date(date).toISOString(),
      noOfSeats: parseInt(noOfSeats),
    },
  });

  if (booked) {
    const update = await prisma.flightAvailDates.update({
      where: {
        flid_availDates: {
          flid: flightId,
          availDates: new Date(date).toISOString(),
        },
      },
      data: {
        seatAvail: {
          decrement: parseInt(noOfSeats),
        },
      },
    });
    if (update) {
      res.status(200).send({ booked: booked, updated: update });
    } else {
      res
        .status(404)
        .send({ msg: "Can't update data, but booked successfully" });
    }
  } else {
    res
      .status(400)
      .send({ msg: "Can't book the requested flight at the moment" });
  }
};

export const fetchFlights = async (req, res) => {
  const { fromLocation, toLocation, lookOn } = req.body;
  console.log(req.body);
  const flight = await prisma.flights.findMany({
    where: {
      fromLoc: fromLocation,
      toLoc: toLocation,
      FlightAvailDates: {
        some: {
          availDates: {
            gte: new Date(lookOn).toISOString(),
          },
          seatAvail: {
            gte: 1,
          },
        },
      },
    },
    include: {
      FlightAvailDates: {
        where: {
          availDates: {
            gte: new Date(lookOn).toISOString(),
          },
          seatAvail: {
            gte: 1,
          },
        },
      },
    },
  });
  console.log(flight);
  if (flight) {
    res.status(200).send(flight);
  } else {
    res.status(400);
  }
};
