import Donacion from '../database/models/donacion.js';
import fs from 'fs/promises';
import path from 'path';


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
const guardarImagenDonacion = async (file) => {
    const nuevaRuta = path.join('uploads', file.originalname);
    await fs.rename(file.path, nuevaRuta);
    return nuevaRuta;
};

export const crearDonacion = async (req, res) => {
    try {
        const imagenURL = await guardarImagenDonacion(req.file);
        const donacionNueva = new Donacion({
            ...req.body,
            imagen: imagenURL  // Guardamos la URL completa en la base de datos
        });
        await donacionNueva.save();
        res.status(201).json({ mensaje: 'Donación creada' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ mensaje: 'La donación no fue creada' });
    }
};

// Editar Donación por ID
export const editarDonacionxID = async (req, res) => {
    try {
        const donacionBuscada = await Donacion.findById(req.params.id);
        if (!donacionBuscada) {
            return res.status(404).json({ mensaje: 'No se encontró la donación con su ID' });
        }
        await Donacion.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ mensaje: 'La donación fue editada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'No se pudo editar la donación' });
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