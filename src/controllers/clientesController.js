import * as service from '../services/clienteService.js';

export async function listar(req, res) {
  const rows = await service.listarClientes();
  res.json(rows);
}

export async function buscar(req, res) {
  const id = Number(req.params.id);
  const cliente = await service.buscarClientePorId(id);

  if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });
  res.json(cliente);
}

export async function criar(req, res) {
  const { nome } = req.body;
  if (!nome) return res.status(400).json({ message: 'nome é obrigatório' });

  const novo = await service.criarCliente(req.body);
  res.status(201).json(novo);
}

export async function atualizar(req, res) {
  const id = Number(req.params.id);
  const atualizado = await service.atualizarCliente(id, req.body);

  if (!atualizado) return res.status(404).json({ message: 'Cliente não encontrado' });
  res.json(atualizado);
}

export async function remover(req, res) {
  const id = Number(req.params.id);
  const ok = await service.deletarCliente(id);

  if (!ok) return res.status(404).json({ message: 'Cliente não encontrado' });
  res.status(204).send();
}
