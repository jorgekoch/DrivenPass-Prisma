import { Router } from "express";
import { deleteUser } from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";

const eraseRouter = Router();

eraseRouter.delete("/erase", authenticateToken, deleteUser);

export default  eraseRouter;
