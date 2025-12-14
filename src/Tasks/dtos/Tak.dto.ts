/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString, Length, IsEnum, IsDate, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskPeriority } from '../enums/periority.enum';
import { TaskStatusEnum } from '../enums/task.status.enum';

export class TaskDto {
  @ApiProperty({ description: 'Task title', minLength: 4, maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @Length(4, 100)
  title: string;

  @ApiProperty({ description: 'Task description', minLength: 10, maxLength: 10000 })
  @IsString()
  @IsNotEmpty()
  @Length(10, 10000)
  description: string; // تم تصحيح الاسم

  @ApiPropertyOptional({ description: 'Task status', enum: TaskStatusEnum })
  @IsOptional()
  @IsEnum(TaskStatusEnum)
  status?: TaskStatusEnum;

  @ApiProperty({ description: 'Task priority', enum: TaskPeriority })
  @IsNotEmpty()
  @IsEnum(TaskPeriority)
  priority: TaskPeriority;

  @ApiPropertyOptional({ description: 'Task due date' })
  @IsOptional()
  @IsDate()
  dueDate?: Date;

  @ApiProperty({ description: 'ID of the user assigned to the task' })
  @IsNotEmpty()
  @IsNumber()
  assignedTo: number;
}
