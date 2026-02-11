import * as osController from '../controllers/osController.js';
import { auth } from '../middlewares/auth.js';


import { Router } from 'express';

const router = Router();

router.get('/', auth, osController.listar);
router.get('/:id', auth, osController.buscar);
router.get('/veiculo/:id', auth, osController.buscarPorVeiculo);
router.get('/cliente/:id', auth, osController.buscarPorCliente);
router.put('/:id', auth, osController.atualizar);
router.delete('/:id', auth, osController.remover);


export default router;
