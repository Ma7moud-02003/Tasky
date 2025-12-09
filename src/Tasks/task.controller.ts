/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { TaskService } from "./Task.service";
import { TaskDto } from "./dtos/Tak.dto";
import { current_user } from "./Decorators/getUser.decorator";
import type { UserType } from "src/ulites/userType";
import { AdminGuard } from "src/user/user/Guards/Admin.guard";
import { AuthGuard } from "src/user/user/Guards/auth.guard";
import { UpdateTaskDto } from "./dtos/updateTask.dto";
import { TaskStatusEnum } from "./enums/task.status.enum";


@Controller('/api/tasks/')
export class  TaskController
{
constructor(private _taskService:TaskService)
{

}

@Post('addTask')
@UseGuards(AdminGuard)
addTask(@Body() body:TaskDto,@current_user() user:UserType)
{
    console.log('adding task');
return this._taskService.creatTask(body,user.id)
}

@Get('allTasks')
@UseGuards(AdminGuard)
getAll()
{
return this._taskService.GetAllTasks_ToAdmin();
}


@Get('userTasks')
@UseGuards(AuthGuard)
getUserTasks(@current_user() user:UserType)
{
return this._taskService.GetUserTasks(user.id);
}


@Get('userTasks/:id')
@UseGuards(AdminGuard)
getUserTasks_ToAdmin(@Param('id',ParseIntPipe) id:number)
{
return this._taskService.GetUserTasks(id);
}


@Delete('delete/:id')
@UseGuards(AdminGuard)
deleteTask_ToAdmin(@Param('id',ParseIntPipe) id:number)
{
return this._taskService.deleteTask_Admin(id);
}


@Put('update/:id')
@UseGuards(AdminGuard)
updateTask_ByAdmin(@Body() body:UpdateTaskDto,@Param('id',ParseIntPipe) id:number)
{

if(body)
return this._taskService.updateTask_Admin(id,body);
else
return {
    message:'Data is not exist'
};

}

@Get("/:id")
@UseGuards(AuthGuard)
getDetails(@current_user() user:UserType,@Param('id',ParseIntPipe) id:number)
{
    return this._taskService.getTaskDetails(id,user);
}

@Put('update_status/:id')
@UseGuards(AuthGuard)
updateTaskStatus(@Query('newStatus') newStatus:TaskStatusEnum,@Param('id',ParseIntPipe) id:number,@current_user() user:UserType)
{ 
if(newStatus)
return this._taskService.updateTakStatus(id,user,newStatus);
else
return {
    message:'Data is not exist'
};

}

}