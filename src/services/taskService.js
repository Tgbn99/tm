import logger from "../logger.js";
import Task from "../models/taskModel.js";

class TaskService {
  async create(task) {
    logger.info("TaskService - create");
    await task.save();
    await task.populate([
      { path: "category" },
      { path: "subcategory" },
      { path: "project" },
      { path: "user" },
      { path: "tags" },
    ]);
    return task;
  }

  async list(taskID) {
    if (!taskID) {
      const tasks = await Task.find();
      return tasks;
    } else {
      const task = await Task.findOne({ taskID: taskID });
      if (!task) {
        throw new Error("TaskNotFound");
      } else {
        return task;
      }
    }
  }

  async update(data, taskID) {
    const task = await Task.findOne({ taskID: taskID });
    if (!task) {
      throw new Error("TaskNotFound");
    }
    Object.assign(task, data);
    await task.save();
    return task;
  }

  async delete(taskID) {
    const task = await Task.findOne({ taskID: taskID });
    if (!task) {
      throw new Error("TaskNotFound");
    }
    await task.deleteOne()
  }
}

export default new TaskService()
