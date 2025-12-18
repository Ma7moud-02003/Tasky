/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TaskStatusEnum } from "./enums/task.status.enum";
import { TaskPeriority } from "./enums/periority.enum";
import { current_stamp } from "src/ulites/constants";
import { User } from "src/user/user.entity";
import { Comments } from "src/Comments/comment.entity";
@Entity('Tasks')
export class Task 
{
@PrimaryGeneratedColumn()
id:number;
@Column()
title:string;
@Column()
description:string;
@Column({type:'enum',enum:TaskStatusEnum,default:TaskStatusEnum.PENDING})
status:TaskStatusEnum; 
@Column()
priority :TaskPeriority;
@Column({type:'varchar',nullable:true})
dueDate:string;
@ManyToOne(()=>User,(user)=>user.assigendTasks)
assignedTo:User;
@ManyToOne(()=>User,(user)=>user.createdTasks)
createdby:User;
@OneToMany(()=>Comments,(comment)=>comment.assignedTo)
assignedComments:Comments
@CreateDateColumn({type:'timestamp',default:()=>current_stamp})
createdAt:Date;
@UpdateDateColumn({type:'timestamp',default:()=>current_stamp,onUpdate:current_stamp})
updatedAt:Date;

// tommorow enshaallah            
}