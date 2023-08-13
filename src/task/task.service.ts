import { Injectable } from '@nestjs/common';
import { TaskDTO } from './dto/task.dto';
import { ITask } from './task.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TaskService {
  task: ITask[] = [];
  create(taskDto: TaskDTO): ITask {
    const task: ITask = {
      id: uuidv4(),
      ...taskDto,
    };
    this.task.push(task);
    return task;
  }

  findAll(): ITask[] {
    return this.task;
  }

  findOne(id: string): ITask {
    return this.task.find((task) => task.id === id);
  }

  update(id: string, taskDto: TaskDTO): ITask {
    const newTask = { id, ...taskDto };
    this.task = this.task.map((task) => (task.id === id ? newTask : task));
    return newTask;
  }

  delete(id: string): string {
    this.task = this.task.filter((task) => task.id !== id);
    return 'Task deleted successfully';
  }
}
