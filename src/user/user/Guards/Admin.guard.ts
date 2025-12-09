/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import { UserType } from 'src/ulites/userType';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../enums/userRole';
import { UserService } from '../user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private _jwt: JwtService,
    private config: ConfigService,
    private _userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (!type || !token)
      throw new UnauthorizedException('Access Denied No ,token provided');
    try {
      const user: UserType = await this._jwt.verifyAsync(token, {
        secret: process.env.SECRET_KEY,
      });
      if (user.role === UserRole.ADMIN) {
        const admin = await this._userService.getUsreById_ToAdmin(user.id);
        if (!admin) throw new UnauthorizedException('Token is not working');

        request['user'] = user;
        return true;
      } else
        throw new BadRequestException(
          'Access Denied No ,You are not allowed to access',
        );
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Access denied ');
    }
  }
}
