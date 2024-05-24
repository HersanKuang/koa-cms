import jwt from 'jsonwebtoken'
import { SERVER_BASE_ERROR } from '@/config/error.constant'
import { PRIVATE_KEY } from '@/config/secret.config'

class LoginController {
  sign(ctx: KoaCTX) {
    try {
      const { id, name } = ctx.user
      const token = jwt.sign({ id, name }, PRIVATE_KEY, {
        expiresIn: 24 * 60 * 60, // 设置token的过期时间：1天
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

export default new LoginController()
export const { sign } = new LoginController()
