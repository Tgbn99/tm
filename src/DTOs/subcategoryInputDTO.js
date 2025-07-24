import logger from "../logger.js"
import Category from "../models/categoryModel.js"
import Subcategory from "../models/subcategoryModel.js"

class SubcategoryInputDTO {
    constructor(subcategory) {
        this.subcategoryID = subcategory.subcategoryID
        this.name = subcategory.name
        this.description = subcategory.description
        this.category = subcategory.category
    }

    async toSubcategory() {
        logger.info("toSubcategory")
        const subcatCategory = await Category.findOne({categoryID: this.category})
        if(!subcatCategory) {
            throw new Error("CategoryNotFound")
        }
        return new Subcategory({
            subcategoryID: this.subcategoryID,
            name: this.name,
            description: this.description,
            category: subcatCategory._id
        })
    }
}

export default SubcategoryInputDTO