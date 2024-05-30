import { Router } from "express";//enrutador de express
import { crearDonacion, listarDonaciones } from "../controllers/donaciones.controllers.js";


const router = Router();
//?como creo las rutas

router.route('/donaciones').get(listarDonaciones).post(crearDonacion)

export default router;