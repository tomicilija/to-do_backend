import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskI } from './interfaces/task.interface';
import { TasksService } from './tasks.service';

@Controller('')
export class TasksController {
  // Controller declares a dependency on the UserService token with constructor
  constructor(private taskService: TasksService) {}

  // Create task
  @Post('/task/:userId')
  createTask(
    @Param('userId') userId: string,
    @Body() newTask: TaskI,
  ): Promise<void> {
    return this.taskService.createTask(userId, newTask);
  }

  @Get('/tasks')
  getTasks(): Promise<TaskI[]> {
    return this.taskService.getTasks();
  }

  @Get('/tasks/:id')
  getUserTasks(@Param('id') id: string): Promise<TaskI[]> {
    return this.taskService.getUserTasks(id);
  }

  @Patch('/task/completed/:id')
  async setTaskCompleted(@Param('id') id: string): Promise<TaskI> {
    return this.taskService.setTaskCompleted(id);
  }

  @Patch('/task/:id')
  async editTask(
    @Param('id') id: string,
    @Body() newTask: TaskI,
  ): Promise<TaskI> {
    return this.taskService.editTask(id, newTask);
  }

  @Delete('/task/:id')
  async deleteTask(@Param('id') id: string): Promise<TaskI> {
    return this.taskService.deleteTask(id);
  }
}
