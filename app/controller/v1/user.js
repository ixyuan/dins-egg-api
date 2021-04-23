'use strict';

const crypto = require('crypto');

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx, app } = this;

    // 批量查询
    let user = await app.model.User.findAll();

    ctx.body = {
      msg: 'ok',
      data: user
    };
    // this.ctx.body = "user.index#get";
  }

  async new()
  {
    this.ctx.body = "user.new#get";
  }

  /**
   * 新增用户、用户注册
   */
  async create ()
  {
    const { ctx, app } = this;

    // 参数验证
    ctx.validate({
      username: {
        type: 'string',
        required: true,
        range: {
          min: 6,
          max: 25
        },
        desc: '用户名'
      },
      password: {
        type: 'string',
        required: true,
        desc: '密码'
      },
      repassword: {
        type: 'string',
        required: true,
        desc: '确认密码'
      }
    }, {
      equals: [
        ['password', 'repassword']
      ]
    });

    // 获取参数
    let { username, password } = ctx.request.body;

    // 验证用户是否存在
    if (await app.model.User.findOne({
      where: {
        username,
      }
    })) {
      ctx.throw(400, '用户名已存在');
    }

    // 写入数据库
    let user = await app.model.User.create({
      username,
      password
    });

    if (!user) {
      ctx.throw(400, '创建用户失败');
    }

    ctx.apiSuccess(user);
  }

  /**
   * 读取指定用户信息
   */
  async show ()
  {
    const { ctx, app } = this;

    let id = parseInt(ctx.params.id);
    
    // 通过ID查询用户信息
    // let detail = await app.model.User.findByPk(id);

    let detail = await app.model.User.findOne({
      where: {
        id,
        status: 1
      }
    });

    // this.check_password();

    ctx.body = {
      msg: 'ok',
      data: detail
    };
  }

  /**
   * 修改
   */
  async edit () {
    this.ctx.body = "user.edit#post";
  }

  /**
   * 更新
   */
  async update () {
    this.ctx.body = "user.update#put";
  }

  /**
   * 删除
   */
  async destroy ()
  {
    this.ctx.body = "user.destroy#delete";
  }

  /**
   * 用户登陆
   */
  async login () {
    const { ctx, app } = this;

    // 参数验证
    ctx.validate({
      username: {
        type: 'string',
        required: true,
        range: {
          min: 6,
          max: 25
        },
        desc: '用户名'
      },
      password: {
        type: 'string',
        required: true,
        desc: '密码'
      }
    });

    let { username, password } = ctx.request.body;

    let user = await app.model.User.findOne({
      where: {
        username
      }
    });

    if (!user) {
      ctx.throw(400, "该用户不存在");
    }

    // 进行密码校验
    await this.check_password(password, user.password);

    // 格式化用户信息
    user = JSON.parse(JSON.stringify(user));

    // 生成 token
    let token = ctx.createToken(user);

    // 删除密码，记录token
    user.token = token;
    delete user.password;

    // 缓存存储
    if (!await this.service.cache.set('user_' + user.id, token)) {
      ctx.throw(400, '登陆失败');
    }
    
    ctx.apiSuccess(user);
  }

  /**
   * 用户退出
   */
  async logout () {
    console.log("logout");
    this.ctx.body = "ok, 推出";
  }

  // 验证密码
  async check_password (password, hash_password)
  {
    const hash = crypto.createHash("sha256", this.app.config.crypto.secret);
    hash.update(password);
    if (hash.digest("hex") !== hash_password) {
      this.ctx.throw(400, "密码错误");
    }
    return true;
  }
}

module.exports = UserController;
