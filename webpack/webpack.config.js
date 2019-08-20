const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//
module.exports = {
  entry:{
      './js/pc': __dirname + '/src/index.js',
      './js/wap': __dirname + '/src/wapIndex.js',
  },
  output:{
   path: path.resolve(__dirname,'dist'),
  //  publicPath: '/src/',
   filename: '[name]_bundle_[hash].js',
  },
  plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({ //pc 首页
              title:'阿拉德之怒',
              filename: 'index.html',
              template: 'html-withimg-loader!'+path.resolve(__dirname, 'src/index.html'),
              hash: true,
              favicon: path.resolve(__dirname, 'src/images/favicon.ico'),
              minify: {
                collapseWhitespace: true //折叠空白区域
              },
              chunks: ['./js/pc']

      }),
      new HtmlWebpackPlugin({//手机 首页
              title:'阿拉德之怒',
              filename: 'wapIndex.html',
              template: 'html-withimg-loader!'+path.resolve(__dirname, 'src/wapIndex.html'),
              hash: true,
              favicon: path.resolve(__dirname, 'src/images/favicon.ico'),
              minify: {
                  collapseWhitespace: true
              },
              chunks: ['./js/wap']
      })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader',
          exclude: path.resolve(__dirname, 'node_modules'),    //匹配时忽略这个目录，提高打包速度
          include: path.resolve(__dirname, 'src'),             // 匹配时查找的范围
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader',  // 从右到左执行，所以注意顺序
          exclude: path.resolve(__dirname, 'node_modules'),    //匹配时忽略这个目录，提高打包速度
          include: path.resolve(__dirname, 'src'),             // 匹配时查找的范围
      },
      {
        test: /\.js$/,               // 匹配js文件
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),    //匹配时忽略这个目录，提高打包速度
        include: path.resolve(__dirname, 'src'),             // 匹配时查找的范围
        query: {
          presets: ['env']
        }
      },
        {
            test: /\.(jpg|png|gif|svg|jpeg)$/,
            loader: 'url-loader?limit=10000&name=images/[name].[hash:7].[ext]'
        },
        {
            test: /\.(jpg|png|gif|svg|jpeg)$/,
            loader: 'image-webpack-loader',// 压缩图片
            options: {
                limit: 10000,
                name: 'images/[name].[hash:7].[ext]'
            }
        }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port:8080,
    host:'local-adapiv2.srccwl.com',
    open:true,
    proxy: {
      '/api': {
          target: 'http://adapiv2.srccwl.com',
          pathRewrite: {'^/api' : ''},
          changeOrigin: true,     // target是域名的话，需要这个参数，
          secure: false,          // 设置支持https协议的代理
      }
    }
 }
};
