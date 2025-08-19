import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserData } from "../protocols";
import { getUserByEmail, postSignUpRepository } from "../repositories/userRepository";

export async function postSignUpService(userData: UserData){
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUserData = { ...userData, password: hashedPassword };

  const user = await postSignUpRepository(newUserData);

  if (!user) {
    if (!user) {
      throw { type: "USER_ALREADY_EXISTS", message: "Email já cadastrado" };
    }  
  }

  return { id: user.id, name: user.name, email: user.email };
}

const JWT_SECRET = process.env.JWT_SECRET || "minha_chave_secreta";

export async function signInService({ email, password }: { email: string; password: string }) {
    const user = await getUserByEmail(email);
    if (!user) throw { type: "notFoundError", message: "Usuário não encontrado" };

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw { type: "unauthorizedError", message: "Senha incorreta" };

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    return token;
}