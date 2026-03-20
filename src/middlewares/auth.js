// src/middlewares/auth.js
import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: true, message: "Token ausente" });
  }

  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ error: true, message: "Formato de token inválido" });
  }

  if (!process.env.JWT_SECRET) {
    console.log("JWT_SECRET não carregou. Verifique dotenv/config e o arquivo .env");
    return res.status(500).json({ error: true, message: "Configuração JWT ausente no servidor" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.sub, role: payload.role, nome: payload.nome };
    return next();
  } catch (err) {
    console.log("JWT VERIFY ERROR:", err.name, err.message);
    return res.status(401).json({ error: true, message: "Token inválido ou expirado" });
  }
}
