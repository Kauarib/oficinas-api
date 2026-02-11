// src/middlewares/role.js
export function allowRoles(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: true, message: "Não autenticado" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: true, message: "Sem permissão" });
    }

    next();
  };
}
