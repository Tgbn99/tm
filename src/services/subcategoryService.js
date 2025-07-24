import Subcategory from "../models/subcategoryModel.js";

class SubcategoryService {
  async create(subcategory) {
    logger.info("SubcategoryService - create");
    return await subcategory.save().populate("category");
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
    Object.assign(subcategory, data);
    return await subcategory.save().populate("category");
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
