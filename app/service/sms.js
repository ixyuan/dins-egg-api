'use strict';

// 引入阿里SDK
const Core = require('@alicloud/pop-core');

const Service = require('egg').Service;

class SmsService extends Service {

  async sendSMS (mobile, code) {
    const client = await this._client();
    const params = await this._params(mobile, code);
    const options = await this._options();

    try {
      const res = await this._send(client, params, options);
      return JSON.parse(res);      
    } catch (err) {
      this.ctx.apiFail(err);
    }
  }

  async _client () {
    return new Core({
      accessKeyId: this.config.aliSMS.accessKeyId,
      accessKeySecret: this.config.aliSMS.accessKeySecret,
      endpoint: 'https://dysmsapi.aliyuncs.com',
      apiVersion: '2017-05-25'
    });
  }

  async _params (mobile, code) {
    return {
      "RegionId": this.config.aliSMS.regionId,
      "PhoneNumbers": `${mobile}`,
      "SignName": this.config.aliSMS.SignName,
      "TemplateCode": this.config.aliSMS.TemplateCode,
      "TemplateParam": `{\"code\":${code}}`
    }
  }

  async _options () {
    return {
      method: 'POST'
    }
  }

  async _send (client, params, options) {
    return new Promise((resolve, reject) => {
      client.request('SendSms', params, options).then((result) => {
        resolve(JSON.stringify(result))
      }, (ex) => {
        reject(ex)
      })
    })
  }

  /**
   * 发送验证码
   */
  async sendCode () {
    const { ctx, app } = this;
    // 获取用户手机号
    const { mobile } = ctx.request.body;
    // 缓存查询该手机是否已经存在
    const sendCodeMobile = await app.Service.cache.get();
    // 生成4位数验证码
    let randomCode = ctx.createRandom();

    // 调试环境 不请求阿里云服务器
    if (!this.config.aliSMS.isopen) {
      // await 
    }
    // 请求阿里云API发送验证码
    // const ret = await this.service.

    // if (sendCodeMobile) ctx.throw();
    
  }

  /**
   * 模拟发送短信验证码
   */
  async _devCode () {
    
  }
}

module.exports = SmsService;
