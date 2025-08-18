import { Request, Response } from "express";
import { CredentialData } from "../protocols";
import { postCredentialService } from "../services/credentialService";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

export async function postCredential (req: AuthenticatedRequest, res: Response){
    const { userId } = req;
     if (!userId) return res.status(401).send({ message: "Usuário não autenticado" });
    const result = await postCredentialService(userId, req.body as CredentialData);
    return res.status(201).send(result);
}