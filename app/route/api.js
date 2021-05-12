'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.resources('user', '/api/v1/user', controller.v1.user);

  // 用户注册 http://127.0.0.1:7001/api/v1/user/reg
  router.post('/api/v1/user/reg', controller.v1.user.create);
  // 用户登陆
  router.post('/api/v1/user/login', controller.v1.user.login);
  // 用户退出
  router.post('/api/v1/user/logout', controller.v1.user.logout);

  // 手机号注册 /api/v1/user/mobile/reg
  router.post('/api/v1/user/mobile/reg', controller.v1.user.regMobile);
  // 手机号验证码
  router.post('/api/v1/user/mobile/code', controller.v1.user.sendCode);

};
