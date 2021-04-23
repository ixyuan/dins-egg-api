'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    
    // 列表
    async index() {
        const {ctx, app} = this;

        let user = await app.model.User.findAll();

        ctx.body = {
            'data' : user
        };

    }
}

module.exports = UserController;
