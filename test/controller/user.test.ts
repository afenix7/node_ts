import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('test/controller/user.test.ts', () => {
  it('should POST /user/login', async () => {
    // create app
    const app = await createApp<Framework>();
    await createHttpRequest(app).post('/user/mockSave');
    // make request
    const result = await createHttpRequest(app)
      .post('/user/login')
      .send({ username: 'mockedName', password: '12345678901' });

    // use expect by jest
    expect(result.status).toBe(200);
    expect(result.body.code).toBe(200);
    expect(result.body.result).toBe('success');
    expect(result.body.message).toBe('登录成功');
    expect(result.body.data.token).toBeTruthy();

    // close app
    await close(app);
  });
});
