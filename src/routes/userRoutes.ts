import { Router } from "express";
import validateSchema from "../middlewares/ValidateSchema";
import { postSignUp, signIn } from "../controllers/userController";
import { signInSchema, userSchema } from "../schema/userSchema";

const userRouter = Router();

userRouter.post("/sign-up", validateSchema(userSchema), postSignUp)
userRouter.post("/sign-in", validateSchema(signInSchema), signIn)

export default userRouter;