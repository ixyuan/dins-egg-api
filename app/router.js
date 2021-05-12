'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  require('./route/api')(app);

  router.get('/', controller.home.index);
  
};
