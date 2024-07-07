import express, { urlencoded } from "express";
import cors from "cors";

const app = express();

app.use(cors({ origin: process.CORS_ORIG, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//routes
import userRouter from "./routes/user.route.js";

//authRouter
app.use("/api/v1/users", userRouter);
export { app };
