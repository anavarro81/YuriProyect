const express = require("express");
const {newCustomer} = require("../controllers/customers.controller");
const customerRoutes = express.Router();

customerRoutes.post("/nuevo-cliente", newCustomer);


module.exports = customerRoutes