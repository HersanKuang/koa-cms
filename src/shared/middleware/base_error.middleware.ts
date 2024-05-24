import { SERVER_BASE_ERROR } from '@/config/error.constant'

function baseServerError(ctx: KoaCTX, next: KoaNext) {
  return next().catch((err) => {
    // 检查错误是否已经被处理或标记为自定义错误
    if (!err.isHandled) {
      throw err
    } else {
      // 记录错误日志
      console.error('服务器报错:', err)
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  })
}

export default baseServerError
