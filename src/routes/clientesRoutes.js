import { Router } from "express";
import * as Controller from "../controllers/clientesController.js";
import { auth } from "../middlewares/auth.js";
 
const router = Router();
 
router.get("/",auth, Controller.listar);
router.get("/:id", auth, Controller.buscar);
router.post("/", auth, Controller.criar);
router.put("/:id", auth, Controller.atualizar);
router.delete("/:id", auth, Controller.remover);
 
export default router;