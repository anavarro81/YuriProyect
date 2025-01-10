const express = require('express');
// importar los controladores   
const {getRates, createRate, updateRate} = require('../controllers/rates.controller')
const ratesRouter = express.Router();


// Definir las rutas
ratesRouter.get('/', getRates);
ratesRouter.post('/nueva-tarifa', createRate);
ratesRouter.put('/actualizar-tarifa/:id', updateRate);

module.exports = ratesRouter;