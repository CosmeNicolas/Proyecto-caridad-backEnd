import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import donacionesRouter from './src/routes/donaciones.routes.js';
import './src/database/database.js';
import multer from 'multer';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const upload = multer({ dest: path.join(__dirname, 'uploads') });

app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), () => {
    console.log('Estoy en el puerto ' + app.get('port'));
});

// Middlewares
app.use(cors({
    origin: 'https://tucu-manos.netlify.app' // Permitir solicitudes solo desde este dominio
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sirve la carpeta 'uploads' como recursos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Sirve la carpeta 'public' como recursos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para manejar la carga de una sola imagen y creación de donación
app.post('/donaciones/single', upload.single('imagenDonacion'), async (req, res) => {
    console.log(req.file);
    await guardarImagenDonacion(req.file);
    res.send('Enviando Imagen');
});

// Rutas
app.use('/api', donacionesRouter);

const guardarImagenDonacion = async (file) => {
    const nuevaRuta = path.join(__dirname, 'uploads', file.originalname);
    await fs.rename(file.path, nuevaRuta);
    return nuevaRuta;
};