import logger from "../logger.js";
import Tag from "../models/tagModel.js";

class TagService {
  async create(tag) {
    logger.info("TagService - create");
    return await tag.save();
  }

  async list(tagID) {
    logger.info("TagService - list");
    if (!tagID) {
      logger.info("TagService - listAll");
      const tags = await Tag.find();
      if (tags.length === 0) {
        throw new Error("NoTagFound");
      }
      return tags;
    } else {
      logger.info("TagService - listOne");
      const tag = await Tag.findOne({ tagID: tagID });
      if (!tag) {
        throw new Error("TagNotFound");
      }
      return tag;
    }
  }

  async update(data, tagID) {
    logger.info("TagService - update");
    const tag = Tag.findOne({ tagID: tagID });
    if (!tag) {
      throw new Error("TagNotFound");
    }
    Object.assign(data, tag);
    return await tag.save();
  }

  async delete(tagID) {
    logger.info("TagService - delete");
    const tag = Tag.findOne({ tagID: tagID });
    if (!tag) {
      throw new Error("TagNotFound");
    }
    await tag.deleteOne();
  }
}

export default new TagService();
