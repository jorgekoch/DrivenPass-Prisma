import bcrypt from "bcrypt";
import { UserData } from "../protocols";
import { postSignUpRepository } from "../repositories/userRepository";

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