import { pool } from '../db.js';

export async function listarClientes() {
  const [rows] = await pool.query('SELECT * FROM clientes ORDER BY id DESC');
  return rows;
}

export async function buscarClientePorId(id) {
  const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
  return rows[0] || null;
}

export async function criarCliente(data) {
  const { nome, cpf, telefone, email, endereco } = data;

  const [result] = await pool.query(
    'INSERT INTO clientes (nome, cpf, telefone, email, endereco) VALUES (?, ?, ?, ?, ?)',
    [nome, cpf ?? null, telefone ?? null, email ?? null, endereco ?? null]
  );

  return buscarClientePorId(result.insertId);
}

export async function atualizarCliente(id, data) {
  const atual = await buscarClientePorId(id);
  if (!atual) return null;

  const nome = data.nome ?? atual.nome;
  const cpf = data.cpf ?? atual.cpf;
  const telefone = data.telefone ?? atual.telefone;
  const email = data.email ?? atual.email;
  const endereco = data.endereco ?? atual.endereco;

  await pool.query(
    `UPDATE clientes
     SET nome = ?, cpf = ?, telefone = ?, email = ?, endereco = ?
     WHERE id = ?`,
    [nome, cpf, telefone, email, endereco, id]
  );

  return buscarClientePorId(id);
}

export async function deletarCliente(id) {
  const [result] = await pool.query('DELETE FROM clientes WHERE id = ?', [id]);
  return result.affectedRows > 0;
}
