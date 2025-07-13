import express from "express";
import projectController from "../controllers/projectController.js";

const router = express.Router();

router.post("/", projectController.create);
router.get("/", projectController.getAll);
router.get("/id/:id", projectController.getByID);
router.put("/id/:id", projectController.update);
router.delete("/id/:id", projectController.delete);

export { router as projectRoutes };
