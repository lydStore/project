const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry:'./src/index.js',
  output:{
   path: path.resolve(__dirname,'dist'),
  //  publicPath: '/src/',
   filename: 'bundle.js'
  },
  plugins: [
      new HtmlWebpackPlugin({
          title:'Index',
          filename: 'index.html',
          template: './src/index.html',
          hash: true,
          // minify: {
          //   collapseWhitespace: true //折叠空白区域 也就是压缩代码
          // }
      }), 
      new HtmlWebpackPlugin({
        title:'Demo',
        filename: 'demo.html',
        template: './src/demo.html',
        hash: true
      }), 
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader' 
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader'  // 从右到左执行，所以注意顺序  
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
          loader: 'url-loader?name=images/[path][hash:8].[name].[ext]',
          // test: /\.(png|jpg|gif|svg)$/,
          // loader: 'url-loader',
          // options: {
          //     name: './images/[name].[ext]',
          //     // limit: 8192
          // }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
            name: 'images/[name].[ext]'
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port:7000,
    host:'webpack.com'
 }
}