import * as authService from "../services/authService.js";

export async function login(req, res, next) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: true, message: "email e senha são obrigatórios" });
    }

    const result = await authService.login(email, senha);
    return res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function criarUsuario(req, res, next) {
  try {
    const { nome, email, senha, role } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: true, message: "nome, email e senha são obrigatórios" });
    }

    // ✅ por padrão cria FUNCIONARIO, mas admin pode criar admin se você permitir
    const id = await authService.criarUsuario({
      nome,
      email,
      senha,
      role: role || "FUNCIONARIO",
    });

    return res.status(201).json({ id });
  } catch (err) {
    next(err);
  }
}
export async function buscarUsuarioPorId(req, res, next) {
  try {
    const id = Number(req.params.id);
    const usuario = await authService.buscarUsuarioPorId(id);

    if (!usuario) {
      return res.status(404).json({ error: true, message: "Usuário não encontrado" });
    }

    return res.json(usuario);
  } catch (err) {
    next(err);
  }
}
export async function listarUsuarios(req, res, next) {
  try {
    const usuarios = await authService.listarUsuarios();
    return res.json(usuarios);
  } catch (err) {
    next(err);
  }
}
export async function atualizarUsuario(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { nome, email, senha, role, ativo } = req.body;

    const updates = { nome, email, senha, role, ativo };
    // ✅ só passa os campos que foram enviados
    Object.keys(updates).forEach((key) => updates[key] === undefined && delete updates[key]);

    await authService.atualizarUsuario(id, updates);
    return res.json({ message: "Usuário atualizado com sucesso" });
  } catch (err) {
    next(err);
  }
}
export async function deletarUsuario(req, res, next) {
  try {
    const id = Number(req.params.id);
    await authService.deletarUsuario(id);
    return res.json({ message: "Usuário deletado com sucesso" });
  } catch (err) {
    next(err);
  }
}