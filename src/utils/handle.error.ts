import app from '../app'
import {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UNAUTHORIZATION,
  ENABLE_IS_NOT_EXISTS,
  ROLEID_IS_NOT_EXISTS,
  DEPARTMENTID_IS_NOT_EXISTS,
  USER_IS_NOT_EXISTS,
  SERVER_BASE_ERROR
} from '@/config/error.constant'

app.on('error', (error: string, ctx: Record<string, any>) => {
  let code: number = 0
  let message: string = ''
  let status: number | undefined

  switch (error) {
    case SERVER_BASE_ERROR:
      status = 500
      code = -1000
      message = '服务器内部错误'
      break
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001
      message = '用户名或者密码不能为空'
      break
    case NAME_IS_ALREADY_EXISTS:
      code = -1002
      message = '用户名已经存在'
      break
    case NAME_IS_NOT_EXISTS:
      code = -1003
      message = '用户名不存在'
      break
    case PASSWORD_IS_INCORRENT:
      code = -1004
      message = '密码错误，请重新输入'
      break
    case UNAUTHORIZATION:
      code = -1005
      message = '无效的token或者token已过期'
      break
    case ENABLE_IS_NOT_EXISTS:
      code = -1006
      message = '用户状态不能为空'
      break
    case USER_IS_NOT_EXISTS:
      code = -1007
      message = '用户id不存在'
      break
    case ROLEID_IS_NOT_EXISTS:
      code = -2001
      message = '角色id不能为空'
      break
    case DEPARTMENTID_IS_NOT_EXISTS:
      code = -3001
      message = '部门id不能为空'
      break
  }

  if (status) {
    ctx.status = status
  }
  ctx.body = { code, message }
})
