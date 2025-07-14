import Task from "../models/taskModel.js";
import Category from "../models/categoryModel.js";
import Subcategory from "../models/subcategoryModel.js";
import Project from "../models/projectModel.js";
import Tag from "../models/tagModel.js";
import User from "../models/userModel.js";

class TaskInputDTO {
  constructor(
    taskID,
    title,
    description,
    category,
    subcategory,
    dueDate,
    status,
    priority,
    completedAt,
    assignee,
    project,
    tags
  ) {
    this.taskID = taskID;
    this.title = title;
    this.description = description;
    this.category = category;
    this.subcategory = subcategory;
    this.dueDate = dueDate;
    this.status = status;
    this.priority = priority;
    this.completedAt = completedAt;
    this.assignee = assignee;
    this.project = project;
    this.tags = tags;
  }

  async toTask() {
    const taskCategory = await Category.findOne({ categoryID: this.category });
    if (!taskCategory) {
      throw new Error("CategoryNotFound");
    }
    const taskSubcategory = await Subcategory.findOne({
      subcategoryID: this.subcategory,
    });
    if (!taskSubcategory) {
      throw new Error("SubcategoryNotFound");
    }
    const taskUser = await User.findOne({ email: this.user });
    if (!taskUser) {
      throw new Error("UserNotFound");
    }
    const taskProject = await Project.findOne({ projectID: this.project });
    if (!taskProject) {
      throw new Error("ProjectNotFound");
    }
    const taskTags = await Promise.all(
      this.tags.map(async (tag) => await Tag.findOne({ tagID: tag }))
    );
    if (taskTags.length !== this.tags.length || taskTags.includes(null)) {
      throw new Error("TagNotFound");
    }

    return new Task({
      taskID: this.taskID,
      title: this.title,
      description: this.description,
      category: taskCategory._id,
      subcategory: taskSubcategory._id,
      dueDate: this.dueDate,
      status: this.status,
      priority: this.priority,
      completedAt: this.completedAt,
      assignee: taskUser._id,
      project: taskProject._id,
      tags: taskTags.map((tag) => tag._id),
    });
  }
}

export default TaskInputDTO;
