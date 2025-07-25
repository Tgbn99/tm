import Project from "../models/projectModel.js";
import logger from "../logger";

class ProjectService {
  async create(project) {
    logger.info("ProjectService - create");
    return await project.save().populate("tasks");
  }

  async list(projectID) {
    logger.info("ProjectService - list");
    if (!projectID) {
      logger.info("ProjectService - listAll");
      const projects = await Project.find().populate("tasks");
      if (projects.length === 0) {
        throw new Error("NoProjectFound");
      }
      return projects;
    } else {
      logger.info("ProjectService - listOne");
      const project = await Project.findOne({ projectID: projectID }).populate(
        "tasks"
      );
      if (!project) {
        throw new Error("ProjectNotFound");
      }
      return project;
    }
  }

  async update(data, projectID) {
    logger.info("ProjectService - update");
    const project = await Project.findOne({ projectID: projectID });
    if (!project) {
      throw new Error("ProjectNotFound");
    }
    Object.assign(project, data);
    return await project.save().populate("tasks");
  }

  async delete() {
    logger.info("ProjectService - delete");
    const project = await Project.findOne({ projectID: projectID });
    if (!project) {
      throw new Error("ProjectNotFound");
    }
    await project.deleteOne();
  }
}

export default new ProjectService();
