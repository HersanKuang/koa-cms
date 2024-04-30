import userService from '../service/user.service'
import { v4 as uuidv4 } from 'uuid'
import { SERVER_BASE_ERROR } from '../../../config/error.constant'
import { CTX } from '../../../typings/global'

class UserController {
  async create(ctx: CTX) {
    // 创建uuid
    ctx.request.body.id = uuidv4()

    try {
      // 将user信息传入数据库中
      await userService.create(ctx.request.body)
      ctx.body = {
        code: 0,
        message: '创建用户成功',
        data: ctx.request.body.id
      }
    } catch (error) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }

  async update(ctx: CTX) {
    try {
      const userId = ctx.params.id
      await userService.update(userId, ctx.request.body)
      ctx.body = {
        code: 0,
        message: '修改成功',
        data: userId
      }
    } catch (error) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }

  async remove(ctx: CTX) {
    try {
      const userId = ctx.params.id
      await userService.remove(userId)
      ctx.body = {
        code: 0,
        message: '删除用户成功~'
      }
    } catch (error) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }

  async list(ctx: CTX) {
    const { offset = 0, size = 10, ...rest } = ctx.request.body
    try {
      const data = await userService.list(offset, size, rest)

      ctx.body = {
        code: 0,
        data
      }
    } catch (error) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }

  async detail(ctx: CTX) {
    try {
      const userId = ctx.params.id
      const [[result]]: any = await userService.userDetail(userId)
      const [[roleResult]]: any = await userService.roleDetail(result.roleId)
      const [[departmentResult]]: any = await userService.departmentDetail(
        result.departmentId
      )

      if (typeof result === 'object') {
        delete result.roleId
        delete result.departmentId
        delete result.password
      }

      ctx.body = {
        code: 0,
        data: {
          ...result,
          department: departmentResult,
          role: roleResult
        }
      }
    } catch (error) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }
}

export default new UserController()
export const { create, list, update, remove, detail } = new UserController()
