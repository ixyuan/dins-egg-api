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

  // router.get('/user',controller.user.index);
        
//   router.get('/', controller.home.index);
  
//   router.get('/list',controller.home.list);


  // 资源路由
  // router.resources('post', '/api/post', controller.home);

};
