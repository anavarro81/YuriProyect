const express = require("express");
const { newBooking } = require("../controllers/bookings.controller");
const bookingRoutes = express.Router();

bookingRoutes.post("/nueva-reserva", newBooking);

module.exports = bookingRoutes;