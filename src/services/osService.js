import e from "express";
import { pool } from "../db.js";

export async function listarOs() {
    const [rows] = await pool.query('SELECT * FROM ordens_servico ORDER BY id DESC');
    return rows;

}
export async function buscarOsporId(id){
    const [rows] = await pool.query('SELECT * FROM ordens_servico WHERE id = ?', [id]);
    return rows[0] || null;

}
export async function criarOs(data){
    const {veiculoid, status, descricao, dataSaida, totalProdutos, totalServicos, desconto, valorTotal} = data;
    const [result] = await pool.query(
        'INSERT INTO ordens_servico (veiculo_id, status, descricao, data_saida, total_produtos, total_servicos, desconto, total_geral) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [veiculoid, status, descricao, dataSaida, totalProdutos, totalServicos, desconto, valorTotal]
    );
    return result;
}