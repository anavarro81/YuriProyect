const booking = require('../models/bookings.model');
const Customer = require('../models/customer.model');

/*
    checkCustomer > Comprueba si el cliente existe en la BBDD
    checkBookingDate > Comprueba si la fecha de reserva esta informada y no es anterior a 2 dias
    checkRequestDate > Comprueba si la fecha de solicitud esta informada y no es anterior a la fecha actual
    checkService > Comprueba si el servicio existe en la BBDD
*/


const checkCustomer = async (customerID) => {   

    if (!customerID){
        return { error: true, message: 'Es obligatorio informar el ID del cliente'}    
    }    

    const customer = await Customer.findById(customerID);

    if (!customer) {
        return { error: true, message: 'Customer no existe en BBDD' }
    }

    return { error: false, message: '' }

}

const checkBookingDate =  (bookingDate) => {

    const today = new Date();
    const maximumAdvanceBooking = 2 // 2 days
    
    if(!bookingDate){
        return { error: true, message: 'Fecha de reserva debe de informarse' }
    }   
    
    // Se convierte la fecha de reserva en un objeto Date
    bookingDate = new Date(bookingDate);
    
    if (bookingDate < today) {
        return { error: true, message: 'Fecha de reserva no puede ser anterior a la fecha actual' }
    }
    
    const maxAdvanceDate = new Date(bookingDate.setDate(bookingDate.getDate() - maximumAdvanceBooking)); 

    if (today >= maxAdvanceDate) {
        return { error: true, message: `La reserva hay que realizarla con ${maximumAdvanceBooking} días de antelación como máximo` }
    }

    return { error: false, message: '' }

}



const checkService = async (serviceID) => {

    if(!serviceID){
        return { error: true, message: 'ID de servicio no existe' }
    }

    const service = await booking.findById(serviceID);

    if(!service){
        return { error: true, message: 'Servicio no existe en BBDD' }
    }

    return { error: false, message: '' }
}

const validateBooking = async (bookingData) => {

    const {
        bookingDate, 
        serviceID, 
        customer, 
        } = bookingData;

// Las funciones de validacion se ejecutan y se almacenan en la propiedad 'resulta' respectivamente. 
    const validations = [
        {result: await checkCustomer(customer), field: "customerID"},
        {result: checkBookingDate(bookingDate), field: "Fecha de reserva"},        
        {result: await checkService(serviceID), field: "service"}
    ]

    // Si alguna de las funciones de validacion devuelve un error, se devuelve el error
    for (const validation of validations) {
        if (validation.result.error) {
            return validation.result
        }
    }


}

module.exports = {validateBooking}  