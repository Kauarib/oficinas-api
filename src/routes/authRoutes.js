// src/routes/authRoutes.js
import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { auth } from "../middlewares/auth.js";
import { allowRoles } from "../middlewares/role.js";

const router = Router();

router.post("/login", authController.login);

// ✅ somente ADMIN cria funcionário
router.post("/usuarios", auth, allowRoles("ADMIN"), authController.criarUsuario);
router.get("/usuarios", auth, allowRoles("ADMIN"), authController.listarUsuarios);
router.get("/usuarios/:id", auth, allowRoles("ADMIN"), authController.buscarUsuarioPorId);
router.put("/usuarios/:id", auth, allowRoles("ADMIN"), authController.atualizarUsuario);
router.delete("/usuarios/:id", auth, allowRoles("ADMIN"), authController.deletarUsuario);
export default router;
