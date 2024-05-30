import Donacion from "../database/models/donacion.js"
//!Listar Donaciones
export const listarDonaciones = async (req, res)=>{
    try {
        const donaciones = await Donacion.find()
        res.status(200).json(donaciones)
    } catch (error) {
        /* cuando falla el servido , error interno */
        console.error(error)
        res.status(500).json({mensaje:'Error la buscar las donaciones'})
    }
}
//!Crear Donación
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