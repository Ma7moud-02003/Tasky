/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user/user.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { User } from './user/user.entity';
import { Task } from './Tasks/Task.entity';
import { TaskModule } from './Tasks/Task.module';
import { CommentsModule } from './Comments/comment.module';
import { Comments } from './Comments/comment.entity';

@Module({
  imports: [UserModule,TaskModule,CommentsModule,
     ConfigModule.forRoot({
    isGlobal:true,
  envFilePath:`src/.env.${process.env.DB_ENV||'development'}`
  }),
     TypeOrmModule.forRootAsync({
     inject:[ConfigService],
    useFactory:(config:ConfigService)=>{       
    
     return {
    type: 'postgres',
     database:config.get<string>('DATABASE'),
     password:config.get<string>('PASSWORD'),
     port:config.get<number>('PORT'),
     host:config.get<string>('HOST'),
     username:'postgres',
     synchronize: false,
     entities: [User,Task,Comments],
  };
    }
      }),
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {
  
}
