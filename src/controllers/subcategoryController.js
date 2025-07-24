import SubcategoryInputDTO from "../DTOs/subcategoryInputDTO.js";
import SubcategoryOutputDTO from "../DTOs/subcategoryOutputDTO.js";
import SubcategoryService from "../services/subcategoryService.js";
import { MESSAGES } from "../utils/messages.js";

class SubcategoryController {
  async createSubcategory(req, res) {
    logger.info("SubcategoryController - createSubcategory");
    try {
        const inputDTO = new SubcategoryInputDTO(req.body)
        const subcategoryModel = await inputDTO.toSubcategory()
        const savedSubcategory = await SubcategoryService.create(subcategoryModel)
        const outputDTO = new SubcategoryOutputDTO(savedSubcategory)

        res.status(201).json({
            message: MESSAGES.SUBCATEGORY_CREATED,
            data: outputDTO
        })
    } catch (err) {
      logger.error("SubcategoryController - Error creating subcategory");
      next(err);
    }
  }

  async getAllSubcategories(req, res) {
    logger.info("SubcategoryController - getAllSubcategories");
    try {
        const subcategories = await SubcategoryService.list()
        const outputDTOs = subcategories.map((subcategory) => new SubcategoryOutputDTO(subcategory))

        res.status(200).json({
            message: MESSAGES.SUBCATEGORIES_RETRIEVED,
            data: outputDTOs
        })
    } catch (err) {
      logger.error("SubcategoryController - Error retrieving subcategories");
      next(err);
    }
  }

  async getSubcategory(req, res) {
    logger.info("SubcategoryController - getSubcategory");
    try {
        const subcategory = await SubcategoryService.list(req.params.subcategoryID)
        const outputDTO = new SubcategoryOutputDTO(subcategory)

        res.status(200).json({
            message: MESSAGES.SUBCATEGORY_RETRIEVED,
            data: outputDTO
        })
    } catch (err) {
      logger.error("SubcategoryController - Error retrieving subcategory");
      next(err);
    }
  }

  async updateSubcategory(req, res) {
    logger.info("SubcategoryController - updateSubcategory");
    try {
        const inputDTO = new SubcategoryInputDTO(req.body)
        const subcategoryModel = await inputDTO.toSubcategory()
        const savedSubcategory = await SubcategoryService.update(subcategoryModel, req.params.subcategoryID)
        const outputDTO = new SubcategoryOutputDTO(savedSubcategory)

        res.status(201).json({
            message: MESSAGES.SUBCATEGORY_UPDATED,
            data: outputDTO
        })
    } catch (err) {
      logger.error("SubcategoryController - Error updating subcategory");
      next(err);
    }
  }

  async deleteSubcategory(req, res) {
    logger.info("SubcategoryController - deleteSubcategory");
    try {
        await SubcategoryService.delete(req.params.subcategoryID)

        res.status(200).json({
            message: MESSAGES.SUBCATEGORY_DELETED,
            data: req.params.subcategoryID
        })
    } catch (err) {
      logger.error("SubcategoryController - Error deleting subcategory");
      next(err);
    }
  }
}

export default new SubcategoryController();
