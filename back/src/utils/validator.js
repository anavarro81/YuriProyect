const Customer = require('../models/customer.model');


// ****************************************************** 
// validateFullName > Valida el nombre completo para particulares. 
// validateManager > Valida el nombre del responsable para empresas
// validateCompanyName > Valida el nombre de la compañia
// validatePhone > valida el numero de teléfono
// 
// ******************************************************** 


const validateFullName = (fullName) => {
    
    if (!fullName) {
        return {
            error: true,
            message: 'El nombre y apellidos son obligatorios'}
    }

    if (fullName.length < 10) {
        return {
            error: true,
            message: 'El nombre y apellidos deben tener al menos 10 caracteres'}
    }

    return {error: false, message: 'nombre y apellidos validateds'}

}

const validateManager = (manager) => {

    if (!manager) {
        return {
            error: true,
            message: 'El nombre del responsable es obligatorio'}
    }

    if (manager.length < 10) {
        return {
            error: true,
            message: 'El nombre del manager tiene que tener al menos 10 caracteres'}
    }

    return {error: false, message: 'manager correcto'}


}

const validateCompanyName = (companyName) => {

    if (!companyName) {
        return {
            error: true,
            message: 'El nombre de la empresa es obligatorio'}
    }

    if (companyName.length < 10) {
        return {
            error: true,
            message: 'El nombre de la empresa tiene que tener al menos 10 caracteres'}
    }

    return {error: false, message: 'nombre del respnsable validador'}

}


const validatePhone = async (phone) => {
    
    if (!phone) {
        return {
            error: true,
            message: 'El phone es obligatorio'}
    }

    
    const euPhoneRegex = /^\+\d{2}\d{9,11}$/;
    
    // Valida que el telefono sea un numero valido de la UE. 
    // Ejemplo: +34666777888
    if (!euPhoneRegex.test(phone)) {
        return {
            error: true,
            message: 'phone no valido'}
    }

    const usedPhone = await Customer.find({phone: phone});

    

    if (usedPhone.length > 0) {
        return {
            error: true,
            message: 'telefono ya registrado'}
    }

    return {error: false, message: 'phone validated'}
}

const validateEmail = async (email) => {
    
    if (!email) {
        return {
            error: true,
            message: 'El email es obligatorio'}
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    
    // Valida que el correo sea un email valido
    if (!emailRegex.test(email)) {
        return {
            error: true,
            message: 'email no valido'}
    }

    const usedEmail = await Customer.find({email: email});

    if (usedEmail.length > 0) {
        return {
            error: true,
            message: 'email ya registrado'}
    }

    return {error: false, message: 'email validated'}
}

const validatePrivateDoc = (document) => {

    // Se comprueba que el DNI este subido
    const dni = document.find( doc => doc.tipo === 'DNI' );
    if (!dni) {
        return {
            error: true,
            message: 'El DNI es obligatorio'}
    } else {
        if (!dni.url_documento) {
            return {
                error: true,
                message: 'No se subido documento para DNI'}
        }
    }

    // Se comprueba que el Titulo de buceo este subido
    const tituloBuceo = document.find( doc => doc.tipo === 'TituloBuceo' );
    if (!tituloBuceo) {
        return {
            error: true,
            message: 'El Titulo de buceo es obligatorio'}
    } else {    
        if (!tituloBuceo.url_documento) {
            return {
                error: true,
                message: 'No se subido documento para Titulo de buceo'}
    }

    // Se comprueba que el Seguro de buceo este subido
    const seguroBuceo = document.find( doc => doc.tipo === 'SeguroBuceo' );
    if (!seguroBuceo) {
        return {
            error: true,
            message: 'El Seguro de buceo es obligatorio'}
    } else {
        if (!seguroBuceo.url_documento) {
            return {
                error: true,
                message: 'No se subido documento para Seguro de buceo'}
        }
    }
    }


}

const validateCompanyDoc = (document) => {
    console.log('Validando documentation de empresa');
}

const validateClubDoc = (document) => { 
    console.log('Validando documentation de club');
}

// ******************************************************
// VALIDACIONES PARA EMPRESAS                           *
// ******************************************************

const validateCIF = (CIF) => {
    
    if(!CIF) {
        return {
            error: true,
            message: 'El CIF es obligatorio'}
    }

    if (CIF.length != 9) {
        return {
            error: true,
            message: 'El CIF debe tener 9 caracteres'}
    }

    const cifRegex = /^[ABCDEFGHJUVNPQRSW]\d{7}[0-9A-J]$/;
    if (!cifRegex.test(CIF)) {
        return {
            error: true,
            message: 'El CIF no es valido'}
    }

    // Validar el dígito de control
    const letters = 'ABCDEFGHJUVNPQRSW';
    const controlLetters = 'JABCDEFGHI';
    const digits = CIF.slice(1, -1);
    const controlChar = CIF.slice(-1);
    const firstLetter = CIF[0];

    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
        let num = parseInt(digits[i], 10);
        if (i % 2 === 0) {
            num *= 2;
            if (num > 9) {
                num -= 9;
            }
        }
        sum += num;
    }

    const controlDigit = (10 - (sum % 10)) % 10;
    const expectedControlChar = letters.includes(firstLetter) ? controlLetters[controlDigit] : controlDigit.toString();

    if (controlChar !== expectedControlChar) {
        return {
            error: true,
            message: 'El CIF no es válido'
        };
    }

    return { error: false, message: 'CIF validado' };



}

const validateDocument =  (document, clientType) => {
    
    if (document.length == 0) {
        return {
            error: true,
            message: 'La documentation es obligatoria'}
    }

    switch (clientType) {
        case 'Particular':
            validatePrivateDoc(document);
        case 'Empresa':
            validateCompanyDoc(document);
            break;
        case 'Club':
            validateClubDoc(document);
            break;
        default:
            return {
                error: true,
                message: 'Tipo de cliente no valido'}   
    }
    

    


    

    return {error: false, message: 'Documento validated'}
}

const validatePrivateCustomer = async (customer) => {
    
    const {fullName, phone, email, documentation, clientType} = customer;

    const ValidfullName = validateFullName(fullName);
    if (ValidfullName.error) {
        return ValidfullName
    }

    const Validphone =  await validatePhone(phone);
    if (Validphone.error) {
        return Validphone;
    }

    const Validemail = validateEmail(email);
    if (Validemail.error) {
        return Validemail;
    }

    const document = validateDocument(documentation, clientType);
    if (document.error) {
        return document;
    }

    return {error: false, message: 'Customer validated'}
}

const validateCompany = async (company) => {

    const {CIF, manager, companyName, phone, email, documentation, clientType} = company;

    const validCIF = validateCIF(CIF);
    if (validCIF.error) {
        return validCIF
    }
    
    const Validmanager = validateManager(manager);
    if (Validmanager.error) {
        return Validmanager
    }

    const validCompanyName = validateCompanyName(companyName)

    if(validCompanyName.error) {    
        return validCompanyName
    }

    const Validphone =  await validatePhone(phone);
    if (Validphone.error) {
        return Validphone;
    }

    const Validemail = validateEmail(email);
    if (Validemail.error) {
        return Validemail;
    }

    const document = validateDocument(documentation, clientType);
    if (document.error) {
        return document;
    }

    return {error: false, message: 'Empresa validada'}

}

const validateClub = (club) => {
}

const validateClient = async (client) => {   
    
    
    const {clientType} = client;

    let validClient;     

    switch (clientType) {  
        case 'Particular':
            validClient = validatePrivateCustomer(client);            
            break;
        case 'Empresa':
            validClient = validateCompany(client);
            break;
        case 'Club':
            validClient = validateClub(client);
            break;
        default:
            return {
                error: true,
                message: 'Tipo de cliente no valido'}   
    }

    return validClient;


}

module.exports = {validateClient}; 