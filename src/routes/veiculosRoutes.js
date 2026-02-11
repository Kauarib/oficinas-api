import * as veiculoController from '../controllers/veiculosController.js';  
import { auth } from '../middlewares/auth.js';

import { Router } from 'express';;

const router = Router();

router.get('/', auth, veiculoController.listar);
router.get('/:id', auth, veiculoController.buscar);
router.get('/cliente/:clienteId', auth, veiculoController.buscarPorCliente);
router.post('/', auth, veiculoController.criar);

router.delete('/:id', auth, veiculoController.remover);

export default router;