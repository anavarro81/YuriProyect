const moongose = require('mongoose');
const Schema = moongose.Schema;

const ratesSchema = new Schema({    
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    persons: { type: Number, required: true },
})

const rates = moongose.model('Rates', ratesSchema);
module.exports = rates;