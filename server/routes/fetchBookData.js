import express from "express";
import { fetchData } from "../controllers/FetchData.js";

const router = express.Router();

router.post("/fetchData", fetchData);

export default router;
