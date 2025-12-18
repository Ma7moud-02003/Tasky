/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/user/user/Guards/auth.guard";
import { CommentsService } from "./comment.service";
import { CommentDto } from "./dtos/comment.dto";
import { current_user } from "src/Tasks/Decorators/getUser.decorator";
import type { UserType } from "src/ulites/userType";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { IsUserActive } from "src/user/user/Guards/is-Active.guard";



@ApiTags('comments')
@Controller('/api/comments')
export class CommentController {
  constructor(private readonly _commentService: CommentsService) {}

  @Post('addOne')
  @UseGuards(AuthGuard,IsUserActive)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a new comment to a task (Authenticated users only)' })
  addComment(@Body() body: CommentDto, @current_user() user: UserType, @Req() req) {
    console.log(body);
    console.log(user);
    return {...this._commentService.addComment(body, user),
      isActive:req['isActive']
    }
   
  }
}