/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CommentDto
{
   @IsString()
   @IsNotEmpty()
   @Length(3,1000)
   comment:string;
   @IsNumber()
   @IsNotEmpty()
   assignedTo:number;


}