import 'module-alias/register'
import './config/alias.config'
import app from './app'
import '@/utils/handle.error'
import { SERVER_PORT } from '@/config/server.config'

app.listen(SERVER_PORT, () => {
  console.log('koa服务器启动成功')
})
