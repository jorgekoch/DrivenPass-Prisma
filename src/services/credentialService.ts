import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.CRYPTR_SECRET!);
import {
  deleteCredentialRepository,
  getCredentialById,
  getCredentialByIdAndUserId,
  getCredentialsByUserId,
  postCredentialRepository,
  putCredentialRepository
} from "../repositories/credentialRepository";
import { Credential } from "@prisma/client";

export async function postCredentialService(
  userId: number | undefined,
  credentialData: Omit<Credential, "id" | "userId">
) {
  if (!userId) {
    throw { type: "UNAUTHORIZED", message: "Usuário não autenticado" };
  }

  const existing = await getCredentialsByUserId(userId);
  if (existing.some(credential => credential.title === credentialData.title)) {
    throw { type: "USER_ALREADY_EXISTS", message: "Você já possui uma credential com este título" };
  }

  const encryptedPassword = cryptr.encrypt(credentialData.password);

  const newCredentialData = { ...credentialData, password: encryptedPassword };

  const newCredential = await postCredentialRepository(userId, newCredentialData);

  return newCredential;
}

export async function getCredentialService(
  userId: number | undefined,
  credentialId: number
) {
  if (!userId) {
    throw { status: 401, message: "Usuário não autenticado" };
  }

  const credential = await getCredentialByIdAndUserId(credentialId, userId);

  console.log("DEBUG getCredentialService:", { userId, credentialId, credential });

  if (!credential) {
    throw { status: 404, message: "Credencial não encontrada" };
  }

  return {
    ...credential,
    password: cryptr.decrypt(credential.password),
  };
}

export async function putCredentialService(
  userId: number,
  credentialId: number,
  credentialData: Omit<Credential, "id" | "userId">
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

  const encryptedPassword = cryptr.encrypt(credentialData.password);

  const updatedCredentialData = { ...credentialData, password: encryptedPassword };

  const updatedCredential = await putCredentialRepository(
    userId,
    credentialId,
    updatedCredentialData
  );

  return updatedCredential;
}

export async function deleteCredentialService(
  userId: number,
  credentialId: number,
) {
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
