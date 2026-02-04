import * as service from '../services/osService.js';

export async function listar(req, res) {
    
    const rows = await service.listarOs();
    res.json(rows);

}
export async function buscar(req, res) {
    const id = Number(req.params.id);
    const os = await service.buscarOsporId(id);

    if (!os) return res.status(404).json({ message: 'Ordem de Serviço não encontrada' });
    res.json(os);
    
}