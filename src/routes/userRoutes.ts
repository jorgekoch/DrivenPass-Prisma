import { Router } from "express";
import validateSchema from "../middlewares/ValidateSchema";
import userSchema from "../schema/userSchema";
import { postSignUp } from "../controllers/userController";

const userRouter = Router();

userRouter.post("/sign-up", validateSchema(userSchema), postSignUp)

export default userRouter;