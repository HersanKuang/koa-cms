const dotenv = require('dotenv')

// 动态引入环境变量
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';

dotenv.config({ path: envFile })

module.exports = {
  SERVER_HOST,
  SERVER_PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD
} = process.env
