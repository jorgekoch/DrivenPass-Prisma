import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "minha_chave_secreta";

export interface AuthenticatedRequest extends Request {
  userId?: number;
}

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // formato: "Bearer token"

  if (!token) {
    return res.status(401).send({ message: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    req.userId = decoded.userId; // agora o userId fica disponível no request
    next();
  } catch (err) {
    return res.status(403).send({ message: "Token inválido ou expirado" });
  }
}
