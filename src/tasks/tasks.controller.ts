import { UpdateTaskStatusDto } from './../dtos/update-task-status.dto';
import { TasksService } from './tasks.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { CreateTaskDto } from 'src/dtos/create-tasks.dto';
import { TaskStatus } from 'src/enums/task.enum';
import { GetTasksFilterDto } from 'src/dtos/get-tasks-filter.dto';
import { Task } from 'src/entities/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) { }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService
      .createTask(createTaskDto);
  }

  @Get("/:id")
  getTasksById(@Param('id') id: string): Promise<Task> {
    return this.taskService
      .getTaskById(id);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): void {
    this.taskService
      .delete(id);
  }

  @Patch(':id/status')
  updateStatusTask(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.taskService
      .updateTaskStatusById(id, status);
  }



  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTasks(filterDto);
    }
    return this.taskService.getAllTasks();
  }








}



