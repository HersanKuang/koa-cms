const crypto = require('crypto')

function md5Password(password) {
  const md5 = crypto.createHash('md5')

  // 使用十六进制(hex)加密密码，默认是二进制，通常用十六进制
  const md5pwd = md5.update(password).digest('hex')

  return md5pwd
}

module.exports = md5Password
