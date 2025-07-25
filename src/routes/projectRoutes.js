import express from "express";
import ProjectController from "../controllers/projectController.js";

const router = express.Router();

router.post("/", ProjectController.createProject);
router.get("/", ProjectController.getAllProjects);
router.get("/id/:projectID", ProjectController.getProject);
router.put("/id/:projectID", ProjectController.updateProject);
router.delete("/id/:projectID", ProjectController.deleteProject);

export { router as projectRoutes };
