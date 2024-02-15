/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    // 启用 '@vue/eslint-config-typescript' 配置，这个配置包含了一些针对 TypeScript 的推荐规则。
    '@vue/typescript/recommended',
    // 启用 '@vue/eslint-config-prettier' 配置，这个配置关闭所有和 Prettier 冲突的规则，让 ESLint 和 Prettier 能够更好地协同工作。
    '@vue/prettier',
    // 启用 '@vue/eslint-config-prettier/@typescript-eslint' 配置，这个配置关闭所有和 Prettier 以及 TypeScript 冲突的规则，让 ESLint、Prettier 和 TypeScript 能够更好地协同工作。
    '@vue/prettier/@typescript-eslint',
    // 启用 'prettier' 插件的 'recommended' 配置，这个配置包含了一些 Prettier 推荐的规则，并且把 Prettier 本身设置为 ESLint 的一个规则，这样 ESLint 就会在检查代码的时候同时运行 Prettier(运行.prettierric.json文件里的规则)。
    'plugin:prettier/recommended'
  ],
  // 小程序全局变量
  globals: {
    uni: true,
    wx: true,
    WechatMiniprogram: true,
    getCurrentPages: true,
    getApp: true,
    UniApp: true,
    UniHelper: true,
    App: true,
    Page: true,
    Component: true,
    AnyObject: true
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        semi: false,
        printWidth: 100,
        trailingComma: 'all',
        endOfLine: 'auto'
      }
    ],
    'vue/multi-word-component-names': ['off'],
    'vue/no-setup-props-destructure': ['off'],
    'vue/no-deprecated-html-element-is': ['off'],
    '@typescript-eslint/no-unused-vars': ['off']
  }
}
