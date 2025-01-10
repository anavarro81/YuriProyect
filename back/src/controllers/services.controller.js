const Service = require('../models/services.model');
const {validateService} = require('../utils/servicesValidator');

const newService = async (req, res) => {

    try {

        const  validService  = validateService(req.body);    
        if (validService.error) {
            return res.status(400).json(validService);
        }
        
        const newService = new Service(req.body);
        const serviceCreated = await newService.save();
        return res.status(201).json(serviceCreated);                
    
    } catch (error) {
        console.log('Error al validar el servicio', error);
        return res.status(500).json({"error": error.message});
    }

}

module.exports = {newService}