import { Router } from "express";
import validateSchema from "../middlewares/ValidateSchema";
import userSchema from "../schema/userSchema";
import { postSignUp, signIn } from "../controllers/userController";

const userRouter = Router();

userRouter.post("/sign-up", validateSchema(userSchema), postSignUp)
userRouter.post("/sign-in", validateSchema(userSchema), signIn)

export default userRouter;