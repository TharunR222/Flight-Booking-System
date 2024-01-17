import express from 'express'
import { postFlightData } from '../controllers/FlightPostController.js'

const router = express.Router()

router.post('/postFlights', postFlightData)

export default router