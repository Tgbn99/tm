import logger from "../logger.js";
import Category from "../models/categoryModel.js";

class CategoryService {
  async create(category) {
    logger.info("CategoryService - create");
    const saved = await category.save();
    return await saved.populate("subcategories");
  }

  async list(categoryID) {
    logger.info("CategoryService - list");
    if (!categoryID) {
      logger.info("CategoryService - listAll");
      const categories = await Category.find().populate("subcategories");
      if (categories.length === 0) {
        throw new Error("NoCategoryFound");
      }
      return categories;
    } else {
      logger.info("CategoryService - listOne");
      const category = await Category.findOne({
        categoryID: categoryID,
      }).populate("subcategories");
      if (!category) {
        throw new Error("CategoryNotFound");
      }
      return category;
    }
  }

  async update(data, categoryID) {
    logger.info("CategoryService - update");
    const category = await Category.findOne({ categoryID: categoryID });
    if (!category) {
      throw new Error("CategoryNotFound");
    }
    const plainData = data.toObject();
    const { _id, ...safeData } = plainData;
    Object.assign(category, safeData);
    const saved = await category.save();
    return await saved.populate("subcategories");
  }

  async delete(categoryID) {
    logger.info("CategoryService - delete");
    const category = await Category.findOne({ categoryID: categoryID });
    if (!category) {
      throw new Error("CategoryNotFound");
    }
    await category.deleteOne();
  }
}

export default new CategoryService();
