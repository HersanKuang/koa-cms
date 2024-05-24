import menuService from '../service/menu.service'
import { SERVER_BASE_ERROR } from '@/config/error.constant'

class MenuController {
  async create(ctx: KoaCTX) {
    try {
      const menu = ctx.request.body
      const result = await menuService.create(menu)
      ctx.body = {
        code: 0,
        message: '菜单创建成功',
        data: result
      }
    } catch (err) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }
  async list(ctx: KoaCTX) {
    try {
      const result = await menuService.wholeMenu()
      ctx.body = {
        code: 0,
        message: '获取完整菜单~',
        data: {
          list: result
        }
      }
    } catch (e) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }
}

export default new MenuController()
export const { create, list } = new MenuController()
