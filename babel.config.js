module.exports = {
  // 创建vue自带的配置
  presets: ['@vue/cli-plugin-babel/preset'],

  // element 的按需引入的配置
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
