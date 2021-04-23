module.exports = (option, app) => {
  return async function errorHandler (ctx, next) {
    try {
      await next();
      // 404错误
      if (ctx.status === 404 && !ctx.body) {
        ctx.body = {
          msg: "fail",
          data: '404 error'
        };
      }
    } catch (err) {
      // 记录一条错误日志
      app.emit('error', err, ctx);

      let status = err.status || 500;
      // 生产环境时 500 错误的详细信息内容部返回给客户端
      let error = status === 500 && app.config.env === 'prod'
        ? 'Internal Server Error'
        : err.message;
        
      ctx.body = {
        msg: "fail",
        data: error
      };

      // 参数验证异常
      if (status === 422 && error == "Validation Failed") {
        if (err.errors && Array.isArray(err.errors)) {
          error = err.errors[0].err[0] ? err.errors[0].err[0] : "参数错误";
        }
        ctx.body = {
          msg: "fail",
          data: error
        };
      }
      
      ctx.status = status;
    }
  };
};