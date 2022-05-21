import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus } from 'src/enums/task.enum';
export class GetTasksFilterDto {
  @IsEnum(TaskStatus)
  status?: TaskStatus;
  @IsNotEmpty({ message: "search can't be null" })
  @IsString({ message: "search must be string" })
  search?: string;
}