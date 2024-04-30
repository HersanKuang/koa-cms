module.exports = {
  env: {
    node: true,                       // 指定脚本的运行环境是 Node.js
    es2021: true                      // 使用 ES2021 的语法支持
  },
  extends: [
    'eslint:recommended',             // 使用 ESLint 的推荐规则
    'plugin:@typescript-eslint/recommended', // 使用 TypeScript 插件的推荐规则
    'plugin:prettier/recommended'     // 启用 Prettier 插件，确保代码风格的一致性
  ],
  parser: '@typescript-eslint/parser', // 指定 ESLint 解析器
  parserOptions: {
    ecmaVersion: 12,                 // ECMAScript 版本
    sourceType: 'module',            // 模块化类型，使用 ES 模块
    project: './tsconfig.json'       // 指向 TypeScript 配置文件，让 ESLint 了解项目结构
  },
  plugins: [
    '@typescript-eslint',            // 使用 TypeScript 插件
    'prettier'                       // 使用 Prettier 插件
  ],
  rules: {
    'prettier/prettier': 'error',    // Prettier 的错误显示为 ESLint 错误
    'no-unused-vars': 'off',         // 关闭这个规则，因为 TypeScript 已经检查了
    '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
    '@typescript-eslint/no-explicit-any': 'off',
    // 对未使用的变量报错，但允许参数在使用之后的变量未被使用
    'no-console': 'off',             // 对 console 语句关闭警告
    'eqeqeq': ['error', 'always'],   // 要求使用 === 和 !==
    'curly': 'error',                // 强制使用大括号的风格
    'no-throw-literal': 'error',     // 禁止抛出字面量错误 throw "error"; 必须使用 Error 对象
    'no-return-await': 'off',        // 禁止不必要的 return await
    'require-await': 'error'         // 禁止没有 await 表达式的 async 函数
  },
  ignorePatterns: ['.eslintrc.js'],  // 忽略 ESLint 检查的文件
};
