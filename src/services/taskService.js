import logger from "../logger.js";
import Task from "../models/taskModel.js";

class TaskService {
  async create(task) {
    logger.info("TaskService - create");
    return await task
      .save()
      .populate([
        { path: "category" },
        { path: "subcategory" },
        { path: "project" },
        { path: "user" },
        { path: "tags" },
      ]);
  }

  async list(taskID) {
    logger.info("TaskService - list");
    if (!taskID) {
      logger.info("TaskService - listAll");
      const tasks = await Task.find().populate([
        { path: "category" },
        { path: "subcategory" },
        { path: "project" },
        { path: "user" },
        { path: "tags" },
      ]);
      if (tasks.length === 0) {
        throw new Error("NoTaskFound");
      }
      return tasks;
    } else {
      logger.info("TaskService - listOne");
      const task = await Task.findOne({ taskID: taskID }).populate([
        { path: "category" },
        { path: "subcategory" },
        { path: "project" },
        { path: "user" },
        { path: "tags" },
      ]);
      if (!task) {
        throw new Error("TaskNotFound");
      } else {
        return task;
      }
    }
  }

  async update(data, taskID) {
    logger.info("TaskService - update");
    const task = await Task.findOne({ taskID: taskID });
    if (!task) {
      throw new Error("TaskNotFound");
    }
    Object.assign(task, data);
    return await task
      .save()
      .populate([
        { path: "category" },
        { path: "subcategory" },
        { path: "project" },
        { path: "user" },
        { path: "tags" },
      ]);
  }

  async delete(taskID) {
    logger.info("TaskService - delete");
    const task = await Task.findOne({ taskID: taskID });
    if (!task) {
      throw new Error("TaskNotFound");
    }
    await task.deleteOne();
  }
}

export default new TaskService();
