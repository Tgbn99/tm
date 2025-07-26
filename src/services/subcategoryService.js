import Subcategory from "../models/subcategoryModel.js";
import logger from "../logger.js";

class SubcategoryService {
  async create(subcategory) {
    logger.info("SubcategoryService - create");
    const saved = await subcategory.save()
    return await saved.populate("category");
  }

  async list(subcategoryID) {
    logger.info("SubcategoryService - list");
    if (!subcategoryID) {
      const subcategories = await Subcategory.find().populate("category");
      if (subcategories.length === 0) {
        throw new Error("NoSubcategoriesFound");
      }
      return subcategories;
    } else {
      const subcategory = await Subcategory.findOne({
        subcategoryID: subcategoryID,
      }).populate("category");
      if (!subcategory) {
        throw new Error("SubcategoryNotFound");
      }
      return subcategory;
    }
  }

  async update(data, subcategoryID) {
    logger.info("SubcategoryService - update");
    const subcategory = await Subcategory.findOne({
      subcategoryID: subcategoryID,
    });
    if (!subcategory) {
      throw new Error("SubcategoryNotFound");
    }
    const plainData = data.toObject();
    const { _id, ...safeData } = plainData;
    Object.assign(subcategory, safeData);
    const saved = await subcategory.save()
    return await saved.populate("category");
  }

  async delete(subcategoryID) {
    logger.info("SubcategoryService - delete");
    const subcategory = await Subcategory.findOne({
      subcategoryID: subcategoryID,
    });
    if (!subcategory) {
      throw new Error("SubcategoryNotFound");
    }
    await subcategory.deleteOne();
  }
}

export default new SubcategoryService();
