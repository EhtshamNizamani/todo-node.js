import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ origin: process.CORS_ORIG, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//routes
import userRouter from "./routes/user.route.js";
import taskRouter from "./routes/tasks.route.js";

//authRouter
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);
export { app };
