import userService from '@/modules/user/service/user.service'
import {
  NAME_IS_NOT_EXISTS,
  NAME_OR_PASSWORD_IS_REQUIRED,
  PASSWORD_IS_INCORRENT,
  SERVER_BASE_ERROR
} from '@/config/error.constant'
import md5Password from '@/utils/md5_password'

const verifyLogin = async (ctx: KoaCTX, next: KoaNext) => {
  try {
    const { name, password } = ctx.request.body
    // 1.判断用户名和密码是否为空
    if (!name || !password) {
      return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
    }

    // 2.查询该用户是否在数据库中存在
    const [[user]]: any = await userService.findUserName(name)

    if (!user) {
      return ctx.app.emit('error', NAME_IS_NOT_EXISTS, ctx)
    }

    // 3.查询数据库中密码和用户传递的密码是否一致
    if (user.password !== md5Password(password)) {
      return ctx.app.emit('error', PASSWORD_IS_INCORRENT, ctx)
    }

    ctx.user = user
    await next()
  } catch (error) {
    ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
  }
}

export { verifyLogin }
