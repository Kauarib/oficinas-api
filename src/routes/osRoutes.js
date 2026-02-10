import * as osController from '../controllers/osController.js';


import { Router } from 'express';

const router = Router();

router.get('/', osController.listar);
router.get('/:id', osController.buscar);
router.get('/veiculo/:id', osController.buscarPorVeiculo);
router.get('/cliente/:id', osController.buscarPorCliente);
//router.put('/:id', osController.atualizar);
//router.delete('/:id', osController.remover);


export default router;
