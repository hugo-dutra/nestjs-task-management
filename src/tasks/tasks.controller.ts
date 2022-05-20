import { TasksService } from './tasks.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './tasks.model';
import { CreateTaskDto } from 'src/dtos/create-tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) { }

  @Get()
  getAllTasks(): Task[] {
    return this.taskService
      .getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService
      .createTask(createTaskDto.title, createTaskDto.description);
  }

}



