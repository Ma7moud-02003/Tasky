/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comments } from "./comment.entity";
import { Repository } from "typeorm";
import { UserType } from "src/ulites/userType";
import { CommentDto } from "./dtos/comment.dto";
import { TaskService } from "src/Tasks/Task.service";

/* eslint-disable prettier/prettier */
@Injectable()
export class CommentsService
{
constructor(
    @InjectRepository(Comments)
    private readonly _repo:Repository<Comments>,private _taskService:TaskService)
{}

async addComment(dto:CommentDto,user:UserType)
{
let check=await this._taskService.checkIfUserAllowedToAccessTheTaskOrAdmin(dto.assignedTo,user,'check');
console.log(check);

if(check)
{
let creat= this._repo.create({
    comment:dto.comment,
    assignedTo:{id:dto.assignedTo},
    createdby:{id:user.id}
});
creat=await this._repo.save(creat);

return {
    message:'Comment Added',
    comment:creat
}
}

}    


    
}