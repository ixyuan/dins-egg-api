'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  require('./route/api')(app);

  router.get('/', controller.home.index);
  
  router.get('/list',controller.home.list);

/*
  // 资源路由
  // router.resources('post', '/api/post', controller.home);


  // 分组
  // require('./router/abc')(app);*/
};
