import { Rule } from '@midwayjs/validate';

export class UserLoginDTO {
  @Rule({ required: true })
  username: string;

  @Rule({ required: true })
  password: string;
}
