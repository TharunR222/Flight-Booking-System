import express from 'express'
import { fetchFlights, bookFlights } from '../controllers/FlightController.js'

const router = express.Router()

router.post('/bookFlights', bookFlights)
router.post('/fetchFlights', fetchFlights)


export default router