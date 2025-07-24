import logger from "../logger";
import Category from "../models/categoryModel";

class CategoryService {
  async create(category) {
    logger.info("CategoryService - create");
    return await category.save().populate("subcategories");
  }

  async list(categoryID) {
    logger.info("CategoryService - list");
    if(!categoryID) {
      logger.info("CategoryService - listAll");
      const categories = await Category.find().populate("subcategories");
      if(categories.length === 0) {
        throw new Error("NoCategoryFound")
      }
      return categories
    } else {
      logger.info("CategoryService - listOne");
      const category = await Category.findOne({categoryID: categoryID}).populate("subcategories");
      if(!category) {
        throw new Error("CategoryNotFound")
      }
      return category
    }
  }

  async update(data, categoryID) {
    logger.info("CategoryService - update");
    const category = await Category.findOne({categoryID: categoryID})
    if(!category) {
      throw new Error("CategoryNotFound")
    }
    Object.assign(category, data)
    return await category.save().populate("subcategories");
  }

  async delete(categoryID) {
    logger.info("CategoryService - delete");
    const category = await Category.findOne({categoryID: categoryID})
    if(!category) {
      throw new Error("CategoryNotFound")
    }
    await category.deleteOne()
  }
}

export default new CategoryService();
