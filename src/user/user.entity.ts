/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "./user/enums/userRole";
import { current_stamp } from "src/ulites/constants";
import { Task } from "src/Tasks/Task.entity";
import { Comments } from "src/Comments/comment.entity";
import {Exclude} from 'class-transformer'
import { TaskStatusEnum } from "src/Tasks/enums/task.status.enum";
@Entity({name:'users'})
export class User
{
@PrimaryGeneratedColumn()
id:number;
@Column({type:'varchar',unique:true,length:'100'})
email:string;
@Column({type:'varchar',length:'100'})
name:string;
@Column({type:'varchar',length:'100'})
@Exclude()
password:string;
@Column({type:'enum',enum:UserRole,default:UserRole.NORMAL_USER})
role:string;

@Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP',nullable:true})
lastSeen:Date;

@OneToMany(()=>Task,(task)=>task.assignedTo)
assigendTasks:Task;
@OneToMany(()=>Task,(task)=>task.createdby)
createdTasks:Task;
@OneToMany(()=>Comments,(comment)=>comment.createdby)
createdComments:Comments
@CreateDateColumn({type:'timestamp',default:()=>current_stamp})
createdAt:Date;
@UpdateDateColumn({type:'timestamp',default:()=>current_stamp,onUpdate:current_stamp})
updatedAt:Date;           
}