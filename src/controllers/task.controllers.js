import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { Task } from "../models/task.model.js";
import mongoose from "mongoose";

const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, dueDate, priority } = req.body;
  const task = await Task.create({
    user: new mongoose.Types.ObjectId(req.user?._id),
    title,
    description,
    status,
    dueDate: dueDate ? new Date(dueDate) : null,
    priority,
  });

  res.status(200).json(new ApiResponse(201, task, "Task has been created"));
});
const editTask = asyncHandler(async (req, res) => {
  const { title, description, status, dueDate, priority } = req.body;
  const { task_id } = req.params;
  if (!task_id) {
    throw new ApiError(400, "Only owner can edit this");
  }
  let updateData = {};
  if (title) updateData.title = title;
  if (description) updateData.description = description;
  if (status) updateData.status = status;
  if (dueDate) updateData.dueDate = new Date(dueDate);
  if (priority) updateData.priority = priority;
  const updatedTask = await Task.findByIdAndUpdate(
    task_id,
    { $set: updateData },
    { new: true }
  );
  if (!updatedTask) {
    throw new ApiError(400, "Task not found");
  }
  res
    .status(200)
    .json(
      new ApiResponse(201, updatedTask, "Task has been edited successfully")
    );
});

const getAllTask = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(400, "Unauthorized user ");
  }
  const tasks = await Task.find({ user: userId });
  res
    .status(200)
    .json(new ApiResponse(201, tasks, "All tasks successfully fetched"));
});

const getTask = asyncHandler(async (req, res) => {
  const { task_id } = req.params;

  const tasks = await Task.findById(task_id);
  res
    .status(200)
    .json(new ApiResponse(201, tasks, "Task successfully fetched"));
});

const deleteTask = asyncHandler(async (req, res) => {
  const { task_id } = req.params;
  if (!task_id) {
    throw new ApiError(400, "Invalid task");
  }
  await Task.findByIdAndDelete(task_id);
  res.status(200).json(new ApiResponse(201, {}, "Task deleted successfully"));
});

const updateStatus = asyncHandler(async (req, res) => {
  const task_id = req.params.task_id;
  const status = req.body.status;

  const task = await Task.findById(task_id);

  if (!task) {
    throw new ApiError(400, "Invalid task");
  }
  const updatedTask = await Task.findByIdAndUpdate(
    task_id,
    { status: status.toLowerCase() },
    {
      new: true,
    }
  );
  if (!updatedTask) {
    throw new ApiError(400, "No data found");
  }
  res
    .status(200)
    .json(new ApiResponse(201, updatedTask, "Task updated successfully"));
});

const getTasksByPriority = asyncHandler(async (req, res) => {
  const { priority } = req.query;
  if (!priority) {
    throw new ApiError(400, "Priority parameter is required");
  }

  const tasks = await Task.find({ user: req.user?._id, priority: priority });
  res
    .status(200)
    .json(new ApiResponse(201, tasks, `All ${priority} task fetched`));
});

export {
  createTask,
  editTask,
  getAllTask,
  deleteTask,
  getTask,
  updateStatus,
  getTasksByPriority,
};
