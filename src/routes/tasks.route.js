import { Router } from "express";
import { jwtToken } from "../middlewares/auth.middlewares.js";
import {
  createTask,
  editTask,
  getAllTask,
  deleteTask,
  getTask,
} from "../controllers/task.controllers.js";
const router = Router();
router.use(jwtToken);

router.route("/create").post(createTask);
router.route("/get-all-task").get(getAllTask);
router.route("/get-task/:task_id").get(getTask);

router.route("/delete/:task_id").delete(deleteTask);

router.route("/create/:task_id").patch(editTask);

export default router;
