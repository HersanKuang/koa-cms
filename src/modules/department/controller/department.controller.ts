import departmentService from '../service/department.service'
import { SERVER_BASE_ERROR } from '../../../config/error.constant'
import { CTX } from '../../../typings/global'

class DepartmentController {
  async create(ctx: CTX) {
    try {
      await departmentService.create(ctx.request.body)
      ctx.body = {
        code: 0,
        message: '创建部门成功~'
      }
    } catch (error) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }

  async remove(ctx: CTX) {
    try {
      const departmentId = ctx.params.id
      await departmentService.remove(departmentId)
      ctx.body = {
        code: 0,
        message: '删除部门成功~'
      }
    } catch (error) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }

  async update(ctx: CTX) {
    try {
      const departmentId = ctx.params.id
      await departmentService.update(departmentId, ctx.request.body)
      ctx.body = {
        code: 0,
        message: '更新部门成功~'
      }
    } catch (error) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }

  async list(ctx: CTX) {
    const { offset = 0, size = 10 } = ctx.request.body
    try {
      const data = await departmentService.list(offset, size)

      ctx.body = {
        code: 0,
        data
      }
    } catch (error) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }
}

export default new DepartmentController()
export const { create, update, list, remove } = new DepartmentController()
