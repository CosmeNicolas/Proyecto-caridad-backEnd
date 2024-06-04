import { Router } from 'express';
import { crearDonacion, editarDonacionxID, elimarDonacion, listarDonaciones, obtenerDonacion } from '../controllers/donaciones.controllers.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({ dest: path.join(__dirname, '../../uploads') });

const router = Router();

router.route('/donaciones')
    .get(listarDonaciones)
    .post(upload.single('imagenDonacion'), crearDonacion);

router.route('/donaciones/:id')
    .get(obtenerDonacion)
    .put(editarDonacionxID)
    .delete(elimarDonacion);

export default router;