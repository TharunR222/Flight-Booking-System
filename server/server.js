import "dotenv/config";
import express from "express";
import cors from "cors";
import fetchFlightRoute from "./routes/fetchFlightRoute.js";
import authRoute from "./routes/authRoute.js";
import adminPost from "./routes/adminPost.js";
import fetchBookData from "./routes/fetchBookData.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", authRoute);
app.use("/flights", fetchFlightRoute);
app.use("/fldata", adminPost);
app.use("/fetchBookData", fetchBookData);

app.listen(process.env.PORT, () =>
  console.log(`Listening at port ${process.env.PORT}`)
);
