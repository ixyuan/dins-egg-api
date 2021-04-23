'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  csrf: {
    enable: true,
    package: 'egg-cors',
  },

  // 参数验证
  valparams: {
    enable: true,
    package: 'egg-valparams'
  },

  // jwt   jsonwebtoken
  jwt: {
    enable: true,
    package: "egg-jwt"
  },

  // redis
  redis: {
    enable: true,
    package: "egg-redis"
  }

};
