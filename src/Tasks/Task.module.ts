/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TaskController } from "./task.controller";
import { TaskService } from "./Task.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./Task.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config/dist/config.service";
import { UserModule } from "src/user/user/user.module";
import { User } from "src/user/user.entity";
@Module(
    {
        imports:[
            UserModule
            ,
            TypeOrmModule.forFeature([Task,User]),
              JwtModule.registerAsync({
                    inject:[ConfigService],
                    useFactory:(config:ConfigService)=>{
                        
                        return{
                            secret:config.get<string>('SECRET_KEY'),
                            global:true,
                            signOptions:{expiresIn:'1d'}
                        }
                    }
                }),
        ],
        controllers:[TaskController],
        providers:[TaskService],
        exports:[TaskService]

    }
)
export class TaskModule
{

}