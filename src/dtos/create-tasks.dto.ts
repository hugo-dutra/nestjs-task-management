import { IsNotEmpty } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty({
    message: "Title can't be empty"
  })
  title: string;
  @IsNotEmpty({
    message: "Description can't be empty"
  })
  description: string;
}