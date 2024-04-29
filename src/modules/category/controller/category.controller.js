const connection = require('@/app/databases')
const CategoryService = require('../../category/service/category.service');

class GoodsService {
  async create(ctx) {
    try {
      await CategoryService.create(ctx.request.body)
      ctx.body = {
        code: 0,
        message: '创建类别成功~'
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async list(ctx) {
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

module.exports = new GoodsService()