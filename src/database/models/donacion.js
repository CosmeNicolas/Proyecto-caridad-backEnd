import mongoose, { Schema } from "mongoose";

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
    enum: [
      "Ropa",
      "Bebés",
      "Papel",
      "Plastico",
      "Vidrio",
      "Muebles",
      "Electrodomesticos",
      "Tecnologia y Accesorios",
      "Herramientas",
      "Otros",
    ],
  },
  estado: {
    type: String,
    required: true,
    enum: ["Casi nuevo", "Usado"],
  },
  localidad: {
    type: String,
    required: true,
    enum: [
      "San Miguel de Tucumán",
      "Yerba Buena",
      "Trancas",
      "Burruyacú",
      "Tafí Viejo",
      "Tafí del Valle",
      "Lules",
      "Leales",
      "Cruz Alta",
      "Famaillá",
      "Monteros",
      "Chicligasta",
      "Simoca",
      "Río Chico",
      "Alberdi",
      "La Cocha",
      "Graneros",
      "Concepción",
    ],
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

const Donacion = mongoose.model("Donacion", donacionSchema);

export default Donacion;
