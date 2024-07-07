import { Router } from "express";
import { jwtToken } from "../middlewares/auth.middlewares.js";
import { register, login, logout } from "../controllers/user.controllers.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(jwtToken, logout);

export default router;
