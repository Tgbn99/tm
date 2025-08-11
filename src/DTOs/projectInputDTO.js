import Project from "../models/projectModel.js";
import logger from "../logger.js";

class ProjectInputDTO {
  constructor(project) {
    this.projectID = project.projectID;
    this.name = project.name;
    this.description = project.description;
    this.dueDate = project.dueDate ? new Date(project.dueDate) : undefined;
    this.startedAt = project.startedAt ? new Date(project.startedAt) : undefined;
    this.completedAt = project.completedAt ? new Date(project.completedAt) : undefined;
  }

  async toProject() {
    logger.info("toProject");

    const isValidDate = (date) => date instanceof Date && !isNaN(date.getTime());

    if (this.dueDate && !isValidDate(this.dueDate)) {
      throw new Error("InvalidDateFormat");
    }

    if (this.startedAt && !isValidDate(this.startedAt)) {
      throw new Error("InvalidDateFormat");
    }

    if (this.completedAt && !isValidDate(this.completedAt)) {
      throw new Error("InvalidDateFormat");
    }

    if (
      this.startedAt &&
      this.completedAt &&
      this.completedAt < this.startedAt
    ) {
      throw new Error("EndDateBeforeStartDate");
    }

    if (this.startedAt && this.dueDate && this.startedAt > this.dueDate) {
      throw new Error("StartDateAfterDueDate");
    }

    return new Project({
      projectID: this.projectID,
      name: this.name,
      description: this.description,
      dueDate: this.dueDate,
      startedAt: this.startedAt,
      completedAt: this.completedAt,
    });
  }
}

export default ProjectInputDTO;
