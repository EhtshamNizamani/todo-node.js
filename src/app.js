import express, { urlencoded } from "express";
import cors from "cors";

const app = express();

app.use(urlencoded);
app.use(cors({ origin: process.CORS_ORIG, credentials: true }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

export { app };
