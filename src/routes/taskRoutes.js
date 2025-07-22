import express from "express";
import taskController from "../controllers/taskController.js";

const router = express.Router();

router.post("/", taskController.createTask);
router.get("/", taskController.getAllTasks);
router.get("/id/:id", taskController.getTask);
router.put("/id/:id", taskController.updateTask);
router.delete("/id/:id", taskController.deleteTask);

export { router as taskRoutes };
