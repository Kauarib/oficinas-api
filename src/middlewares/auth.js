// src/middlewares/auth.js
import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: true, message: "Token ausente" });
  }

  const token = header.slice("Bearer ".length);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.sub, role: payload.role, nome: payload.nome };
    return next();
  } catch {
    return res.status(401).json({ error: true, message: "Token inválido ou expirado" });
  }
}
