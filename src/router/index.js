const fs = require('fs')
const baseServerError = require('../shared/middleware/base_error.middleware');

function registerRouters(app) {
  // 1.读取当前文件夹下的所有文件
  const files = fs.readdirSync(__dirname)
  app.use(baseServerError)

  // 2.遍历所有文件，添加路由
  for (const file of files) {
    if (!file.endsWith('.router.js')) continue
    const router = require(`./${file}`)
    app.use(router.routes())
    app.use(router.allowedMethods())
  }
}

module.exports = registerRouters
