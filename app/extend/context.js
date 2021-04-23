module.exports = {
  // 成功提示
  apiSuccess (data = '', msg = 'ok', code = 200) {
    this.body = { msg, data };
    this.status = code;
  },

  // 失败输出
  apiFail (data = '', msg = 'fail', code = 400) {
    this.body = { msg, data };
    this.status = code;
  },

  // 生成 token
  createToken(value) {
    return this.app.jwt.sign(value, this.app.config.jwt.secret);
  }
};