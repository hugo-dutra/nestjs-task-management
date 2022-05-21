import { UpdateTaskStatusDto } from './../dtos/update-task-status.dto';
import { TasksService } from './tasks.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Task } from './tasks.model';
import { CreateTaskDto } from 'src/dtos/create-tasks.dto';
import { TaskStatus } from 'src/enums/task.enum';
import { GetTasksFilterDto } from 'src/dtos/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) { }

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    console.clear();
    console.log(filterDto)

    if (Object.keys(filterDto).length) {
      return this.taskService.getTasks(filterDto);
    }
    return this.taskService
      .getAllTasks();
  }

  @Get(":id")
  getTasksById(@Param('id') id: string): Task {
    return this.taskService
      .getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService
      .createTask(createTaskDto);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): void {
    this.taskService
      .delete(id);
  }

  @Patch(':id/status')
  updateStatusTask(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto): Task {
    const { status } = updateTaskStatusDto;
    return this.taskService
      .updateTaskStatusById(id, status);
  }



}



