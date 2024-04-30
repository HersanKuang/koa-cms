import goodService from '../../goods/service/goods.service'
import { SERVER_BASE_ERROR } from '../../../config/error.constant'
import { CTX } from '../../../typings/global'

class GoodsService {
  async list(ctx: CTX) {
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
  async getCategoryCount(ctx: CTX) {
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
  async getCategoryFavor(ctx: CTX) {
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
  async getAmount(ctx: CTX) {
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
  async getCategorySale(ctx: CTX) {
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
  async getAddressSale(ctx: CTX) {
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

export default new GoodsService()
export const {
  list,
  getAddressSale,
  getCategorySale,
  getCategoryFavor,
  getCategoryCount,
  getAmount
} = new GoodsService()
