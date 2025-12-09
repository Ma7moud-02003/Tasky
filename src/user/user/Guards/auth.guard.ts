/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { UserType } from 'src/ulites/userType';

/* eslint-disable prettier/prettier */
import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate
{
    constructor(private _jwt:JwtService,private config:ConfigService)
    {}
    async canActivate(context: ExecutionContext){
        const request:Request=context.switchToHttp().getRequest();
        const [type,token]=request.headers.authorization?.split(' ')??[];
        if(!type||!token)
        throw new BadRequestException('Access Denied No ,token provided');
      try
      {
  const user:UserType=await this._jwt.verifyAsync(token,{
            secret:this.config.get<string>('SECRET_KEY')
        })
        request['user']=user;
        return true;
      }
      catch(err)
      {
 console.log(err);  
throw new UnauthorizedException('Access denied ')
      }
    }

}