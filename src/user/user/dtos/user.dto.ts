import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../enums/userRole';

export class UserDto {
  @ApiPropertyOptional({ description: 'User full name', minLength: 3, maxLength: 100 })
  @IsString()
  @IsOptional()
  @Length(3, 100)
  name?: string;

  @ApiProperty({ description: 'User email address', maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @ApiPropertyOptional({ description: 'User role', enum: UserRole, default: UserRole.NORMAL_USER })
  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole = UserRole.NORMAL_USER;

  @ApiProperty({ description: 'User password', minLength: 5, maxLength: 100 })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Length(5, 100)
  password: string;
}
