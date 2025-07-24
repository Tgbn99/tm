import express from "express";
import CategoryController from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", CategoryController.createCategory);
router.get("/", CategoryController.getAllCategories);
router.get("/id/:categoryID", CategoryController.getCategory);
router.put("/id/:categoryID", CategoryController.updateCategory);
router.delete("/id/:categoryID", CategoryController.deleteCategory);

export { router as categoryRoutes };
