const  express = require('express');
const morgan = require('morgan')
const customerRoutes = require('./src/routes/customers.route')
const servicesRoutes = require('./src/routes/services.route')
const ratesRoutes = require('./src/routes/rates.route')
const bookingRoutes = require('./src/routes/bookings.route')
const multer = require('multer')
const os = require('os')

const app = express();


// Middleware para convertir a json los retornos de las peticiones. 
app.use(express.json())

// Solo en DESA usamos morgan con perfil = 'dev'
if (process.env.NODE_ENV == "development") {
    console.log('entro...');
    
   app.use(morgan('dev'))     
}
//TODO Cambiar el nombre del archivo por uno que contenga el nombre de la persona y tipo. Por ejemplo: "Dni Antonio.jpg" 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
        
        // const tempDir = os.tmpdir() // Crea un directorio temporal
        //  cb(null, tempDir)          // Guarda el archivo en el directorio temporal    
    },
    
    filename: function(req, file, cb) {
        console.log('req (body)== ', req.body);
        console.log('req (files)== ', req.files);
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
})

// const upload = multer({dest: 'uploads/'})
const upload = multer({storage: storage})

// Se crea middleware de prueba para ver que funciona
// app.use( (req, res, next)  => {
//     console.log('Entrando al middleware');
//     next()
// })

const cpUpload = upload.fields([{ name: 'Dni', maxCount: 1 }, { name: 'TituloBuceo', maxCount: 1 }, { name: 'SeguroBuceo', maxCount: 1 }])

app.use('/clientes', cpUpload, customerRoutes )
app.use('/reservas', bookingRoutes)
app.use('/servicios', servicesRoutes)
app.use('/tarifas', ratesRoutes)
app.use('/calendario', servicesRoutes)

// Se crea peticion .get de prueba para ver si funciona. 
app.get('/', (req, res)=> {
    res.send('Hola mundo!!')
})

module.exports = app