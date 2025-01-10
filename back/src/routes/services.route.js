const express = require("express");
const {newService} = require("../controllers/services.controller");

const servicesRoutes = express.Router();



servicesRoutes.post("/nuevo-servicio", newService);

module.exports = servicesRoutes;