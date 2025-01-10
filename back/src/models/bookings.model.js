const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bookingSchema = new Schema({
    bookingDate: { type: Date, required: true },
    service: { 
        type: Schema.Types.ObjectId, 
        ref: 'Servicio', 
        required: true 
    },
    customer: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    status: { 
        type: String, 
        default: "pendiente de pago", 
        enum: ["pendiente de pago", "confirmada", "anulada", "rechazada", "confirmada"] 
    },
    requestDate: { type: Date, required: true },
 });

const booking = mongoose.model("Booking", bookingSchema);

module.exports = booking;