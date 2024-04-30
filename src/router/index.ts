import fs from 'fs'
import baseServerError from '../shared/middleware/base_error.middleware'

async function registerRouters(app: Record<string, any>) {
  // 1.读取当前文件夹下的所有文件
  const files = fs.readdirSync(__dirname)
  app.use(baseServerError)

  // 2.遍历所有文件，添加路由
  for (const file of files) {
    if (!file.endsWith('.router.ts')) {
      continue
    }
    // 注意：.router.ts 文件的路由只能使用默认导出的方式
    const { default: router } = await import(`./${file}`)
    app.use(router.routes())
    app.use(router.allowedMethods())
  }
}

export default registerRouters
