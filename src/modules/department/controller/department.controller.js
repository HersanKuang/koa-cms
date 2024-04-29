const departmentService = require('../service/department.service')
const { SERVER_BASE_ERROR } = require('@/config/error.constant');

class DepartmentController {
  async create(ctx) {
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

  async remove(ctx) {
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

  async update(ctx) {
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

  async list(ctx) {
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

module.exports = new DepartmentController()
