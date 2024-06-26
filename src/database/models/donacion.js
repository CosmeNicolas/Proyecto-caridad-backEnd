import mongoose, { Schema } from 'mongoose';

const donacionSchema = new Schema({
    imagenDonacion: {
        type: String,
        required: true,
    },
    nombreDonacion: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50,
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
        enum: ["Ropa", "Papel", "Plastico", "Vidrio", "Muebles", "Electrodomestico", "TecnologiaYaccesorios", "Herramientas","Apuntes","Libros","Otros"],
    },
    estado: {
        type: String,
        required: true,
        enum: ["Casi Nuevo", "Usado"],
    },
    nombrePersona: {
        type: String,
        required: true,
    },
    numeroPersona: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 10,
    },
});

const Donacion = mongoose.model('Donacion', donacionSchema);

export default Donacion;