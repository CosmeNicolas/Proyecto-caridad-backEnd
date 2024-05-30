import Donacion from "../database/models/donacion.js"

export const listarDonaciones = async (req, res)=>{
    /* console.log('envio de donaciones') */
    try {
        const mostrarDonaciones = await Donacion(req.body)
        res.status(200).json({mensaje:'Listando donaciones'})
    } catch (error) {
        console.log(first)
    }
}

export const crearDonacion = async(req, res)=>{
    try {
        //extraer los datos del body
        console.log(req)
        console.log(req.body)
        //todo: validar los datos del body
        //pedir a la base de datos crear el producto
        const donacionNueva = new Donacion(req.body);
        await donacionNueva.save()
        //responder al frontend
       res.status(201).json({mensaje:'Donacion creada'})
    } catch (error) {
        console.log(error)
        res.status(400).json({mensaje: 'La donación no fue creado'})
    }
}