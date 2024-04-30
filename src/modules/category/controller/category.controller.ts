import CategoryService from '../../category/service/category.service'
import { CTX } from '../../../typings/global'

class CategoryController {
  async create(ctx: CTX) {
    try {
      await CategoryService.create(ctx.request.body)
      ctx.body = {
        code: 0,
        message: '创建类别成功~'
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  async list(ctx: CTX) {
    const { offset = 0, size = 10 } = ctx.request.body
    try {
      const data = await CategoryService.list(offset, size)

      ctx.body = {
        code: 0,
        data
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default new CategoryController()
export const { create, list } = new CategoryController()
