const Customer = require('../models/customer.model');
const {validateClient} = require('../utils/validator');
const {sendReceiptEmail} = require('../utils/sendEmail');

const newCustomer = async (req, res) => {



    try {

        if (req.files) {
            console.log('Archivo subido:', req.files);
        }

        const {Dni, TituloBuceo, SeguroBuceo} = req.files;

        console.log('Dni:', Dni[0]);
        console.log('TituloBuceo:', TituloBuceo[0]);
        console.log('SeguroBuceo:', SeguroBuceo[0]);

        const validCustomer = await validateClient(req.body);

        if (validCustomer.error) {
            return res.status(400).json(validCustomer);
        }
    
        const newCustomer = new Customer(req.body);
        const clienteCreado = await newCustomer.save();

        await sendReceiptEmail(clienteCreado, req.files)
        // console.log('Correo enviado... ');    

        // return res.status(201).json(clienteCreado);            
        return res.status(201).json({message: 'Cliente creado correctamente'}); 
    } catch (error) {
        return res.status(500).json(error);
    }

}

module.exports = {newCustomer}