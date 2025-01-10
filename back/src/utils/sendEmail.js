const nodemailer = require("nodemailer");
const { getMaxListeners } = require("../models/customer.model");
const dotenv = require("dotenv").config();

const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_MAIL = process.env.EMAIL_MAIL;

console.log('>> process.env.EMAIL_MAIL ', process.env.EMAIL_MAIL);


const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
        user: EMAIL_MAIL, 
        pass: EMAIL_PASSWORD, 
    },
    tls: { rejectUnauthorized: false }, 
});

async function sendReceiptEmail(data, docs) {

    console.log('>> sendReceiptEmail <<');
    console.log('data == ', data);

    try {
        const info = await transporter.sendMail({
            from: "yuri@buceo.es",         
            // TODO: Cambiar el email de destino por el del cliente.
            to: "antonio.deldujo@gmail.com",            
            subject: `Registro pendiente de validación`, 
            html: `<p>  Gracias por registrarte  ${data.fullName}. Tu soliciud está pendiente de validación. En breve recibiras una respuesta. </p>`
        })
            
    } catch (error) {
        console.log('Se ha producido un error ', error);        
    }


    

}
sendReceiptEmail().catch(console.error);

module.exports = {sendReceiptEmail}