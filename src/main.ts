import './config/alias.config'
import app from './app'
import { SERVER_PORT } from './config/server.config'
import './utils/handle.error'

app.listen(SERVER_PORT, () => {
  console.log('koa服务器启动成功')
})
