import { IsOptional, IsString, Length, IsEnum, IsDate, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskPeriority } from '../enums/periority.enum';
import { TaskStatusEnum } from '../enums/task.status.enum';

export class UpdateTaskDto {
  @ApiPropertyOptional({ description: 'Task title', minLength: 4, maxLength: 100 })
  @IsString()
  @IsOptional()
  @Length(4, 100)
  title?: string;

  @ApiPropertyOptional({ description: 'Task description', minLength: 10, maxLength: 10000 })
  @IsString()
  @IsOptional()
  @Length(10, 10000)
  description?: string; // تم تصحيح الاسم

  @ApiPropertyOptional({ description: 'Task status', enum: TaskStatusEnum })
  @IsOptional()
  @IsEnum(TaskStatusEnum)
  status?: TaskStatusEnum;

  @ApiPropertyOptional({ description: 'Task priority', enum: TaskPeriority })
  @IsOptional()
  @IsEnum(TaskPeriority)
  priority?: TaskPeriority;

  @ApiPropertyOptional({ description: 'Task due date' })
  @IsOptional()
  @IsDate()
  dueDate?: Date;

  @ApiPropertyOptional({ description: 'ID of the user assigned to the task' })
  @IsOptional()
  @IsNumber()
  assignedTo?: number;
}
