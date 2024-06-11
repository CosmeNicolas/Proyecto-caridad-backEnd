import { Router } from 'express';
import { crearDonacion, editarDonacionxID, elimarDonacion, listarDonaciones, obtenerDonacion } from '../controllers/donaciones.controllers.js';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

// Configuración de Multer-Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'donaciones',
        format: async (req, file) => 'png', // Puedes cambiar el formato si lo deseas
        public_id: (req, file) => file.originalname.split('.')[0], // Nombre del archivo sin extensión
    },
});

const upload = multer({ storage: storage });

const router = Router();

router.route('/donaciones')
    .get(listarDonaciones)
    .post(upload.single('imagenDonacion'), crearDonacion); // Middleware de multer para manejar la carga de archivos

router.route('/donaciones/:id')
    .get(obtenerDonacion)
    .put(editarDonacionxID)
    .delete(elimarDonacion);

export default router;