class ProjectOutputDTO {
  constructor(project) {
    this.projectID = project.projectID;
    this.name = project.name;
    this.description = project.description;
    this.dueDate = project.dueDate;
    this.startedAt = project.startedAt;
    this.completedAt = project.completedAt;
    this.tasks = project.tasks;
    this.tags = project.tags;
    this.createdAt = project.createdAt;
    this.updatedAt = project.updatedAt;
  }
}

export default ProjectOutputDTO;