const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('@/config/screct.config')
const { SERVER_BASE_ERROR } = require('@/config/error.constant');

class LoginController {
  sign(ctx) {
    try {
      const { id, name } = ctx.user
      const token = jwt.sign({ id, name }, PRIVATE_KEY, {
        expiresIn: 24 * 60 * 60,  // 设置token的过期时间：1天
        algorithm: 'RS256'
      })
      ctx.body = {
        code: 0,
        data: {
          id,
          name,
          token
        },
        message: '登录成功'
      }
    } catch (error) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }
}

module.exports = new LoginController()
