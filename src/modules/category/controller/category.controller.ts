import CategoryService from '@/modules/category/service/category.service'
import { SERVER_BASE_ERROR } from '@/config/error.constant'

class CategoryController {
  async create(ctx: KoaCTX) {
    try {
      await CategoryService.create(ctx.request.body)
      ctx.body = {
        code: 0,
        message: '创建类别成功~'
      }
    } catch (error) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }
  async list(ctx: KoaCTX) {
    const { offset = 0, size = 10 } = ctx.request.body
    try {
      const data = await CategoryService.list(offset, size)

      ctx.body = {
        code: 0,
        data
      }
    } catch (error) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }
}

export default new CategoryController()
export const { create, list } = new CategoryController()
