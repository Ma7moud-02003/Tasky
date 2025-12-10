import { AdminGuard } from 'src/user/user/Guards/Admin.guard';
import { Delete, Param, ParseIntPipe, UseGuards, UseInterceptors } from '@nestjs/common';
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';
import { LoggerInterceptor } from 'src/ulites/Interceptors/logger.interceptor';

@Controller('/api/users/')
export class UserController {
constructor(private _user:UserService)
{

}
@Post('auth/register/')
register(@Body() body:UserDto)
{
   console.log(body);
   return  this._user.register(body);

}

@Post('auth/login/')
login(@Body() body:UserDto)
{
   console.log(body);
      return  this._user.logIn(body);
}

@Get('allUsers')
@UseGuards(AdminGuard)
getAll()
{
   return this._user.getAllUsers_ToAdmin();
}


@Get('userDetails/:id')
@UseGuards(AdminGuard)
@UseInterceptors(LoggerInterceptor)
getUserDetails(@Param('id',ParseIntPipe) id:number)
{
   return this._user.getUserDetailsToAdmin(id);
}
@Delete('deleteAll')
@UseGuards(AdminGuard)
deleteAll()
{
   return this._user.deleteAllUsers();
}
}