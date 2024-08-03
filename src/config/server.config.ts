// 从 process.env 解构需要的环境变量
const {
  SERVER_HOST,
  SERVER_PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  PRIVATE_KEY_URL,
  PUBLIC_KEY_URL
} = process.env

// 导出环境变量
export {
  SERVER_HOST,
  SERVER_PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  PRIVATE_KEY_URL,
  PUBLIC_KEY_URL
}
