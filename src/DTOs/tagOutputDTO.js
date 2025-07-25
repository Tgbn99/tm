class TagOutputDTO {
  constructor(tag) {
    this.tagID = tag.tagID;
    this.name = tag.name;
    this.createdAt = tag.createdAt;
    this.updatedAt = tag.updatedAt;
  }
}

export default TagOutputDTO;
