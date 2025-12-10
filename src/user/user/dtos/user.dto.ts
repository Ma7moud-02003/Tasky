/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import {IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, MaxLength} from 'class-validator'
import { UserRole } from '../enums/userRole';
export class UserDto
{
    @IsString()
    @IsOptional()
    @Length(3,100)
   name:string;
   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   email:string;
  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole = UserRole.NORMAL_USER;
   @IsEmail()
   @IsString()
   @IsNotEmpty()
   @Length(5,100)
   password:string;
    
}