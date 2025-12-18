import { BadRequestException, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from 'express';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { isActive } from "../utils/is-Active";
import { UserType } from "src/ulites/userType";
import { UserDto } from "../dtos/user.dto";

export class ActiveUserGuard implements CanActivate
{
    constructor(
@InjectRepository(User)
private repository:Repository<User>
    )
    {
    }
async canActivate(context: ExecutionContext) {
  const request: Request = context.switchToHttp().getRequest();
  const userPayload = request['user'];

  if (!userPayload) {
    throw new UnauthorizedException('No User Provided');
  }

  const user = await this.repository.findOne({
    where: { id: userPayload.id },
  });

  if (!user) {
    throw new UnauthorizedException('User not found');
  }

  // ✅ احسب الحالة من آخر نشاط قديم
  const active = isActive(user.lastSeen);

  // ✅ حط الحالة في الريكوست (من غير ما تمنع)
  request['isActive'] = active;

  // ✅ حدّث lastSeen بعد الحساب
  user.lastSeen = new Date();
await this.repository.save(user);

  return true; // دايمًا يعدي
}


}