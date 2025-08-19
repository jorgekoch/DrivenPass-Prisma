import { Request, Response } from "express";
import { postCredentialService, getCredentialService, putCredentialService, deleteCredentialService } from "../services/credentialService";
import { AuthenticatedRequest, CredentialData } from "../protocols";

export async function postCredential(req: Request, res: Response) {
    const { userId } = req as unknown as AuthenticatedRequest;
    const credentialData = req.body as CredentialData;
    const result = await postCredentialService(userId, credentialData);
    return res.status(201).send(result);
}

export async function getCredential(req: Request, res: Response) {
    const { userId } = req as unknown as AuthenticatedRequest;
    const result = await getCredentialService(userId);
    return res.status(200).send(result);
}


export async function putCredential(req: Request, res: Response) {
    const { userId } = req as unknown as AuthenticatedRequest;
    const credentialId = Number(req.params.id) ;
    const result = await putCredentialService(userId!, credentialId, req.body);
    return res.status(204).send(result);
}

export async function deleteCredential (req: Request, res: Response) {
    const { userId } = req as unknown as AuthenticatedRequest;
    const credentialId = Number(req.params.id) ;
    const result = await deleteCredentialService(userId!, credentialId);
    return res.status(204).send(result);
}