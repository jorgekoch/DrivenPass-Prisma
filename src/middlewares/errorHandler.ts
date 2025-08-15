import { NextFunction, Request, Response } from "express";
import { CustomError } from "../protocols";


export default function errorHandler(
  error: CustomError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if ('type' in error) {

    if (error.type === 'USER_ALREADY_EXISTS') {
      return res.status(409).json({ message: error.message });
    }

    if (error.type === 'VALIDATION_ERROR') {
      return res.status(422).json({ message: error.message });
    }

    if (error.type === 'NOT_FOUND') {
      return res.status(404).json({ message: error.message });
    }

    if (error.type === 'UNAUTHORIZED') {
      return res.status(401).json({ message: error.message });
    }

    if (error.type === 'BAD_REQUEST') {
      return res.status(400).json({ message: error.message });
    }

    // fallback para tipos inesperados
    return res.status(500).json({ message: error.message });
  }

  // erro genérico sem type
  return res.status(500).json({ message: error.message });
}
