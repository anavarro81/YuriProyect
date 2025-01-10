const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    fullName: {type: String},
    
    // Empresas
    CIF: {type: String},
    manager: {type: String},
    companyName: {type: String},
    
    phone: {type:String},
    email: {type:String},
    documentation: [
        {
            type: {type: String, enum: ['DNI', 'CIF', 'TituloBuceo', 'SeguroBuceo', 'CertificadoActividades'] },
        }
        ],
    validated: {type: Boolean, default: false},
    clientType: {type: String, enum: ['Particular', 'Empresa', 'Club']},
});


const customer = mongoose.model("Customer", customerSchema);
module.exports = customer;