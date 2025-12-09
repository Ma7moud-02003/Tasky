import { UserType } from './../ulites/userType';
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { TaskDto } from "./dtos/Tak.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./Task.entity";
import { Repository } from "typeorm";
import { UpdateTaskDto } from "./dtos/updateTask.dto";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user/user.service";
import { TaskStatusEnum } from "./enums/task.status.enum";
import { UserRole } from "src/user/user/enums/userRole";

@Injectable()
export class TaskService 
{
constructor(
    @InjectRepository(Task)
    private _Repo:Repository<Task>,
    private _userService:UserService
)
{

}

/**
 * 
 * @param dto  Task Informations 
 * @param adminId  Admin id only allowed
 * @returns  The Task wich been added 
 */
async creatTask(dto:TaskDto,adminId:number)
{
let addedTask= this._Repo.create({
    title:dto.title,
    discreption:dto.discreption,
    status:dto.status,
    priority:dto.priority,
    dueDate:dto.dueDate,
    assignedTo:{id:dto.assignedTo},
    createdby:{id:adminId}
})
addedTask=await this._Repo.save(addedTask);
return {
    message:'Task Has Been Added Successfully',
    addedTask
}
}

/**
 * 
 * @param id User To Get The Tasks
 * @returns Tasks wich tracked with this User
 */
async GetUserTasks(id:number):Promise<Task[]>
{
try{ 
const tasks=await this._Repo.find({where:{assignedTo:{id:id}},order:{createdAt:"ASC"},
select:['createdAt','title','status','id','priority']});
return tasks;
}
catch(err)
{
    console.log(err);
   throw new BadRequestException(err) 
}

}

/**
 * 
 * @returns All Tasks For the Admin
 */
async GetAllTasks_ToAdmin():Promise<Task[]>
{
return await this._Repo.find({select:['title','status','id','priority','createdAt'],relations:['assignedTo']});
}


async getTaskDetails(taskId:number,user:UserType)
{
    return await this.checkIfUserAllowedToAccessTheTaskOrAdmin(taskId,user,'details')
}

/**
 * 
 * @param userId id for user to get all tasks tracks him for the admin
 * @returns all taskc tracked by the user
 */
async getUserTasks_ToAdmin(userId:number):Promise<Task[]>
{
return await  this._Repo.find({where:{assignedTo:{id:userId}}});
}

async deleteTask_Admin(taskId:number)
{
    await this._Repo.delete({id:taskId});
    return {
        message:'Task has been deleted successfully',
    }

}

/**
 * 
 * @param taskId  For updating
 * @param dto   new Data
 * @returns  updated Task
 */
async updateTask_Admin(taskId:number,dto:UpdateTaskDto)
{
let task=await this._Repo.findOne({where:{id:taskId},relations:['assignedTo','createdby']});
if(!task)
throw new BadRequestException('task is not found');
if(dto.assignedTo!=null)
{
    console.log(dto.assignedTo);
    
const user=await this._userService.getUsreById_ToAdmin(dto.assignedTo);
console.log(user);
if(!user)
throw new BadRequestException('user is not found');
task.assignedTo=user as unknown as User;    
}
Object.assign(task,dto);
await this._Repo.save(task);
return {
    message:'Task Updated Successfully',
    task
}


}

async updateTakStatus(taskId:number,user:UserType,newStatus:TaskStatusEnum)
{
    console.log(taskId,user,newStatus);
    
const task=await this._Repo.findOne({where:{id:taskId},  relations: ['assignedTo']});
console.log(task);

if(!task)
throw new BadRequestException('Task is not found');
if(user.id==task.assignedTo.id||user.role===UserRole.ADMIN)
{
    await this._Repo.update({id:taskId},{status:newStatus});
    return {
        message:'Updated successfully'
    }
}
else
throw new UnauthorizedException('Access denied You are not allowed to update');
}

public async checkIfUserAllowedToAccessTheTaskOrAdmin(taskId:number,user:UserType,neededTo:string)
{
const task=await this._Repo.findOne({where:{id:taskId}});
if(!task)
throw new BadRequestException('task is not found ');
if(user.id===taskId||user.role===UserRole.ADMIN)
{
if(neededTo=='check')
return true;
else
return await this._Repo.findOne({where:{id:taskId},relations:['assignedTo','createdby','assignedComments']});

}
}



}