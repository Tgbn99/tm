import express from "express";
import tagController from "../controllers/tagController.js";

const router = express.Router();

router.post("/", tagController.create);
router.get("/", tagController.getAll);
router.get("/id/:id", tagController.getByID);
router.put("/id/:id", tagController.update);
router.delete("/id/:id", tagController.delete);

export { router as tagRoutes };
