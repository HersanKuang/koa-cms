const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
  ENABLE_IS_NOT_EXISTS,
  DEPARTMENTID_IS_NOT_EXISTS,
  ROLEID_IS_NOT_EXISTS,
  USER_IS_NOT_EXISTS
} = require('@/config/error.constant')
const userInfoService = require('@/shared/service/catchUserInfo.service')
const md5Password = require('@/utils/md5_password')

const verifyUser = async (ctx, next) => {
  // 1.获取用户传过来的信息
  const { name, password, roleId, departmentId, enable } = ctx.request.body
  const userId = ctx.params.id

  // 2.验证客户端传递过来的user是否可以保存到数据库中
  if (!userId && (!name || !password)) {
    console.log(userId)
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }

  if (enable !== 0 && enable !== 1) {
    return ctx.app.emit('error', ENABLE_IS_NOT_EXISTS, ctx)
  }

  if (!roleId) {
    return ctx.app.emit('error', ROLEID_IS_NOT_EXISTS, ctx)
  }

  if (!departmentId) {
    return ctx.app.emit('error', DEPARTMENTID_IS_NOT_EXISTS, ctx)
  }
  await next()
}

const verifyNameExists = async (ctx, next) => {
  const [values] = await userInfoService.findUserName(ctx.request.body.name)
  if (values.length) {
    return ctx.app.emit('error', NAME_IS_ALREADY_EXISTS, ctx)
  }

  await next()
}

const verifyUserExists = async (ctx, next) => {
  try {
    const userId = ctx.params.id
    const [values] = await userInfoService.findUserId(userId)
    if (!values.length) {
      return ctx.app.emit('error', USER_IS_NOT_EXISTS, ctx)
    }

    await next()
  } catch (error) {
    console.log(error)
  }
}

const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body
  // 使用md5加密密码
  ctx.request.body.password = md5Password(password)

  await next()
}

module.exports = {
  verifyUser,
  handlePassword,
  verifyNameExists,
  verifyUserExists
}
