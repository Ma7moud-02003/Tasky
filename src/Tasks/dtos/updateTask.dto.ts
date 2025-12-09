/* eslint-disable prettier/prettier */
import { IsOptional, IsString, Length } from "class-validator";
import { TaskPeriority } from "../enums/periority.enum";
import { TaskStatusEnum } from "../enums/task.status.enum";

export class UpdateTaskDto
{
@IsString()
@IsOptional()
@Length(4,100)
title:string;
@IsString()
@IsOptional()
@Length(10,10000)
discreption:string;
@IsString()
@IsOptional()
status:TaskStatusEnum; 
@IsString()
@IsOptional()
priority :TaskPeriority;
@IsOptional()
dueDate:Date;
@IsOptional()
assignedTo:number;
}