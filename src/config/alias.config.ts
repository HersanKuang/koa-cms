import path from 'path'
import moduleAlias from 'module-alias'

// 设置别名
moduleAlias.addAliases({
  '@/modules': path.resolve(__dirname, '..', 'modules'),
  '@/app': path.resolve(__dirname, '..', 'app'),
  '@/router': path.resolve(__dirname, '..', 'router'),
  '@/config': path.resolve(__dirname, '..', 'config'),
  '@/utils': path.resolve(__dirname, '..', 'utils'),
  '@/shared': path.resolve(__dirname, '..', 'shared')
})

// 初始化 module-alias
moduleAlias()
