function printError(file: string, env?: string) {
  if (env === 'development') {
    if (file !== 'index.ts') {
      console.log('读取失败的路由：', file)
    }
  } else if (env === 'production') {
    if (file !== 'index.js') {
      console.log('读取失败的路由：', file)
    }
  }
}

export default printError
