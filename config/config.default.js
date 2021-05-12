/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1618810632783_2346';

  // add your middleware config here
  config.middleware = ['errorHandler', 'auth'];

  config.errorHandler = {
    // enable: true,
    // match: ["/user"],
    // ignore: []
  };

  config.auth = {
    // match: ['']
    ignore: ['/api/v1/user/login', '/api/v1/user/reg', '/api/v1/user/mobile/reg', '/api/v1/user/mobile/code']
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'eggapi',
    username: 'root',
    password: 'mengxuan',
    // 时区
    timezone: '+08:00',
    define: {
      // 取消数据表名复数
      freezeTableName: true,
      // 自动写入时间戳
      timestamps: true,
      // 字段生成软删除时间戳 deleted_at
      // createdAt: 'created_time',
      // updatedAt: 'updated_time',
      // 所有驼峰命名格式化
      underscored: true
    }
  };

  config.security = {
    // 关闭 csrf
    csrf: {
      enable: false,
    },
    // 跨域白名单
    // domainWhiteList: ['http://127.0.0.1:7001'],
  };
  // 允许跨域的方法
  config.cors = {
    origin: '*',
    allowMethods: 'GET, PUT, POST, DELETE, PATCH'
  };

  // 参数验证
  config.valparams = {
    locale: 'zh-cn',
    throwError: true
  };

  // 加密盐值
  config.crypto = {
    secret: '123456789@@#@!_+abc'
  };

  // jwt
  config.jwt = {
    secret: 'qhdgw@45ncashdaksh2!#@3nxjdas*_672'
  };

  // redis
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 3,
    }
  };

  config.aliSMS = {
    isopen: false,
    expire: 600,
    accessKeyId: '',
    accessSecret: '',
    regionId: '',
    product: '',
    version: '',
    SignName: '',
    TemplateCode: ''
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
