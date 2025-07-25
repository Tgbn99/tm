import express from "express";
import TagController from "../controllers/tagController.js";

const router = express.Router();

router.post("/", TagController.createTag);
router.get("/", TagController.getAllTags);
router.get("/id/:tagID", TagController.getTag);
router.put("/id/:tagID", TagController.updateTag);
router.delete("/id/:tagID", TagController.deleteTag);

export { router as tagRoutes };
