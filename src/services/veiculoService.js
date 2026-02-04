import e from "cors";
import { pool } from "../db.js";

export async function listarVeiculos() {
    const [rows] = await pool.query(
        `SELECT v.*, c.nome AS cliente_nome
         FROM veiculos v
         JOIN clientes c ON v.cliente_id = c.id
         ORDER BY v.id DESC`
    );
    return rows;

}
export async function buscarVeiculoPorId(id) {
  console.log("[service] id recebido:", id, "tipo:", typeof id);

  const veiculoId = Number(id);
  console.log("[service] veiculoId:", veiculoId, "isInteger:", Number.isInteger(veiculoId));

  // validação correta (usa veiculoId, não id)
  if (!Number.isInteger(veiculoId) || veiculoId < 1) {
    throw new Error("ID do veículo inválido");
  }

  const [rows] = await pool.query(
    `SELECT v.*, c.nome AS cliente_nome
     FROM veiculos v
     LEFT JOIN clientes c ON v.cliente_id = c.id
     WHERE v.id = ?
     LIMIT 1`,
    [veiculoId]
  );

  console.log("[service] rows.length =", rows.length);
  return rows[0] ?? null;
}

export async function criarVeiculo(data) {
    const { clienteId, marca, modelo, ano} = data;
    const sql =`
        INSERT INTO veiculos (cliente_id, marca, modelo, ano)
        VALUES (?, ?, ?, ?)`
    ;

    const [result] = await pool.query(
        
        sql, [clienteId, marca ?? null, modelo ?? null, ano ?? null]
    );
    return result.insertId;

}

export async function deletarVeiculo(id) {
    const [result] = await pool.query('DELETE FROM veiculos WHERE id = ?', [id]);
    return result.affectedRows > 0;
}
