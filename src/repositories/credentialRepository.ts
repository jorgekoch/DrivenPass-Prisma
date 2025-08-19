import prisma from "../database";
import { CredentialData } from "../protocols"; 

export async function postCredentialRepository(userId: number, credentialData: CredentialData) {
    const result = await prisma.credential.create({
        data: {
            ...credentialData, 
            userId
    }
    });
    return result;
    
};

export async function getCredentialsByUserId(userId: number) {
    const result = await prisma.credential.findMany({
        where: {userId}
    })
    return result
;}

export async function putCredentialRepository(
    userId: number,
    credentialId: number,
    credentialData: CredentialData
) {
    return await prisma.credential.update({
        where: { id: credentialId },
        data: {
        ...credentialData,
        userId,
        },
    });
}

