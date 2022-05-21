import { WhereClause } from './../../node_modules/typeorm/browser/query-builder/WhereClause.d';
import { TaskRepository } from './task.repository';
import { Repository } from 'typeorm';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from 'src/dtos/create-tasks.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { TaskStatus } from 'src/enums/task.enum';
import { GetTasksFilterDto } from 'src/dtos/get-tasks-filter.dto';


@Injectable()
export class TasksService {

  constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) { }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const newTask = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN
    });
    return await this.taskRepository.save(newTask);
  }

  async getTaskById(id: string): Promise<Task> {
    const taskFound = await this.taskRepository.findOneBy({ id });
    if (!taskFound) {
      throw new NotFoundException(`Task from ID ${id} not found`)
    }
    return taskFound;
  }

  async updateTaskStatusById(id: string, taskStatus: TaskStatus): Promise<Task> {
    const updatedTask = await this.getTaskById(id);
    updatedTask.status = taskStatus
    return this.taskRepository.save(updatedTask);
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find()
  }

  getTasks(getTasksFilterDto: GetTasksFilterDto): Promise<Task[]> {
    const { search, status } = getTasksFilterDto;
    return this.taskRepository.createQueryBuilder('task')
      .where(`task.title like :title`, { title: `%${search}%` })
      .andWhere(`task.status like :status`, { status: `%${status}%` })
      .orWhere(`task.description like :description`, { description: `%${search}%` })
      .getMany();
  }

  delete(id: string): void {
    this.taskRepository.delete({ id: id })
  }




}
