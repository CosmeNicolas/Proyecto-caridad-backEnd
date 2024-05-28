import mongoose, { mongo } from "mongoose";
import 'dotenv/config'

const mongoURI = process.env.MONGODB_URI;


mongoose.connect(mongoURI);

const conexionDeDatos = mongoose.connection
conexionDeDatos.once('open', ()=>{
    console.log('base de datos conectada')
})

