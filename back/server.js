const  mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})

const app = require('./app')



const BD = process.env.BD
 

const connectDB = async () => {
    try {
        await mongoose.connect(BD, {useNewUrlParser: true, })
        console.log('✔️ Conexión correcta a la base de datos');
    } catch (error) {
        console.error('❌ Error al conectar a la base de datos', error.message);
        process.exit(1);
    }    
}

const startServer = async () => {
    await connectDB()
    const port = process.env.PORT || 3000
    app.listen(port, () => (console.log(`🚀 Listening on port ${port}`)))
}


startServer()


