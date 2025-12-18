/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {JwtModule} from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user.entity';

@Module({
    imports:[
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
        inject:[ConfigService],
        useFactory:(config:ConfigService)=>{    
            return{
                secret:config.get<string>('SECRET_KEY'),
                global:true,
                signOptions:{expiresIn:'1d'}
            }
        }
    })
    ],

  controllers: [UserController],
  providers: [UserService],
  exports:[UserService,TypeOrmModule]

})
export class UserModule {
    
}
