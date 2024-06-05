import mongoose, { Schema } from 'mongoose';

const donacionSchema = new Schema({
    imagen: {
        type: String,
        required: true,
    },
    nombreDonacion: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50,
        unique: true,
    },
    descripcion: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,
    },
    categoria: {
        type: String,
        required: true,
        enum: ["Ropa", "Papel", "Plastico", "Vidrio", "Muebles", "Electrodomesticos", "Tecnologia y Accesorios", "Herramientas", "Otros"],
    },
    estado: {
        type: String,
        required: true,
        enum: ["Casinuevo", "Usado"],
    },
    nombreCooperador: {
        type: String,
        required: true,
        unique: true,
    },
    numeroContacto: {
        type: Number,
        required: true,
        minLength: 10,
        maxLength: 10,
    },
});

const Donacion = mongoose.model('Donacion', donacionSchema);

export default Donacion;