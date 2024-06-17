import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import donacionesRouter from './src/routes/donaciones.routes.js';
import './src/database/database.js';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuración de Cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

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

app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), () => {
    console.log('Estoy en el puerto ' + app.get('port'));
});

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

// Rutas
app.use('/api', donacionesRouter);

// Para cualquier otra ruta, sirve el archivo index.html de la carpeta pública
app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

export default app;