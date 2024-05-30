/* crear modelo , importando mongoose con la palabra schema  */
import mongoose, {Schema} from "mongoose";

/* Creamos objeto y lo instanciamos con el new*/

const donacionShema = new Schema({
  imagen: {
    type: "String",
    required: true,
    validate:{
        validator:(valor)=>{
            const pattern =
            /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/;
            return pattern.test(valor);
        /*  return /^image\/(jpeg|png|gif|jpg)$/.test(valor) */
        },
        message: dato =>`${dato.value} no es una imagen valida`
    }
  },
  nombreDonacion: {
    type: "String",
    required: true,
    minLength: 2,
    maxLenth:50,
    unique:true,
  },
  descripcion: {
    type: "String",
    required: true,
    minLength: 3,
    maxLenth:100,
  },
  categoria:{
    type:'String',
    required: true,
    enum: ["Ropa","Papel", "Plastico", "Vidrio","Muebles","Electrodomesticos","Tecnologia y Accesorios","Herramientas","Otros"],
  },
  estado:{
    type:'String',
    required: true,
    enum: ["Casi Nuevo", "Usado"],
  },
  nombreCooperador:{
    type: "String",
    require: true,
    Unique: true
  },
  numeroContacto: {
    type: Number,
    required: true,
    minLength:10,
    maxLenth:10
  },
});

//crear el modelo de donaciones 
const Donacion = mongoose.model('donacion',donacionShema)

//esport por defecto
export default Donacion