import { Router } from "express";
import * as Controller from "../controllers/clientesController.js";
 
const router = Router();
 
router.get("/", Controller.listar);
router.get("/:id", Controller.buscar);
router.post("/", Controller.criar);
router.put("/:id", Controller.atualizar);
router.delete("/:id", Controller.remover);
 
export default router;