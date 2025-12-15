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
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";


@ApiTags('tasks')
@Controller('/api/tasks')
export class TaskController {
  constructor(private readonly _taskService: TaskService) {}
  @Post('addTask')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a new task (Admin only)' })
  addTask(@Body() body: TaskDto, @current_user() user: UserType) {
    console.log('adding task');
    return this._taskService.creatTask(body, user.id);
  }

  @Get('allTasks')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all tasks (Admin only)' })
  getAll() {
    return this._taskService.GetAllTasks_ToAdmin();
  }

  @Get('userTasks')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get tasks of the current user' })
  getUserTasks(@current_user() user: UserType) {
    return this._taskService.GetUserTasks(user.id);
  }

  @Get('userTasks/:id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get tasks of a specific user (Admin only)' })
  getUserTasks_ToAdmin(@Param('id', ParseIntPipe) id: number) {
    return this._taskService.GetUserTasks(id);
  }

  @Delete('delete/:id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a task by ID (Admin only)' })
  deleteTask_ToAdmin(@Param('id', ParseIntPipe) id: number) {
    return this._taskService.deleteTask_Admin(id);
  }

  @Put('update/:id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a task by ID (Admin only)' })
  updateTask_ByAdmin(@Body() body: UpdateTaskDto, @Param('id', ParseIntPipe) id: number) {
    if (body) return this._taskService.updateTask_Admin(id, body);
    return { message: 'Data does not exist' };
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get details of a task (User only)' })
  getDetails(@current_user() user: UserType, @Param('id', ParseIntPipe) id: number) {
    return this._taskService.getTaskDetails(id, user);
  }

  @Put('update_status/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update status of a task (User only)' })
  @ApiQuery({ name: 'newStatus', enum: TaskStatusEnum, required: true, description: 'New status for the task' })
  updateTaskStatus(
    @Query('newStatus') newStatus: TaskStatusEnum,
    @Param('id', ParseIntPipe) id: number,
    @current_user() user: UserType
  ) {
    if (newStatus) return this._taskService.updateTakStatus(id, user, newStatus);
    return { message: 'Data does not exist' };
  }
}