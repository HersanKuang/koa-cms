require('./config/alias.config')
const app = require('./app')
const { SERVER_PORT } = require('./config/server.config')
require('./utils/handle.error')

app.listen(SERVER_PORT, () => {
  console.log('koa服务器启动成功')
})
