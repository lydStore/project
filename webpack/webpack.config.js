const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 引入css 单独打包插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// Create multiple instances
const extractCSS = new ExtractTextPlugin('css/[name]_[hash].css');
const extractLESS = new ExtractTextPlugin('css/[name]_[hash].css');
//
module.exports = {
  entry:{
      pc: __dirname + '/src/js/index.js',
      wap: __dirname + '/src/js/wapIndex.js',
  },
  output:{
   path: path.resolve(__dirname,'dist'),
   // publicPath: '/',
   filename: 'js/[name]_bundle_[hash].js',
  },
  plugins: [
      extractCSS,
      extractLESS,
      new CleanWebpackPlugin(),
      new OptimizeCssAssetsPlugin({
          assetNameRegExp: /\.optimize\.css$/g,
          cssProcessor: require('cssnano'),
          cssProcessorPluginOptions: {
              preset: ['default', { discardComments: { removeAll: true } }],
          },
          canPrint: true
      }),
      new HtmlWebpackPlugin({ //pc 首页
              title:'阿拉德之怒',
              filename: 'order_index.html',
              template: 'html-withimg-loader!'+path.resolve(__dirname, 'src/order_index.html'),
              hash: true,
              favicon: path.resolve(__dirname, 'src/images/favicon.ico'),
              minify: {
                collapseWhitespace: true //折叠空白区域
              },
              chunks: ['pc']

      }),
      new HtmlWebpackPlugin({//手机 首页
              title:'阿拉德之怒',
              filename: 'order_wapIndex.html',
              template: 'html-withimg-loader!'+path.resolve(__dirname, 'src/order_wapIndex.html'),
              hash: true,
              favicon: path.resolve(__dirname, 'src/images/favicon.ico'),
              minify: {
                  collapseWhitespace: true
              },
              chunks: ['wap']
      }),
      new HtmlWebpackPlugin({//手机 下载首页
          title:'阿拉德之怒',
          filename: 'wapIndex.html',
          template: 'html-withimg-loader!'+path.resolve(__dirname, 'src/wapIndex.html'),
          hash: true,
          favicon: path.resolve(__dirname, 'src/images/favicon.ico'),
          minify: {
              collapseWhitespace: true
          },
          chunks: ['wap']
      }),
      new HtmlWebpackPlugin({//pc 下载首页
          title:'阿拉德之怒',
          filename: 'index.html',
          template: 'html-withimg-loader!'+path.resolve(__dirname, 'src/index.html'),
          hash: true,
          favicon: path.resolve(__dirname, 'src/images/favicon.ico'),
          minify: {
              collapseWhitespace: true
          },
          chunks: ['pc']
      }),
      new HtmlWebpackPlugin({//pc 黄色版本首页
          title:'阿拉德之怒',
          filename: 'yellow_index.html',
          template: 'html-withimg-loader!'+path.resolve(__dirname, 'src/yellow_index.html'),
          hash: true,
          favicon: path.resolve(__dirname, 'src/images/favicon.ico'),
          minify: {
              collapseWhitespace: true
          },
          chunks: ['pc']
      })
  ],
  module: {
    rules: [
      {
          test:/\.css$/,
          // loader: 'style-loader!css-loader!postcss-loader',
          include: path.resolve(__dirname, 'src'),// 匹配时查找的范围
          use: extractCSS.extract({
              fallback: 'style-loader',
              publicPath: '../',
              use: [
                  'css-loader',
                  'postcss-loader'
              ]
          })
      },
      {
          test: /\.less$/i,
          // loader: 'style-loader!css-loader!postcss-loader!less-loader',  // 从右到左执行，所以注意顺序
          include: path.resolve(__dirname, 'src'),             // 匹配时查找的范围
          use:extractLESS.extract({
              fallback: 'style-loader',
              publicPath: '../',
              use: [
                  'css-loader',
                  'postcss-loader',
                  'less-loader'
              ]
          })
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
