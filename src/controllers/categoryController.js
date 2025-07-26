import CategoryInputDTO from "../DTOs/categoryInputDTO.js";
import CategoryOutputDTO from "../DTOs/categoryOutputDTO.js";
import CategoryService from "../services/categoryService.js";
import { MESSAGES } from "../utils/messages.js";
import logger from "../logger.js";

class CategoryController {
  async createCategory(req, res, next) {
    logger.info("CategoryController - createCategory");
    try {
      const inputDTO = new CategoryInputDTO(req.body);
      const categoryModel = await inputDTO.toCategory();
      const savedCategory = await CategoryService.create(categoryModel);
      const outputDTO = new CategoryOutputDTO(savedCategory);

      res.status(201).json({
        message: MESSAGES.CATEGORY_CREATED,
        data: outputDTO,
      });
    } catch (err) {
      logger.info("CategoryController - Error creating category");
      next(err);
    }
  }

  async getAllCategories(req, res, next) {
    logger.info("CategoryController - getAllCategories");
    try {
      const categories = await CategoryService.list();
      const outputDTOs = categories.map(
        (category) => new CategoryOutputDTO(category)
      );

      res.status(200).json({
        message: MESSAGES.CATEGORIES_RETRIEVED,
        data: outputDTOs,
      });
    } catch {
      logger.info("CategoryController - Error retrieving categories");
      next(err);
    }
  }

  async getCategory(req, res, next) {
    logger.info("CategoryController - getCategory");
    try {
      const category = await CategoryService.list(req.params.categoryID);
      const outputDTO = new CategoryOutputDTO(category);

      res.status(200).json({
        message: MESSAGES.CATEGORY_RETRIEVED,
        data: outputDTO,
      });
    } catch {
      logger.info("CategoryController - Error retrieving category");
      next(err);
    }
  }

  async updateCategory(req, res, next) {
    logger.info("CategoryController - updateCategory");
    try {
      const inputDTO = new CategoryInputDTO(req.body);
      const categoryModel = await inputDTO.toCategory();
      const savedCategory = await CategoryService.update(
        categoryModel,
        req.params.categoryID
      );
      const outputDTO = new CategoryOutputDTO(savedCategory);

      res.status(201).json({
        message: MESSAGES.CATEGORY_UPDATED,
        data: outputDTO,
      });
    } catch (err) {
      logger.info("CategoryController - Error updating category");
      next(err);
    }
  }

  async deleteCategory(req, res, next) {
    logger.info("CategoryController - deleteCategory");
    try {
      await CategoryService.delete(req.params.categoryID);
      res.status(200).json({
        message: MESSAGES.CATEGORY_DELETED,
        data: req.params.categoryID,
      });
    } catch (err) {
      logger.info("CategoryController - Error deleting category");
      next(err);
    }
  }
}

export default new CategoryController()
