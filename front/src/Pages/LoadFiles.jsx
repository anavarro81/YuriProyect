import React, {useState} from 'react'

const LoadFiles = () => {

    const [errorDNI, setErrorDNI] = useState(null)
    const [errorCertification, setErrorCertification] = useState(null)
    const [errorinsurance, setErrorInsurance] = useState(null)    

    const  handleSubmit = (e) => {
        e.preventDefault()
        console.log('Formulario enviado')
    }

    const handleChange = (e) => {   

        const {name, files} = e.target
        
        // Se valida que se adjunta un archivo de tipo imagen o pdf
        const file = files[0]
        if (!file.type.includes('image') && !file.type.includes('pdf')) {
            setErrorDNI(`El archivo no es una imagen o pdf`)
        } else {
            setErrorDNI(null)
        }
        


        
    
    }

  return (
    <main className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
    <h2 className="text-2xl font-bold mb-6"> DOCUMENTACION </h2>
    
    <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* DNI */}
        <div className="space-y-4"> 
                <div className='flex flex-col'> 
                    <label for="dni"> DNI </label> 
                    <input type="file" name='dni' accept='image/*,application/pdf' onChange={handleChange}/>    
                </div>
                <span className='text-red-500'> {errorDNI &&  errorDNI} </span>
        </div>
    
        {/* CERTIFICACION */}   
        <div> 
                <label for="certification"> Título de Buceo </label>
                <input type="file" name='certification' accept='image/*,application/pdf' onChange={handleChange}/>
                <span className='text-red-500'> {errorCertification &&  errorCertification} </span>
        </div>

        {/* INSURANCE */}   
        <div> 
                <label for="insurance"> Seguro de buceo </label>
                <input type="file" name='insurance' accept='image/*,application/pdf' onChange={handleChange}/>
                <span className='text-red-500'> {errorinsurance &&  errorinsurance} </span>
        </div>

        <div className='flex justify-center w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'> 
                <button type='submit'>
                    Enviar Documentación
                </button>
        </div>
        


    </form>
  </main>
  )
}

export default LoadFiles