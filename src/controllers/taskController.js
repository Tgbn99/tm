import TaskService from "../services/taskService.js";
import TaskInputDTO from "../DTOs/taskInputDTO.js";
import TaskOutputDTO from "../DTOs/taskOutputDTO.js";
import logger from "../logger.js";

class LiftController {
  async createTask(req, res) {
    try {
      const inputDTO = new TaskInputDTO(req.body);
      const taskModel = await inputDTO.toTask();
      const savedTask = TaskService.create(taskModel);
      const outputDTO = new TaskOutputDTO(savedTask);

      res.status(201).json({
        message: "Task created",
        data: outputDTO,
      });
    } catch (err) {
      logger.error("TaskController - Error creating task");
      next(err);
    }
  }
}

export default new LiftController();
