import Subcategory from "../models/subcategoryModel";
import logger from "../logger";
import Category from "../models/categoryModel";

class CategoryInputDTO {
  constructor(category) {
    this.categoryID = category.categoryID;
    this.name = category.name;
    this.description = category.description;
    this.subcategories = category.subcategories;
  }

  async toCategory() {
    const subcategoryLookup = await Promise.all(
      this.subcategories.map(async (subcategoryID) => {
        const subcategoryDoc = await Subcategory.findOne({
          subcategoryID: subcategoryID,
        });
        return { subcategoryID, subcategoryDoc };
      })
    );

    const missingSubcategories = subcategoryLookup
      .filter(({ subcategoryDoc }) => !subcategoryDoc)
      .map(({ subcategoryID }) => subcategoryID);

    if (missingSubcategories.length > 0) {
      missingSubcategories.forEach((subcategoryID) =>
        logger.error(`Missing subcatgory: ${subcategoryID}`)
      );
      throw new Error("SubcategoryNotFound");
    }

    return new Category({
      categoryID: this.categoryID,
      name: this.name,
      description: this.description,
      subcategories: subcategoryLookup.map(
        ({ subcategoryID }) => subcategoryID
      ),
    });
  }
}

export default CategoryInputDTO;
