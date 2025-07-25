import logger from "../logger.js";
import TagService from "../services/tagService.js";
import TagInputDTO from "../DTOs/tagInputDTO.js";
import TagOutputDTO from "../DTOs/tagOutputDTO.js";
import { MESSAGES } from "../utils/messages.js";

class TagController {
  async createTag(req, res) {
    logger.info("TagController - createTag");
    try {
      const inputDTO = new TagInputDTO(req.body);
      const tagModel = await inputDTO.toTag();
      const savedTag = await TagService.create(tagModel);
      const outputDTO = new TagOutputDTO(savedTag);

      res.status(201).json({
        message: MESSAGES.TAG_CREATED,
        data: outputDTO,
      });
    } catch (err) {
      logger.error("TagController - Error creating tag");
      next(err);
    }
  }

  async getAllTags(req, res) {
    logger.info("TagController - getAllTags");
    try {
      const tags = await TagService.list();
      const outputDTOs = tags.map((tag) => new TagOutputDTO(tag));

      res.status(200).json({
        message: MESSAGES.TAGS_RETRIEVED,
        data: outputDTOs,
      });
    } catch (err) {
      logger.error("TagController - Error retrieving tags");
      next(err);
    }
  }

  async getTag(req, res) {
    logger.info("TagController - getTag");
    try {
      const tag = await TagService.list(req.params.tagID);
      const outputDTO = new TagOutputDTO(tag);

      res.status(200).json({
        message: MESSAGES.TAG_RETRIEVED,
        data: outputDTO,
      });
    } catch (err) {
      logger.error("TagController - Error retrieving tag");
      next(err);
    }
  }

  async updateTag(req, res) {
    logger.info("TagController - updateTag");
    try {
      const inputDTO = new TagInputDTO(req.body);
      const tagModel = await inputDTO.toTag();
      const savedTag = await TagService.update(tagModel, req.params.tagID);
      const outputDTO = new TagOutputDTO(savedTag);

      res.status(201).json({
        message: MESSAGES.TAG_UPDATED,
        data: outputDTO,
      });
    } catch (err) {
      logger.error("TagController - Error updating tag");
      next(err);
    }
  }

  async deleteTag(req, res) {
    logger.info("TagController - deleteTag");
    try {
      await TagService.delete(req.params.tagID);

      res.status(200).json({
        message: MESSAGES.TAG_DELETED,
        data: req.params.tagID,
      });
    } catch (err) {
      logger.error("TagController - Error deleting tag");
      next(err);
    }
  }
}

export default new TagController();
