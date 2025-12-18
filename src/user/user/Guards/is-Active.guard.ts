import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserType } from "src/ulites/userType";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { isActive } from "../utils/is-Active";

export class IsUserActive implements CanActivate
{
    constructor(
        @InjectRepository(User)
        private repo:Repository<User>
    )
    {

    }
async canActivate(context: ExecutionContext) {
  const request = context.switchToHttp().getRequest();
  const userPayload: UserType = request.user;

  if (!userPayload) {
    throw new UnauthorizedException();
  }

  // 1️⃣ هات اليوزر من DB
  const user = await this.repo.findOne({
    where: { id: userPayload.id },
  });

  if (!user) {
    throw new UnauthorizedException();
  }

  // 2️⃣ احسب الحالة من lastSeen القديم
  const isActiveUser = isActive(user.lastSeen);

  // 3️⃣ حدّث lastSeen (دايمًا)
  await this.repo.update(user.id, {
    lastSeen: new Date(),
  });

  // 4️⃣ خزّن الحالة في الريكوست
  request['isActive']= isActiveUser;

  // 5️⃣ عدّي الريكوست
  return true;
}
}