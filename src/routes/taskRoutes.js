import express from "express";
import taskController from "../controllers/taskController.js";

const router = express.Router();

router.post("/", taskController.create);
router.get("/", taskController.getAll);
router.get("/id/:id", taskController.getByID);
router.put("/id/:id", taskController.update);
router.delete("/id/:id", taskController.delete);

export { router as taskRoutes };
