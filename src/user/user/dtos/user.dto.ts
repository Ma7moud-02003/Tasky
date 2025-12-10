/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import {IsEmail, IsNotEmpty, IsOptional, IsString, Length, MaxLength} from 'class-validator'
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
   role:string
   @IsEmail()
   @IsString()
   @IsNotEmpty()
   @Length(5,100)
   password:string;
    
}