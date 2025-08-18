import { Router } from "express";
import validateSchema from "../middlewares/ValidateSchema";
import credentialSchema from "../schema/credentialSchema";
import { postCredential } from "../controllers/credentialController";
import { authenticateToken } from "../middlewares/authMiddleware";

const credentialRouter = Router();

credentialRouter.post("/credentials", authenticateToken, validateSchema(credentialSchema), postCredential)

export default credentialRouter;