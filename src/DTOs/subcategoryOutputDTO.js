class SubcategoryOutputDTO {
  constructor(subcategory) {
    this.subcategoryID = subcategory.subcategoryID;
    this.name = subcategory.name;
    this.description = subcategory.description;
    this.category = subcategory.category;
    this.createdAt = subcategory.createdAt;
    this.updatedAt = subcategory.updatedAt;
  }
}

export default SubcategoryOutputDTO;
