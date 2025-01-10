const booking = require('../models/bookings.model');
const {validateBooking} = require('../utils/bookingsValidator');

const newBooking = async (req, res) => {
    
    const  validBooking  = await validateBooking(req.body);    
    
    if (validBooking.error) {
        return res.status(400).json(validBooking);
    }
    
    
    try {
        const createdBooking = new booking(req.body);
        await createdBooking.save();
        res.status(201).json(createdBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { newBooking };

