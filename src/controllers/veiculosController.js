import * as service from '../services/veiculoService.js';

export async function listar(req, res) {
  const rows = await service.listarVeiculos();
  res.json(rows);
};
export async function buscar(req, res ) {
    try{
        const id = Number (req.params.id);
        const veiculo = await service.buscarVeiculoPorId(id);

        if (!veiculo) return  res.status (404).json({message: 'Veículo não encontrado'});

        res.json (veiculo);
    }catch (error){
        
        console.error("[controller] ERRO:", error);
        return res.status(500).json({
        message: "Erro ao buscar veículo",
        error: error.message,
        code: error.code,
        errno: error.errno,
        sqlState: error.sqlState,});
    };
    console.log("URL:", req.originalUrl);
    console.log("params:", req.params);
    console.log("query:", req.query);

    
};
export async function buscarPorCliente(req, res) {
    const clienteId = Number (req.params.clienteId);
    const veiculos = await service.buscarVeiculosPorCliente(clienteId);
    res.json(veiculos);
}

export async function criar (req, res) {
    const { clienteId, marca, modelo, ano} = req.body;
    if (!clienteId) return res.status (400).json({message: 'clienteId é obrigatório'});

    const novo = await service.criarVeiculo(req.body);
    res.status (201).json (novo);
};
export async function atualizar (req, res) {
    const id = Number (req.params.id);
    const { clienteId, marca, modelo, ano } = req.body;
    if (!clienteId) return res.status (400).json({message: 'clienteId é obrigatório'});

    const ok = await service.atualizarVeiculo(id, req.body);
    if (!ok) return res.status (404).json({message: 'Veículo não encontrado'});
    res.json ({message: 'Veículo atualizado com sucesso'});
}
export async function remover (req, res) {
    const id = Number (req.params.id);
    const ok = await service.deletarVeiculo(id);
    if (!ok) return res.status (404).json({message: 'Veículo não encontrado'});
    res.status (204).send();
}