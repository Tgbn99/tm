class TaskOutputDTO {
  constructor(task) {
    this.taskID = task.taskID;
    this.name = task.name;
    this.description = task.description;
    this.category = task.category;
    this.subcategory = task.subcategory;
    this.dueDate = task.dueDate;
    this.status = task.status;
    this.priority = task.priority;
    this.startedAt = task.startedAt;
    this.completedAt = task.completedAt;
    this.assignee = task.assignee;
    this.project = task.project;
    this.tags = task.tags;
    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
  }
}

export default TaskOutputDTO;
