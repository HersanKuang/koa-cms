import * as path from 'path'
import * as moduleAlias from 'module-alias'

// 配置路径别名
moduleAlias.addAliases({
  '@/app': path.join(__dirname, '../app'),
  '@/config': path.join(__dirname, '../config'),
  '@/modules': path.join(__dirname, '../modules'),
  '@/router': path.join(__dirname, '../router'),
  '@/shared': path.join(__dirname, '../shared'),
  '@/utils': path.join(__dirname, '../utils')
})
