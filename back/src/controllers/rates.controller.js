const rates = require('../models/rates.model')

// Obtiene todas las tarifas
const getRates = async (req, res) => {
    try {
        const allrates = await rates.find();
        res.status(200).json(allrates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Funcion para crear una tarifa 
const createRate = async (req, res) => {
    const rate = new rates(req.body);
    try {
        await rate.save();
        res.status(201).json(rate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateRate = async (req, res) => {    

    try {
        
        const { id } = req.params;
        const { name, description, price } = req.body;

        const updatedRate = await rates.findByIdAndUpdate(id, 
            {name: name,
             description:description,
             price:price
            }, 
            { new: true }
            );

        if(!updatedRate){
            return res.status(404).json({ message: 'Tarifa no encontrada' });
        }

        return res.status(200).json(updatedRate);

    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = { getRates, createRate, updateRate }