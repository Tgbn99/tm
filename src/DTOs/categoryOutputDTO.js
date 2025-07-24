class CategoryOutputDTO {
  constructor(category) {
    this.categoryID = category.categoryID;
    this.name = category.name;
    this.description = category.description;
    this.subcategories = category.subcategories;
    this.createdAt = category.createdAt;
    this.updatedAt = category.updatedAt;
  }
}

export default CategoryOutputDTO;
