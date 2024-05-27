import express from 'express'
import 'dotenv/config' //permite procesar la variable de entorno
import cors from 'cors'
import morgan from 'morgan';
//1 - configurar un puerto 

const app = express();
app.set('port',process.env.PORT || 4000);

app.listen(app.get('port'), ()=>{
    console.log('Estoy en el puerto' + app.get('port'))
})
//2 - configurar los middlewares
app.use(cors())//permite obtener conexiones remotas
app.use(morgan())//nos da detalles de las solicitudes 
//3 - configurar las rutas
app.get('/', (req, res)=>{
    //agregar logica
    console.log('procesando...')
    res.send('respuesat caridad')
})