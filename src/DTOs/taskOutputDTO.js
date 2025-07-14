class TaskOutputDTO {
  constructor(task) {
    this.taskID = task.taskID;
    this.title = task.title;
    this.description = task.description;
    this.category = task.category;
    this.subcategory = task.subcategory;
    this.dueDate = task.dueDate;
    this.status = task.status;
    this.priority = task.priority;
    this.completedAt = task.completedAt;
    this.assignee = task.assignee;
    this.project = task.project;
    this.tags = task.tags;
  }
}

export default TaskOutputDTO;
