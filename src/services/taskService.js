import projectController from "../controllers/projectController.js";
import ProjectInputDTO from "../DTOs/projectInputDTO.js";
import logger from "../logger.js";
import Project from "../models/projectModel.js";
import Task from "../models/taskModel.js";
import ProjectService from "./projectService.js";
class TaskService {
  async create(task) {
    logger.info("TaskService - create");

    const saved = await task.save();
    if (task.project) {
      const taskProject = await Project.findOne({ _id: task.project });
      if (!taskProject.startedAt && task.startedAt) {
        taskProject.startedAt = task.startedAt;
        const inputDTO = new ProjectInputDTO(taskProject);
        const projectModel = await inputDTO.toProject();
        await ProjectService.update(projectModel, taskProject.projectID);
      }
    }
    return await saved.populate([
      { path: "category" },
      { path: "subcategory" },
      { path: "project" },
      /* { path: "user" }, */
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
        /* { path: "user" }, */
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
        /* { path: "user" }, */
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
    const plainData = data.toObject();
    const { _id, ...safeData } = plainData;
    Object.assign(task, safeData);
    const saved = await task.save();
    if (task.project) {
      const taskProject = await Project.findOne({ _id: task.project });
      if (!taskProject.startedAt && task.startedAt) {
        taskProject.startedAt = task.startedAt;
        const inputDTO = new ProjectInputDTO(taskProject);
        const projectModel = await inputDTO.toProject();
        await ProjectService.update(projectModel, taskProject.projectID);
      }
    }
    return await saved.populate([
      { path: "category" },
      { path: "subcategory" },
      { path: "project" },
      /* { path: "user" }, */
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
