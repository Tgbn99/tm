import logger from "../logger";
import Category from "../models/categoryModel";

class CategoryInputDTO {
  constructor(category) {
    this.categoryID = category.categoryID;
    this.name = category.name;
    this.description = category.description;
  }

  async toCategory() {
    logger.info("toCategory")
    return new Category({
      categoryID: this.categoryID,
      name: this.name,
      description: this.description,
    });
  }
}

export default CategoryInputDTO;
