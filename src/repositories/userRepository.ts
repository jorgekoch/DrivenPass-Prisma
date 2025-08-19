import prisma from "../database";
import { UserData } from "../protocols";

export async function postSignUpRepository(userData: UserData){
    const result = await getUserByEmail(userData.email);
    if (result) {
        return null
    }

    const user = await prisma.user.create({
        data: {
            name: userData.name,
            email: userData.email,
            password: userData.password

        }
    })
    return user;
}

export async function getUserByEmail(email:string) {
    const result = await prisma.user.findUnique({
        where: {email}
    })
    return result;
}

export async function deleteUserCredentialsRepository(userId: number) {
  return prisma.credential.deleteMany({
    where: { userId },
  });
}

export async function deleteUserRepository(userId: number) {
  return prisma.user.delete({
    where: { id: userId },
  });
}