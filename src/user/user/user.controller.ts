import { AdminGuard } from 'src/user/user/Guards/Admin.guard';
import { Delete, Param, ParseIntPipe, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';
import { LoggerInterceptor } from 'src/ulites/Interceptors/logger.interceptor';
import { AuthGuard } from './Guards/auth.guard';
import { current_user } from 'src/Tasks/Decorators/getUser.decorator';
import type { UserType } from 'src/ulites/userType';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { IsUserActive } from './Guards/is-Active.guard';


@ApiTags('users')
@Controller('/api/users')
export class UserController {
  constructor(private readonly _user: UserService) {}

  @Post('auth/register')
  @ApiOperation({ summary: 'Register a new user' })
  register(@Body() body: UserDto) {
    return this._user.register(body);
  }

  @Post('auth/login')
  @ApiOperation({ summary: 'User login' })
  login(@Body() body: UserDto) {
    return this._user.logIn(body);
  }

  @Get('allUsers')
  @UseGuards(AdminGuard,)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  getAll() {
    return this._user.getAllUsers_ToAdmin()
    
  
  }

  @Get('userDetails/:id')
  @UseGuards(AuthGuard, AdminGuard,)
  @UseInterceptors(LoggerInterceptor)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user details by ID (Admin only)' })
  getUserDetails(@Param('id', ParseIntPipe) id: number, ) {
    return  this._user.getUserDetailsToAdmin(id)
  }

  @Get('myData')
  @UseGuards(AuthGuard,IsUserActive)
  @UseInterceptors(LoggerInterceptor)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user data' })
  getMyData(@current_user() user: UserType, @Req() req) {
    return{
      ...this._user.getUserForUser(user.id),
      isActive:req['isActive']
    }
  
  }

  @Delete('deleteAll')
  @UseGuards(AuthGuard, AdminGuard,)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete all users (Admin only)' })
  deleteAll() {
    return this._user.deleteAllUsers()
  }
}