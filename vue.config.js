const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? 'https://wg-front.oss-cn-hangzhou.aliyuncs.com/w3-ui/' : '/',
  assetsDir: 'assets',
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new CopyPlugin([
        {
          from: path.resolve(__dirname, 'node_modules/@shoelace-style/shoelace/dist/shoelace/icons'),
          to: path.resolve(__dirname, 'dist/assets/js/icons')
        }
      ])
    ]
  },
  parallel: require('os').cpus().length > 1
}
