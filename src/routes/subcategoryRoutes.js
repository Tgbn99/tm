import express from "express";
import subcategoryController from "../controllers/subcategoryController.js";

const router = express.Router();

router.post("/", subcategoryController.create);
router.get("/", subcategoryController.getAll);
router.get("/id/:id", subcategoryController.getByID);
router.put("/id/:id", subcategoryController.update);
router.delete("/id/:id", subcategoryController.delete);

export { router as subcategoryRoutes };
