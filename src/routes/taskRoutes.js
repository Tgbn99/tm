import express from "express";
import TaskController from "../controllers/taskController.js";

const router = express.Router();

router.post("/", TaskController.createTask);
router.get("/", TaskController.getAllTasks);
router.get("/id/:taskID", TaskController.getTask);
router.put("/id/:taskID", TaskController.updateTask);
router.delete("/id/:taskID", TaskController.deleteTask);

export { router as taskRoutes };
