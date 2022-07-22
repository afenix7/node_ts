import { Body, Controller, Inject, Post } from '@midwayjs/decorator';
import { UserModel } from '../model/user.model';
import { UserLoginDTO } from '../dto/user.dto';
import { JwtService } from '@midwayjs/jwt';

@Controller('/user')
export class UserController {
  @Inject()
  jwtService: JwtService;

  @Post('/mockSave')
  async mockSave() {
    const userModel = new UserModel();
    await userModel.saveUser({
      id: 0,
      username: 'mockedName',
      password: '12345678901',
    });
  }

  @Post('/login')
  async login(@Body() user: UserLoginDTO): Promise<{
    code: number;
    message: string;
    result: string;
    data: { token: string } | null;
  }> {
    const userModel = new UserModel();
    try {
      const userInfo = await userModel.getUserByUsernameAndPassword(
        user.username,
        user.password
      );
      console.log(userInfo);
      const token = await this.jwtService.sign(
        { username: userInfo.username, password: userInfo.password },
        'somekey'
      );
      console.log(token);
      return {
        code: 200,
        result: 'success',
        message: '登录成功',
        data: {
          token: token,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        code: 400,
        result: 'error',
        message: '账号或密码不正确',
        data: null,
      };
    }
  }
}
