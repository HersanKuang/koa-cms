import mysql, { PoolConnection, MysqlError } from 'mysql2'
import {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD
} from '@/config/server.config'

const connectionPool = mysql.createPool({
  host: DB_HOST || 'localhost',
  port: Number(DB_PORT ?? 3306),
  database: DB_NAME || 'cms',
  user: DB_USER || 'root',
  password: DB_PASSWORD || '',
  connectionLimit: 5
})

// 检测连接数据库是否成功
connectionPool.getConnection((err: MysqlError | null, conn: PoolConnection) => {
  // 判断是否有错误信息
  if (err) {
    console.error('数据库连接失败', err)
    return
  }

  // 获取connection，尝试和数据库建立连接
  conn.connect((err) => {
    if (err) {
      console.error('和数据库交互失败', err)
    } else {
      console.log('数据库连接成功，可以操作')
    }
  })
})

export default connectionPool.promise()
