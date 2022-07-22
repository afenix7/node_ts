import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

export class UserModel {
  @InjectEntityModel(UserEntity)
  userRepo: Repository<UserEntity>;

  async saveUser(user: UserEntity): Promise<UserEntity> {
    return this.userRepo.save(user);
  }

  async getUserByUsernameAndPassword(username, password): Promise<UserEntity> {
    return this.userRepo.findOne({ where: { username, password } });
  }
}
