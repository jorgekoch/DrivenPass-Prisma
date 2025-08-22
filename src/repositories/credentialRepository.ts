import { Credential } from "@prisma/client";
import prisma from "../database";

export async function postCredentialRepository(userId: number, credentialData: Omit<Credential, "id" | "userId">) {
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
    return result;
};

export async function getCredentialByIdAndUserId(id: number, userId: number) {
  return prisma.credential.findFirst({
    where: { id, userId },
  });
}

export async function putCredentialRepository(
    userId: number,
    credentialId: number,
    credentialData: Omit<Credential, "id" | "userId">
) {
    return await prisma.credential.update({
        where: { id: credentialId },
        data: {
        ...credentialData,
        userId,
        },
    });
};

export async function getCredentialById(id: number) {
    return prisma.credential.findUnique({
        where: { id },
    });
};

export async function deleteCredentialRepository(id: number) {
    return prisma.credential.delete({
        where: { id },
    });
};