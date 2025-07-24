import express from "express";
import SubcategoryController from "../controllers/subcategoryController.js";

const router = express.Router();

router.post("/", SubcategoryController.createSubcategory);
router.get("/", SubcategoryController.getAllSubcategories);
router.get("/id/:subcategoryID", SubcategoryController.getSubcategory);
router.put("/id/:subcategoryID", SubcategoryController.updateSubcategory);
router.delete("/id/:subcategoryID", SubcategoryController.deleteSubcategory);

export { router as subcategoryRoutes };
