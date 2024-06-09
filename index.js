import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import donacionesRouter from './src/routes/donaciones.routes.js';
import './src/database/database.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import Donacion from './src/database/models/donacion.js';  // Importa el modelo de donación

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configurar Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configurar Multer-Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'donaciones',
        format: async (req, file) => 'png', // Puedes cambiar el formato si lo deseas
        public_id: (req, file) => file.originalname.split('.')[0], // Nombre del archivo sin extensión
    },
});

const upload = multer({ storage: storage });

app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), () => {
    console.log('Estoy en el puerto ' + app.get('port'));
});

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sirve la carpeta 'public' como recursos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para manejar la carga de una sola imagen y creación de donación
app.post('/api/donaciones/single', upload.single('imagenDonacion'), async (req, res) => {
    try {
        const imagenURL = req.file.path; // La URL de la imagen subida a Cloudinary
        const donacionNueva = new Donacion({
            ...req.body,
            imagenDonacion: imagenURL
        });
        await donacionNueva.save();
        res.status(201).json({ mensaje: 'Donación creada' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: 'La donación no fue creada', error });
    }
});

// Rutas
app.use('/api', donacionesRouter);

export default app;