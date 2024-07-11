import mongoose, { Schema } from "mongoose";

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
    enum: [
      "Ropa",
      "Para Bebés",
      "Papel",
      "Plástico",
      "Vidrio",
      "Muebles",
      "Electrodoméstico",
      "Tecnología y accesorios",
      "Herramientas",
      "Apuntes",
      "Libros",
      "Otros",
    ],
  },
  estado: {
    type: String,
    required: true,
    enum: ["Casi Nuevo", "Usado"],
  },
  localidades: {
    type: String,
    required: true,
    enum: [
        "San Miguel de Tucumán",
        "Yerba buena",
        "Trancas",
        "Tafí viejo",
        "Concepcion",
        "Burruyacu",
        "Tafí del valle",
        "Lules",
        "Leales",
        "Cruz alta",
        "Famaillá",
        "Monteros",
        "Chicligasta",
        "Simoca",
        "Río chico",
        "Juan bautista alberdi",
        "La cocha",
        "Graneros",
      ],
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

const Donacion = mongoose.model("Donacion", donacionSchema);

export default Donacion;
