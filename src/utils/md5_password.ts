import crypto from 'crypto'

function md5Password(password: string): string {
  const md5 = crypto.createHash('md5')

  // 使用十六进制(hex)加密密码，默认是二进制，通常用十六进制
  const md5pwd = md5.update(password).digest('hex')

  return md5pwd
}

export default md5Password
