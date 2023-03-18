import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tasks } from 'src/entities/tasks.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskI } from './interfaces/task.interface';

@Injectable()
export class TasksService {
  // Constructor based dependency injection used to inject instances (often service providers) into classes.
  constructor(
    @InjectRepository(Tasks)
    private taskRepoitory: Repository<Tasks>,
  ) {}
  private logger = new Logger('TaskService');

  async createTask(userId: string, newTask: TaskI): Promise<void> {
    const { title, description } = newTask;

    const task = new Tasks();
    task.title = title;
    task.description = description;
    task.status = false; //uncompleted
    task.userId = userId;

    await this.taskRepoitory.save(task);
    this.logger.verbose(
      `User with id: "${userId}" added a new task: "${title}"!`,
    );
  }

  async getTasks(): Promise<TaskI[]> {
    return this.taskRepoitory.find();
  }

  async getUserTasks(id: string): Promise<TaskI[]> {
    return this.taskRepoitory.find({
      where: {
        userId: id,
      },
    });
  }

  async setTaskCompleted(id: string): Promise<TaskI> {
    const task = await this.taskRepoitory.findOne({
      where: {
        id: id,
      },
    });
    if (!task) {
      this.logger.error(`Task with ID: "${id}" not found!`);
      throw new NotFoundException(`Task with ID: "${id}" not found!`);
    }

    const datetime = new Date();
    task.status = !task.status;
    task.completedAt = datetime;
    await this.taskRepoitory.save(task);
    this.logger.log(`Task with id "${id}" set as completed!`);
    return task;
  }

  async editTask(id: string, newTask: TaskI): Promise<TaskI> {
    const { title, description } = newTask;
    const task = await this.taskRepoitory.findOne({
      where: {
        id: id,
      },
    });
    if (!task) {
      this.logger.error(`Task with ID: "${id}" not found!`);
      throw new NotFoundException(`Task with ID: "${id}" not found!`);
    }

    task.title = title;
    task.description = description;
    await this.taskRepoitory.save(task);
    this.logger.log(`Successfully edited the task with id "${id}"!`);
    return task;
  }

  async deleteTask(id: string): Promise<TaskI> {
    const task = await this.taskRepoitory.findOne({
      where: {
        id: id,
      },
    });
    if (!task) {
      this.logger.error(`Task with ID: "${id}" not found!`);
      throw new NotFoundException(`Task with ID: "${id}" not found!`);
    }
    await this.taskRepoitory.remove(task);
    this.logger.warn(
      `User with id: "${task.userId}" has successfully deleted Task with id: "${id}"!`,
    );
    return task;
  }
}
