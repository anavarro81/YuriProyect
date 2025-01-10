const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    Date: { type: Date, required: true },
    status: { type: String, enum:   ['cerrado', 'pendiente de confirmación', 'anulado', 'rechazado'], default: 'pendiente de confirmación' },
    

});

const schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = schedule;