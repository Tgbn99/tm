import TaskService from "../services/taskService.js";
import TaskInputDTO from "../DTOs/taskInputDTO.js";
import TaskOutputDTO from "../DTOs/taskOutputDTO.js";
import logger from "../logger.js";
import { MESSAGES } from "../utils/messages.js";

class TaskController {
  async createTask(req, res) {
    logger.info("POST: /api/tasks");
    try {
      const inputDTO = new TaskInputDTO(req.body);
      const taskModel = await inputDTO.toTask();
      const savedTask = TaskService.create(taskModel);
      const outputDTO = new TaskOutputDTO(savedTask);

      res.status(201).json({
        message: MESSAGES.TASK_CREATED,
        data: outputDTO,
      });
    } catch (err) {
      logger.error("TaskController - Error creating task");
      next(err);
    }
  }

  async getAllTasks(req, res) {
    logger.info("GET: /api/tasks");
    try {
      const tasks = await TaskService.list();
      const outputDTOs = tasks.map((task) => new TaskOutputDTO(task));

      res.status(200).json({
        message: MESSAGES.TASKS_RETRIEVED,
        data: outputDTOs,
      });
    } catch (err) {
      logger.error("TaskController - Error retrieving tasks");
      next(err);
    }
  }

  async getTask(req, res) {
    logger.info("GET: /api/tasks/taskID/");
    try {
      const task = await TaskService.list(req.params.taskID);
      const outputDTO = new TaskOutputDTO(task);

      res.status(200).json({
        message: MESSAGES.TASK_RETRIEVED,
        data: outputDTO,
      });
    } catch (err) {
      logger.error("TaskController - Error retrieving task");
      next(err);
    }
  }

  async updateTask(req, res) {
    logger.info("PUT: /api/tasks");
    try {
      const inputDTO = new TaskInputDTO(req.body);
      const taskModel = await inputDTO.toTask();
      const updatedTask = TaskService.update(taskModel, req.params.taskID);
      const outputDTO = new TaskOutputDTO(updatedTask);

      res.status(200).json({
        message: MESSAGES.TASK_UPDATED,
        data: outputDTO,
      });
    } catch (err) {
      logger.error("TaskController - Error updating task");
      next(err);
    }
  }

  async deleteTask(req, res) {
    logger.info("DELETE: /api/tasks");
    try {
      await TaskService.delete(req.params.taskID)

      res.status(200).json({
        message: MESSAGES.TASK_DELETED,
        data: req.params.taskID,
      });
    } catch (err) {
      logger.error("TaskController - Error deleting task");
      next(err);
    }
  }
}

export default new TaskController();
