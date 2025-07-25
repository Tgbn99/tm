import Project from "../models/projectModel.js";
import logger from "../logger.js";

class ProjectInputDTO {
  constructor(project) {
    this.projectID = project.projectID;
    this.name = project.name;
    this.description = project.description;
  }

  async toProject() {
    logger.info("toProject");
    return new Project({
      projectID: this.projectID,
      name: this.name,
      description: this.description,
    });
  }
}

export default ProjectInputDTO;
