'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async sendCode () {
    const { ctx, app } = this;
    const { mobile } = ctx.request.body;
    const sendCodePhone = await this.service.cache.get(`sendCode_${mobile}`);
    console.log("sendCodePhone: " + sendCodePhone);
    if (sendCodePhone) ctx.throw("操作太频繁");
    const randomCode = ctx.createRandom();
    
    console.log(randomCode);

    // 调试环境不请求阿里云短信
    if (!this.config.aliSMS.isopen) {
      await this._devCode(mobile, randomCode);
    }
    // const ret = await this.service.sms.sendSMS(mobile, randomCode);

  }

  // 模拟发送短信验证码
  async _devCode (mobile, code) {
    const { ctx, app } = this;
    // console.log(ctx.service);
    this.service.cache.set(`sendCode_${mobile}`, code, app.config.aliSMS.expire);
    this.ctx.apiSuccess(code);
  }
}

module.exports = UserService;
