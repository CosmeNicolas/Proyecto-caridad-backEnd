/* crear modelo , importando mongoose con la palabra schema  */
import mongoose, {Schema} from "mongoose";

/* Creamos objeto y lo instanciamos con el new*/

const donacionShema = new Schema({
    Imagen: {
        type: "Buffer",
        required: true
    }
})
