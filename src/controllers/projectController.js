import ProjectInputDTO from "../DTOs/projectInputDTO.js";
import ProjectOutputDTO from "../DTOs/projectOutputDTO.js";
import ProjectService from "../services/projectService.js";
import logger from "../logger.js";
import { MESSAGES } from "../utils/messages.js";

class ProjectController {
  async createProject(req, res, next) {
    logger.info("ProjectController - createProject");
    try {
      const inputDTO = new ProjectInputDTO(req.body);
      const projectModel = await inputDTO.toProject();
      const savedProject = await ProjectService.create(projectModel);
      const outputDTO = new ProjectOutputDTO(savedProject);

      res.status(201).json({
        message: MESSAGES.PROJECT_CREATED,
        data: outputDTO,
      });
    } catch (err) {
      logger.error("ProjectController - Error creating project");
      next(err);
    }
  }

  async getAllProjects(req, res, next) {
    logger.info("ProjectController - getAllProjects");
    try {
      const projects = await ProjectService.list();
      const outputDTOs = projects.map(
        (project) => new ProjectOutputDTO(project)
      );

      res.status(201).json({
        message: MESSAGES.PROJECTS_RETRIEVED,
        data: outputDTOs,
      });
    } catch (err) {
      logger.error("ProjectController - Error retrieving projects");
      next(err);
    }
  }

  async getProject(req, res, next) {
    logger.info("ProjectController - getProject");
    try {
      const project = await ProjectService.list(req.params.projectID);
      const outputDTO = new ProjectOutputDTO(project);

      res.status(201).json({
        message: MESSAGES.PROJECT_RETRIEVED,
        data: outputDTO,
      });
    } catch (err) {
      logger.error("ProjectController - Error retrieving project");
      next(err);
    }
  }

  async updateProject(req, res, next) {
    logger.info("ProjectController - updateProject");
    try {
      const inputDTO = new ProjectInputDTO(req.body);
      const projectModel = await inputDTO.toProject();
      const savedProject = await ProjectService.update(
        projectModel,
        req.params.projectID
      );
      const outputDTO = new ProjectOutputDTO(savedProject);

      res.status(201).json({
        message: MESSAGES.PROJECT_UPDATED,
        data: outputDTO,
      });
    } catch (err) {
      logger.error("ProjectController - Error updating project");
      next(err);
    }
  }

  async deleteProject(req, res, next) {
    logger.info("ProjectController - deleteProject");
    try {
      await ProjectService.delete(req.params.projectID);
      res.status(200).json({
        message: MESSAGES.PROJECT_DELETED,
        data: req.params.projectID,
      });
    } catch (err) {
      logger.error("ProjectController - Error deleting project");
      next(err);
    }
  }
}

export default new ProjectController();
