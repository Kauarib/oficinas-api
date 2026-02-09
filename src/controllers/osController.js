import * as service from '../services/osService.js';


const STATUS_VALIDOS = [
  'ABERTA',
  'EM_ANDAMENTO',
  'AGUARDANDO_PECA',
  'FINALIZADA',
  'CANCELADA'
];

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
export async function buscarPorVeiculo(req, res) {
    const veiculo_id = Number( req.params.id);
    const os = await service.buscarOsporVeiculo(veiculo_id);

    if (!os) return res.status (404).json({message: 'Não foi possivel encontrar a Ordem de serviço'});
    res.json(os);

    
}
export async function criar(req, res) {
    const { veiculo_id, status } = req.body;

    if (!veiculo_id) {
        return res.status(400).json({ message: 'veiculo_id é obrigatório' });
    }

    if (status && !STATUS_VALIDOS.includes(status)) {
        return res.status(400).json({ message: 'status inválido' });
    }

    const novo = await service.criarOs(req.body);
    return res.status(201).json(novo);
}
