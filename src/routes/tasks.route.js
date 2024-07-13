import { Router } from "express";
import { jwtToken } from "../middlewares/auth.middlewares.js";
import {
  createTask,
  editTask,
  getAllTask,
  deleteTask,
  getTask,
  updateStatus,
  getTasksByPriority,
} from "../controllers/task.controllers.js";
const router = Router();
router.use(jwtToken);

router.route("/create").post(createTask);
router.route("/get-all-task").get(getAllTask);
router.route("/get-task/:task_id").get(getTask);
router.route("/update-status/:task_id").patch(updateStatus);
router.route("/delete/:task_id").delete(deleteTask);
router.route("/create/:task_id").patch(editTask);
router.route("/priority").get(getTasksByPriority);

export default router;
