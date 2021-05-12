'use strict';

const crypto = require('crypto');

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  // 配置
  const User = app.model.define('user', {
    id: {
      type: INTEGER(20).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: STRING(200),
      allowNull: true,
      defaultValue: '',
      comment: '用户名称',
      unique: true
    },
    mobile: {
      type: STRING(11),
      allowNull: false,
      unique: true
    },
    password: {
      type: STRING(200),
      allowNull: true,
      defaultValue: '',
      set (val) {
        const hash = crypto.createHash("sha256", app.config.crypto.secret);
        hash.update(val);
        this.setDataValue('password', hash.digest("hex"));
      }
    },
    created_at: DATE,
    updated_at: DATE,
    status: {
      type: INTEGER(1),
      defaultValue: 1
    }
  },{
    timestamps: true,
    tableName: 'user'
  });

  return User;
};