import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../protocols";

const JWT_SECRET = process.env.JWT_SECRET || "minha_chave_secreta";


export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 

  if (!token) {
    return res.status(401).send({ message: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    (req as unknown as AuthenticatedRequest).userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).send({ message: "Token inválido ou expirado" });
  }
}
