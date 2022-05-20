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


}
