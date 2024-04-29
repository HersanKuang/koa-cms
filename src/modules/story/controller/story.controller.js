const connection = require('@/app/databases');
const { create, list } = require('../../story/service/story.service');
const { SERVER_BASE_ERROR } = require('@/config/error.constant');

class StoryController {
  async create(ctx) {
    try {
      await create(ctx.request.body)
      ctx.body = {
        code: 0,
        message: '创建故事成功~'
      }
    } catch (error) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }
  async list(ctx) {
    const { offset = 0, size = 10 } = ctx.request.body
    try {
      const data = await list(offset, size)
      ctx.body = {
        code: 0,
        data
      }
    } catch (error) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }
}

module.exports = new StoryController()