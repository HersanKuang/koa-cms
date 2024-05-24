import storyService from '../service/story.service'
import { SERVER_BASE_ERROR } from '@/config/error.constant'

class StoryController {
  async create(ctx: KoaCTX) {
    try {
      await storyService.create(ctx.request.body)
      ctx.body = {
        code: 0,
        message: '创建故事成功~'
      }
    } catch (error) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }
  async list(ctx: KoaCTX) {
    const { offset = 0, size = 10 } = ctx.request.body
    try {
      const data = await storyService.list(offset, size)
      ctx.body = {
        code: 0,
        data
      }
    } catch (error) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }
}

export default new StoryController()
export const { create, list } = new StoryController()
