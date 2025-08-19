import { Router } from "express";
import validateSchema from "../middlewares/ValidateSchema";
import credentialSchema from "../schema/credentialSchema";
import { deleteCredential, getCredential, postCredential, putCredential } from "../controllers/credentialController";
import { authenticateToken } from "../middlewares/authMiddleware";

const credentialRouter = Router();

credentialRouter.post("/credentials", authenticateToken , validateSchema(credentialSchema), postCredential)
credentialRouter.get("/credentials", authenticateToken, getCredential)
credentialRouter.put("/credentials/:id", authenticateToken, validateSchema(credentialSchema), putCredential)
credentialRouter.delete("/credentials/:id", authenticateToken, deleteCredential)

export default credentialRouter;