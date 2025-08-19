import bcrypt from "bcrypt";
import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.CRYPTR_SECRET!);
import { CredentialData } from "../protocols";
import { deleteCredentialRepository, getCredentialById, getCredentialsByUserId, postCredentialRepository, putCredentialRepository } from "../repositories/credentialRepository";

export async function postCredentialService(userId: number|undefined, credentialData: CredentialData){
    if (!userId) {
        throw { type: "UNAUTHORIZED", message: "Usuário não autenticado" };
    }
    const existing = await getCredentialsByUserId(userId);
    if (existing.some(credential => credential.title === credentialData.title)) {
        throw { type: "USER_ALREADY_EXISTS", message: "Você já possui uma credential com este título" };
    }

    const hashedPassword = await bcrypt.hash(credentialData.password, 10);

    const newCredentialData  = { ...credentialData, password: hashedPassword };

    const newCredential = await postCredentialRepository(userId, newCredentialData );

    return newCredential;
};

export async function getCredentialService(userId?:number) {
    if (!userId) {
        throw { status: 401, message: "Usuário não autenticado" };
    }
    const credentials = await getCredentialsByUserId(userId);
    return credentials.map(c => ({
    ...c,
    password: cryptr.decrypt(c.password),
  }));
}

export async function putCredentialService(
  userId: number,
  credentialId: number,
  credentialData: CredentialData
) {
  if (!userId) {
    throw { type: "UNAUTHORIZED", message: "Usuário não autenticado" };
  }

  if (!credentialId) {
    throw { type: "BAD_REQUEST", message: "ID da credencial inválido" };
  }

  const existing = await getCredentialsByUserId(userId);

  if (existing.some(cred => cred.title === credentialData.title && cred.id !== credentialId)) {
    throw { type: "CONFLICT", message: "Você já possui uma credential com este título" };
  }

  const hashedPassword = await bcrypt.hash(credentialData.password, 10);

  const updatedCredentialData = { ...credentialData, password: hashedPassword };

  const updatedCredential = await putCredentialRepository(
    userId,
    credentialId,
    updatedCredentialData
  );

  return updatedCredential;
};

export async function deleteCredentialService (userId: number, credentialId: number,){
  if (!userId) {
    throw { type: "UNAUTHORIZED", message: "Usuário não autenticado" };
  }

  if (!credentialId) {
    throw { type: "BAD_REQUEST", message: "ID da credencial inválido" };
  }

    const credential = await getCredentialById(credentialId);

  if (!credential) {
    throw { type: "NOT_FOUND", message: "Credencial não encontrada" };
  }

  if (credential.userId !== userId) {
    throw { type: "UNAUTHORIZED", message: "Você não tem permissão para excluir esta credencial" };
  }

  await deleteCredentialRepository(credentialId);
}