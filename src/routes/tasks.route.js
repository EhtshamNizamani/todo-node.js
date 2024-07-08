import { Router } from "express";
import { jwtToken } from "../middlewares/auth.middlewares.js";
import { createTask, editTask } from "../controllers/task.controllers.js";
const router = Router();
router.use(jwtToken);

router.route("/create").post(createTask);
router.route("/create/:task_id").patch(editTask);

export default router;
