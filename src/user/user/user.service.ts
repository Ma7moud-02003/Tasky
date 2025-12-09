/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dtos/user.dto';
import bcrypt  from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { UserType } from 'src/ulites/userType';
@Injectable()
export class UserService {
constructor(
    @InjectRepository(User)
    private readonly  _userRepo:Repository<User>,
    private readonly _jwt:JwtService
)
{    
}

async register(dto:UserDto)
{
const {name,email,password}=dto;
const userIfExist=await this._userRepo.findOne({where:{email}});
console.log(userIfExist);

if(userIfExist)
throw new BadRequestException('Email Is already Exist');
const hashedPass=await bcrypt.hash(password,10);
let user=this._userRepo.create({
    name,email,password:hashedPass
})
user=await this._userRepo.save(user);
const token=await this.generateToken({id:user.id,role:user.role});
console.log(token);

return {
    message:'regisered successfully',
    token
}
}

async logIn(dto:UserDto)
{
    const {email,password}=dto;
    console.log(email);
    
const userIfExist=await this._userRepo.findOne({where:{email}});
console.log(userIfExist);

if(!userIfExist)
throw new BadRequestException('Email is not true');
const isMatch=await bcrypt.compare(password,userIfExist.password);
if(!isMatch)
throw new BadRequestException('Password is not true');
const token=await this.generateToken({id:userIfExist.id,role:userIfExist.role});
return {
    message:'Logged in successfully',
    token
}
}

/**
 * 
 * @param id  User Id To Check if Itexisted Or not 
 * @returns  user
 */
async getUsreById_ToAdmin(id:number)
{
return await this._userRepo.findOne({where:{id}})
}

/**
 * 
 * @returns All Users For admin
 */
async getAllUsers_ToAdmin()
{
try{
    return await this._userRepo.find({select:['id','name','email','role']});
}catch(err){
console.log(err);
throw new  BadRequestException(err)
}
}

getUserDetailsToAdmin(id:number)
{
return this._userRepo.findOne({where:{id},relations:['assigendTasks'],order:{createdAt:'ASC'}});
}

 private async  generateToken(userType: UserType)
{
return await this._jwt.signAsync(userType);
}

}
