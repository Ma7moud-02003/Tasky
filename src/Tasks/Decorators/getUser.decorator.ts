/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";


export const current_user=createParamDecorator(
    (data,context:ExecutionContext)=>{
        const request:Request=context.switchToHttp().getRequest();
        return request['user'];
    }
)