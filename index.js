import express from 'express'
import 'dotenv/config' //permite procesar la variable de entorno
import cors from 'cors'
import morgan from 'morgan';
import path from 'path'
import { fileURLToPath } from 'url';
import donacionesRouter from './src/routes/donaciones.routes.js'
import './src/database/database.js'
import multer from 'multer';


const upload = multer({ dest: 'uploads/' })


//1 - configurar un puerto 

const app = express();

app.post('/donaciones/single',upload.single('imagenDonacion'),(req,res)=>{
    console.log(req.file)
    guardarImagenDonacion(req.file)
    res.send('Enviando Imagen')
})


app.set('port',process.env.PORT || 4000);

app.listen(app.get('port'), ()=>{
    console.log('Estoy en el puerto' + app.get('port'))
})
//2 - configurar los middlewares
app.use(cors())//permite obtener conexiones remotas
app.use(morgan('dev'))//nos da detalles de las solicitudes 
app.use(express.json())//interpreta los datos del formato json 
app.use(express.urlencoded({extended:true}))//nos permite sacar los datos del body 

//creamos la ruta del archivo
const __filename = fileURLToPath(import.meta.url)
/* console.log(__filename) */
const __direname = path.dirname(__filename)
/* console.log(path.join(__direname,'/public')) */
app.use(express.static(path.join(__direname,'/public')))
//3 - configurar las rutas
app.use('/api', donacionesRouter)
/* app.get('/', (req, res)=>{
    //agregar logica
    console.log('procesando...')
    res.send('respuesat caridad')
}) */

const guardarImagenDonacion=async (file)=>{
    const fs = await import('node:fs');
    const nuevaRuta = `./uploads/${file.originalname}`
    fs.renameSync(file.path, nuevaRuta)
    return nuevaRuta
}
