/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/user/user/Guards/auth.guard";
import { CommentsService } from "./comment.service";
import { CommentDto } from "./dtos/comment.dto";
import { current_user } from "src/Tasks/Decorators/getUser.decorator";
import type { UserType } from "src/ulites/userType";


@Controller('/api/comments/')
export class CommentController
{
constructor(private _comentService:CommentsService)
{}
    @Post('addOne')
    @UseGuards(AuthGuard)
    addComment(@Body() body:CommentDto,@current_user() user:UserType)
    {
        console.log(body);
        console.log(user);
       return this._comentService.addComment(body,user);
    }

    
    // @Get(':id')
    // @UseGuards(AuthGuard)
    // getComments(@Param('id',ParseIntPipe) id:number,@current_user() user:UserType)
    // {
    //    return this._comentService.getTaskComments(id,user);
    // }



}