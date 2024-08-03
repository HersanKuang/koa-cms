import fs from 'node:fs'
import { PRIVATE_KEY_URL, PUBLIC_KEY_URL } from '@/config/server.config'

// dist/config/keys/ 目录下公钥和私钥不存在则抛出异常
if (!fs.existsSync(PRIVATE_KEY_URL!) || !fs.existsSync(PUBLIC_KEY_URL!)) {
  throw new Error('The public or private key does not exist')
}

// 使用绝对路径读取密钥文件
const PRIVATE_KEY = fs.readFileSync(PRIVATE_KEY_URL!)
const PUBLIC_KEY = fs.readFileSync(PUBLIC_KEY_URL!)

// 导出密钥
export { PRIVATE_KEY, PUBLIC_KEY }
