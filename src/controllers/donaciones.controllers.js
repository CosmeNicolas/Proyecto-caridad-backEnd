import Donacion from '../database/models/donacion.js';
import { v2 as cloudinary } from 'cloudinary';


// Listar Donaciones
export const listarDonaciones = async (req, res) => {
    try {
        const donaciones = await Donacion.find();
        res.status(200).json(donaciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al buscar las donaciones' });
    }
};

// Obtener Donación por ID
export const obtenerDonacion = async (req, res) => {
    try {
        const donacionXid = await Donacion.findById(req.params.id);
        if (!donacionXid) {
            return res.status(404).json({ mensaje: 'La donación no existe' });
        }
        res.status(200).json(donacionXid);
    } catch (error) {
        console.error(error);
        res.status(404).json({ mensaje: 'Error al encontrar donación' });
    }
};




// Crear Donación
export const crearDonacion = async (req, res) => {
    try {
        // Subir la imagen a Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'donaciones',
            public_id: req.file.originalname.split('.')[0],
            format: 'png'
        });

        // Crear la nueva donación con la URL de la imagen
        const donacionNueva = new Donacion({
            ...req.body,
            imagenDonacion: result.secure_url
        });

        // Guardar la nueva donación en la base de datos
        await donacionNueva.save();

        // Enviar una respuesta al cliente
        res.status(201).json({ mensaje: 'Donación creada' });
    } catch (error) {
        // Manejar los errores y enviar una respuesta al cliente
        console.error(error);
        res.status(400).json({ mensaje: 'La donación no fue creada', error });
    }
};


// Editar Donación por ID
export const editarDonacionxID = async (req, res) => {
    try {
        const donacionBuscada = await Donacion.findById(req.params.id);
        if (!donacionBuscada) {
            return res.status(404).json({ mensaje: 'No se encontró la donación con su ID' });
        }

        // Si hay una nueva imagen, actualiza la imagen en Cloudinary
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'donaciones',
                public_id: req.file.originalname.split('.')[0],
                format: 'png'
            });
            req.body.imagenDonacion = result.secure_url;
        }

        // Actualiza los demás campos
        const donacionActualizada = await Donacion.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({ mensaje: 'La donación fue editada', donacion: donacionActualizada });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'No se pudo editar la donación', error });
    }
};

// Eliminar Donación por ID
export const elimarDonacion = async (req, res) => {
    try {
        const donacion = await Donacion.findById(req.params.id);
        if (!donacion) {
            return res.status(404).json({ mensaje: 'No se pudo encontrar la donación a eliminar' });
        }
        await Donacion.findByIdAndDelete(req.params.id);
        res.status(200).json({ mensaje: 'La donación fue eliminada' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'No se pudo borrar la donación' });
    }
};