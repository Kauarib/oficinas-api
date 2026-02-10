import * as veiculoController from '../controllers/veiculosController.js';

import { Router } from 'express';;

const router = Router();

router.get('/', veiculoController.listar);
router.get('/:id', veiculoController.buscar);
router.get('/cliente/:clienteId', veiculoController.buscarPorCliente);
router.post('/', veiculoController.criar);

router.delete('/:id', veiculoController.remover);

export default router;