import Task from "../models/taskModel.js";
import Category from "../models/categoryModel.js";
import Subcategory from "../models/subcategoryModel.js";
import Project from "../models/projectModel.js";
import Tag from "../models/tagModel.js";
import User from "../models/userModel.js";
import logger from "../logger.js";

class TaskInputDTO {
  constructor(task) {
    this.taskID = task.taskID;
    this.name = task.name;
    this.description = task.description;
    this.category = task.category;
    this.subcategory = task.subcategory;
    this.dueDate = new Date(task.dueDate);
    this.status = task.status;
    this.priority = task.priority;
    this.startedAt = new Date(task.startedAt);
    this.completedAt = new Date(task.completedAt);
    this.assignee = task.assignee;
    this.project = task.project;
    this.tags = task.tags;
  }

  async toTask() {
    logger.info("toTask");
    logger.info("dueDate: " + this.dueDate);
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
    /* const taskUser = await User.findOne({ email: this.user });
    if (!taskUser) {
      throw new Error("UserNotFound");
    } */
    const taskProject = await Project.findOne({ projectID: this.project });
    if (!taskProject) {
      throw new Error("ProjectNotFound");
    }

    const tagLookups = await Promise.all(
      this.tags.map(async (tagID) => {
        const tagDoc = await Tag.findOne({ tagID: tagID });
        return { tagID, tagDoc };
      })
    );

    const missingTags = tagLookups
      .filter(({ tagDoc }) => !tagDoc)
      .map(({ tagID }) => tagID);

    if (missingTags.length > 0) {
      missingTags.forEach((tagID) => logger.error(`Missing tag: ${tagID}`));
      throw new Error("TagNotFound");
    }

    const isValidDate = (date) => date instanceof Date && !NaN(date.getTime())

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

    return new Task({
      taskID: this.taskID,
      name: this.name,
      description: this.description,
      category: taskCategory._id,
      subcategory: taskSubcategory._id,
      dueDate: this.dueDate,
      status: this.status,
      priority: this.priority,
      completedAt: this.completedAt,
      assignee: this.assignee /* taskUser._id */,
      project: taskProject._id,
      tags: tagLookups.map(({ tagDoc }) => tagDoc._id),
    });
  }
}

export default TaskInputDTO;
