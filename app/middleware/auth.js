module.exports = (options, app) => {
  return async (ctx, next) => {
    const { token } = ctx.header;
    console.log(token);
    if (!token) {
      ctx.throw(400, '你没有权限访问该接口!');
    }
    let user = {};
    // 解密换取用户
    console.log(user);
    try {
      user = app.jwt.verify(token, app.config.jwt.secret);
    } catch (err) {
      let fail = err.name === 'TokenExpiredError' ? 'token 已过期! 请重新获取令牌' : 'Token 令牌不合法!';
      // return ctx.apiFail(fail);
      ctx.throw(400, fail);
    }
    // 判断用户是否登陆
    // 'user_' + user.id
    await next();
  }
}