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
export async function buscarOsporVeiculo(veiculo_id) {
    const [rows] = await pool.query(
        ' SELECT * FROM  ordens_servico WHERE veiculo_id = ?', [veiculo_id]
    );
    return rows[0] || null;
}
export async function criarOs(data){
    const {veiculo_id,
        status = 'ABERTA', 
        descricao_problema,
        observacoes,
        data_Saida, 
        total_Produtos = 0, 
        total_Servicos = 0, 
        desconto = 0, 
        total_Geral = 0
    } = data;
    const [result] = await pool.query(
        'INSERT INTO ordens_servico (veiculo_id, status, descricao_problema, observacoes, data_saida, total_produtos, total_servicos, desconto, total_geral) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [veiculo_id, status, descricao_problema, observacoes, data_Saida, total_Produtos, total_Servicos, desconto, total_Geral]
    );
    return {id: result.insertId, ...data};
}