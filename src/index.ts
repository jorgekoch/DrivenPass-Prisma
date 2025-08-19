import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import errorHandler from "./middlewares/errorHandler";
import credentialRouter from "./routes/credentialRoutes";
import eraseRouter from "./routes/eraseRoutes";


dotenv.config();

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).send("I’m OK!");
});

app.use(userRouter);
app.use(credentialRouter);
app.use(eraseRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
