import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty({ description: 'The comment content', minLength: 3, maxLength: 1000 })
  @IsString()
  @IsNotEmpty()
  @Length(3, 1000)
  comment: string;

  @ApiProperty({ description: 'ID of the user assigned to this comment' })
  @IsNumber()
  @IsNotEmpty()
  assignedTo: number;
}
