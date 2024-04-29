const connection = require('@/app/databases')
const goodService = require('../../goods/service/goods.service');
const { SERVER_BASE_ERROR } = require('@/config/error.constant');

class GoodsService {
  async list(ctx) {
    const { offset = 0, size = 10 } = ctx.request.body
    try {
      const data = await goodService.list(offset, size)
      ctx.body = {
        code: 0,
        data
      }
    } catch (error) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }
  // 根据查询当前商品所属分类的数量
  async getCategoryCount(ctx) {
    try {
      const data = await goodService.getCategoryCount()
      ctx.body = {
        code: 0,
        data
      }
    } catch (e) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }
  // 根据查询当前商品所属分类的数量
  async getCategoryFavor(ctx) {
    try {
      const data = await goodService.getCategoryFavor()
      ctx.body = {
        code: 0,
        data
      }
    } catch (e) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }
  // 查询总量
  async getAmount(ctx) {
    try {
      const data = await goodService.getAmount()
      ctx.body = {
        code: 0,
        data
      }
    } catch (e) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }
  // 根据查询当前商品所属分类的销量
  async getCategorySale(ctx) {
    try {
      const data = await goodService.getCategorySale()
      ctx.body = {
        code: 0,
        data
      }
    } catch (e) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }
  // 根据查询当前商品所属地区的销量
  async getAddressSale(ctx) {
    try {
      const data = await goodService.getAddressSale()
      ctx.body = {
        code: 0,
        data
      }
    } catch (e) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }
}

module.exports = new GoodsService()
