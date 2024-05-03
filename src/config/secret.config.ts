import fs from 'node:fs'
import path from 'node:path'

// 使用绝对路径读取密钥文件
const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, './keys/private.key')
)
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'))

// 导出密钥
export { PRIVATE_KEY, PUBLIC_KEY }
