import { TypeOrmModule } from '@nestjs/typeorm';
/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { CommentsService } from "./comment.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Comments } from './comment.entity';
import { CommentController } from './comment.controller';
import { TaskModule } from 'src/Tasks/Task.module';

@Module({
    imports:[  TaskModule,
        TypeOrmModule.forFeature([Comments])
        ,
          JwtModule.registerAsync({
                        inject:[ConfigService],
                        useFactory:(config:ConfigService)=>{
                            
                            return{
                                secret:config.get<string>('SECRET_KEY'),
                                global:true,
                                signOptions:{expiresIn:'1d'}
                            }
                        }
                    }),    ],
    controllers:[CommentController],
    providers:[CommentsService]
})
export class CommentsModule 
{

}