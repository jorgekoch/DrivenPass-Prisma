import { Request, Response } from "express";
import { postSignUpService, signInService } from "../services/userService";
import { UserData } from "../protocols";

export async function postSignUp (req: Request, res: Response){

    const signup = await postSignUpService(req.body as UserData);
    return res.status(201).send(signup);
}

export async function signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await signInService({ email, password });
    return res.status(200).json({ token });
}