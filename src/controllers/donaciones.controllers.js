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
//!Obtener Donación x ID
export const obtenerDonacion = async (req, res)=>{
    try {
        const donacionXid = await Donacion.findById(req.params.id) 
        if(!donacionXid){
            return res.status(404).json({mensaje: 'La donacion no exitse'})
        }
        res.status(200).json(donacionXid)
    } catch (error) {
        console.error(error)
        /* respondemos con 404 por no encontrar el id  */
        res.status(404).json({mensaje:'Error al encontrar donacion'})
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
//!EditarDonacionxID
export const editarDonacionxID = async (req, res)=>{
    try {
        const donacionBuscada = await Donacion.findById(req.params.id)
        if(!donacionBuscada){
          return  res.status(404).json({mensaje:'No se encontro la donación con su ID'})
        }
        /* actualizamos la donacion encontrada que viene en el body de la petición */
        await Donacion.findByIdAndUpdate(req.params.id, req.body)
        //responder
        res.status(200).json({mensaje:'La donacion fue editada'})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:'No se pudo editar la donación'})
    }
}

//!Eliminar Donación 
export const elimarDonacion = async(req, res)=>{
    try {
        const donacion = await Donacion.findById(req.params.id)
        if(!donacion){
            return res.status(404).json({mensaje: 'No se pudo encontrar la donación a Eliminar'})
        }
        //en este caso solo encesitamos los parametros de las respuestas por Id y no los datos del body 
        await Donacion.findByIdAndDelete(req.params.id)
        res.status(200).json({mensaje:'La donación fue eliminada'})
    } catch (error) {
        console.log(error)
        res.status(500).json({mensaje: 'No se pudo borrar la Donación'})
    }
   

}