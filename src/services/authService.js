import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { pool } from '../db.js';
import { id } from 'zod/locales';

function singToken(user){
    return jwt.sign(
        {sub: user.id, role: user.role, name: user.name},
        process.env.JW_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    );
}

export async function login (email, senha) {
    const [rows] = await pool.query(
        "SELECT id, nome, email, senha_hash, role, ativo FROM usuarios WHERE email = ?",
        [email]
    )
    const user = rows[0];
    if(!user || !user.ativo){
        const err = new Error ('Usuário ou senha inválidos');
        err.StatusCode = 401;
        throw err;
    }
    const ok = await bycrypt.compare(senha, user.senha_hash);
    if(!ok){
        const err = new Error ('Usuário ou senha inválidos');
        err.StatusCode = 401;
        throw err;
    }
    const token = singToken (user);
    return {
        token, user: {
            id: user.id,
            nome: user.nome,
            email: user.email,
            role: user.role
        },
    };
}
export async function criarUsuario({ nome, email, senha, role = "FUNCIONARIO" }) {
  const [exists] = await pool.query("SELECT id FROM usuarios WHERE email = ?", [email]);
  if (exists.length) {
    const err = new Error("Email já cadastrado");
    err.statusCode = 409;
    throw err;
  }

  const senha_hash = await bcrypt.hash(senha, 10);

  const [result] = await pool.query(
    "INSERT INTO usuarios (nome, email, senha_hash, role) VALUES (?, ?, ?, ?)",
    [nome, email, senha_hash, role]
  );

  return result.insertId;
}
export async function buscarUsuarioPorId(id) {
  const [rows] = await pool.query(
    "SELECT id, nome, email, role, ativo FROM usuarios WHERE id = ?",
    [id]
  );
  return rows[0];
}
export async function listarUsuarios() {
  const [rows] = await pool.query(
    "SELECT id, nome, email, role, ativo FROM usuarios"
  );
  return rows;
}
export async function atualizarUsuario(id, { nome, email, senha, role, ativo }) {
  const usuario = await buscarUsuarioPorId(id);
  if (!usuario) {
    const err = new Error("Usuário não encontrado");
    err.statusCode = 404;
    throw err;
  }

  const updates = [];
  const params = [];

  if (nome) {
    updates.push("nome = ?");
    params.push(nome);
  }
  if (email) {
    updates.push("email = ?");
    params.push(email);
  }
  if (senha) {
    const senha_hash = await bcrypt.hash(senha, 10);
    updates.push("senha_hash = ?");
    params.push(senha_hash);
  }
  if (role) {
    updates.push("role = ?");
    params.push(role);
  }
  if (ativo !== undefined) {
    updates.push("ativo = ?");
    params.push(ativo);
  }

  if (updates.length === 0) {
    return;
  }

  params.push(id);

  const sql = `UPDATE usuarios SET ${updates.join(", ")} WHERE id = ?`;
  await pool.query(sql, params);
}

export async function deletarUsuario(id) {
  const usuario = await buscarUsuarioPorId(id);
  if (!usuario) {
    const err = new Error("Usuário não encontrado");
    err.statusCode = 404;
    throw err;
  }

  await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
}
