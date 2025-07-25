import logger from "../logger";

class TagInputDTO {
  constructor(tag) {
    this.tagID = tag.tagID;
    this.name = tag.name;
  }

  async toTag() {
    logger.info("toTag");
    return new Tag({
      tagID: this.tagID,
      name: this.name,
    });
  }
}

export default TagInputDTO;
