module.exports = {
  lintOnSave: false,
  devServer: {
    host: 'localhost',
    port: 8080,
    https: false,
    open: true, // 是否自动启动浏览器
    proxy: {
      '/admin': {
        target: 'http://ceshi5.dishait.cn/admin', // 服务器api地址
        ws: true, // proxy websockets
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          // 重写路径
          '^/admin': ''
        }
      }
    }
  }
}
