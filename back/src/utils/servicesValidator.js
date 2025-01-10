const Service = require('../models/services.model');
const {bookin} = require
const validateServiceName = (serviceName) => {
    
    if (!serviceName) {
        return {
            error: true,
            message: 'El nombre del servicio es obligatorio'}
    }

    if (serviceName.length < 10) {
        return {
            error: true,
            message: 'El nombre del servicio debe tener al menos 10 caracteres'}
    }

    if (serviceName.length > 20) {
        return {
            error: true,
            message: 'El nombre del servicio no puede tener más de 20 caracteres'}
    }
    

    return {error: false, message: ''}

}

const validatedescription = (description) => {
    
    if (!description) {
        return {
            error: true,
            message: 'La descripción del servicio es obligatoria'}
    }

    if (description.length < 10) {
        return {
            error: true,
            message: 'La descripción del servicio debe tener al menos 10 caracteres'}
    }

    return {error: false, message: ''}
}

const validatecustomerType = (customerType) => {
    
    if (!customerType) {
        return {
            error: true,
            message: 'El tipo de cliente es obligatorio'}
    }

    if (customerType !== "todos" || customerType !== "Empresa" || customerType !== "Club" || customerType !== "Particular") {
        return {
            error: true,
            message: 'El tipo de cliente no es válido'}
    }

    return {error: false, message: ''}
}

const validateService = (service) => {

    const {
            serviceName, 
            description, 
            customerType} = service;
    
// Las funciones de validacion se ejecutan y se almacenan en el resultado en result
    const validation = [
        {result: validateServiceName(serviceName), field: "CIF"},
        {result: validatedescription(description), field: "description"},
        {result: validatecustomerType(customerType), field: "customerType"}
    ]
    // Se comprueba si hay errores y se devuelve el mensaje
    for (const {result} of validation) {
        if (result.error) {
            return {
                error: true,                
                message: result.message
            }
        }
    }
    
    return {error: false, message: 'Servicio validado'}

}

module.exports = {validateService}