import fs from 'node:fs'
import path from 'node:path'

// 判断密钥是否存在
const priv = path.resolve(__dirname, './keys/private.key')
const pub = path.resolve(__dirname, './keys/public.key')

// dist/config/keys/ 目录下公钥和私钥不存在则抛出异常
if (!fs.existsSync(priv) || !fs.existsSync(pub)) {
  throw new Error('The public or private key does not exist')
}

// 使用绝对路径读取密钥文件
const PRIVATE_KEY = fs.readFileSync(priv)
const PUBLIC_KEY = fs.readFileSync(pub)

// 导出密钥
export { PRIVATE_KEY, PUBLIC_KEY }
