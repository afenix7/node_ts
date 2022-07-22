import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

class UserModel {
  @InjectEntityModel(UserEntity)
  userRepo: Repository<UserEntity>;

  async getUserByUsernameAndPassword(username, password): Promise<UserEntity> {
    this.userRepo.findBy()
  }
}
