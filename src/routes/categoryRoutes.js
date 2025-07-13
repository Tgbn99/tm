import express from "express";
import categoryController from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", categoryController.create);
router.get("/", categoryController.getAll);
router.get("/id/:id", categoryController.getByID);
router.put("/id/:id", categoryController.update);
router.delete("/id/:id", categoryController.delete);

export { router as categoryRoutes };
