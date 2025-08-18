import bcrypt from "bcrypt";
import { CredentialData } from "../protocols";
import { getCredentialsByUserId, postCredentialRepository } from "../repositories/credentialRepository";

export async function postCredentialService(userId: number, credentialData: CredentialData){

    const existing = await getCredentialsByUserId(userId);
    if (existing.some(credential => credential.title === credentialData.title)) {
        throw { type: "USER_ALREADY_EXISTS", message: "Você já possui uma credential com este título" };
    }

    const hashedPassword = await bcrypt.hash(credentialData.password, 10);

    const newCredentialData  = { ...credentialData, password: hashedPassword };

    const newCredential = await postCredentialRepository(userId, newCredentialData );

    return newCredential;
}