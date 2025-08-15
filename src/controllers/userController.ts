import { Request, Response } from "express";
import { postSignUpService } from "../services/userService";
import { UserData } from "../protocols";

export async function postSignUp (req: Request, res: Response){

    const signup = await postSignUpService(req.body as UserData);
    return res.status(201).send(signup);
}

