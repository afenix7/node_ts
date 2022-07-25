import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('test/controller/user.test.ts', () => {
  let app;
  beforeAll(async () => {
    app = await createApp<Framework>();
    await createHttpRequest(app).post('/user/mockSave');
  });
  it('should POST /user/login', async () => {
    const result = await createHttpRequest(app)
      .post('/user/login')
      .send({ username: 'mockedName', password: '12345678901' });
    console.log(result.body, 'success body');
    expect(result.body.code).toBe(200);
    expect(result.body.result).toBe('success');
    expect(result.body.message).toBe('登录成功');
    expect(result.body.data.token).toBeTruthy();
  });
  it('wrong password', async () => {
    const result = await createHttpRequest(app)
      .post('/user/login')
      .send({ username: 'mockedName', password: 'wrong pwd' });
    expect(result.body.data).toBeFalsy();
    expect(result.body.code).toBe(400);
    expect(result.body.result).toBe('error');
    expect(result.body.message).toBe('账号或密码不正确');
    // expect(result.body).toBe({
    //   code: 400,
    //   message: '账号或密码不正确',
    //   result: 'error',
    //   data: null,
    // });
  });
  it('no account', async () => {
    const result = await createHttpRequest(app)
      .post('/user/login')
      .send({ username: 'mockedName2', password: '12345678901' });
    expect(result.body.data).toBeFalsy();
    expect(result.body.code).toBe(400);
    expect(result.body.result).toBe('error');
    expect(result.body.message).toBe('账号或密码不正确');
  });
  afterAll(async () => {
    await close(app);
  });
});
