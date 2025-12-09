/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { TaskPeriority } from "../enums/periority.enum";
import { TaskStatusEnum } from "../enums/task.status.enum";

export class TaskDto
{
@IsString()
@IsNotEmpty()
@Length(4,100)
title:string;
@IsString()
@IsNotEmpty()
@Length(10,10000)
discreption:string;
@IsString()
@IsOptional()
status:TaskStatusEnum; 
@IsString()
@IsNotEmpty()
priority :TaskPeriority;
@IsOptional()
dueDate:Date;
@IsNotEmpty()
assignedTo:number;
}