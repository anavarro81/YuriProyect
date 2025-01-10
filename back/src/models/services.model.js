const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    serviceName: {type: String},
    description: {type: String},
    conditions: {type: String},
    status: {type: String, enum: ["active", "inactive"], default: "active"},
    // Para que tipo de cliente se ofrece el servicio
    customerType: {type: String, enum: ["todos", "Empresa", "Club", "Particular"], default: "todos"},



});

const service = mongoose.model("Service", serviceSchema);

module.exports = service;