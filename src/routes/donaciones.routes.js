import { Router } from "express";//enrutador de express
import { crearDonacion, editarDonacionxID, elimarDonacion, listarDonaciones, obtenerDonacion } from "../controllers/donaciones.controllers.js";


const router = Router();
//?como creo las rutas

router.route('/donaciones').get(listarDonaciones).post(crearDonacion)
router.route('/donaciones/:id').get(obtenerDonacion).put(editarDonacionxID).delete(elimarDonacion)

export default router;