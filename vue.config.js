module.exports = {
  // 设置是否在开发环境下每次保存代码时都启用 eslint验证。
  lintOnSave: false,
  devServer: {
    // 代理服务器 解决跨域
    proxy: {
      "/api": {
        target: "http://182.92.128.115/",
      },
    },
  },
};
