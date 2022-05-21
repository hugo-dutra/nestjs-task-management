import { GetTasksFilterDto } from './../dtos/get-tasks-filter.dto';
import { Task } from './tasks.model';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { TaskStatus } from 'src/enums/task.enum';
import { CreateTaskDto } from 'src/dtos/create-tasks.dto';


@Injectable()
export class TasksService {

  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasks(getTasksFilterDto: GetTasksFilterDto): Task[] {
    const { search, status } = getTasksFilterDto;
    return this.tasks
      .filter(task =>
        task.description.includes(search) ||
        task.title.includes(search) ||
        task.status === status);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title: title,
      description: description,
      status: TaskStatus.OPEN
    }
    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  delete(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  updateStatusById(id: string, taskStatus: TaskStatus): Task {
    const task = this.getTaskById(id)
    task.status = taskStatus
    return task;
  }


}
