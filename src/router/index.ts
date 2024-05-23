import fs from 'node:fs'
import baseServerError from '../shared/middleware/base_error.middleware'
import printError from '../utils/print_router'

async function registerRouters(app: Record<string, any>) {
  const { ROUTER_SUFFIX, NODE_ENV } = process.env

  // 1.读取当前文件夹下的所有文件
  const files = fs.readdirSync(__dirname)
  // 2.应用全局服务器错误拦截中间件
  app.use(baseServerError)

  // 3.遍历所有文件，添加路由
  for (const file of files) {
    if (!file.endsWith(<string>ROUTER_SUFFIX)) {
      printError(file, NODE_ENV)
      continue
    }
    // 注意：.router.ts 文件的路由只能使用默认导出的方式
    const { default: router } = await import(`./${file}`)
    app.use(router.routes())
    app.use(router.allowedMethods())
  }
}

export default registerRouters
