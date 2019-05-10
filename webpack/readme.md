https://www.jianshu.com/p/b055f9ab510c
cnpm i webpack webpack-cli -g
cnpm init
cnpm i webpack webpack-cli -D
注： -D是--save-dev的缩写
-S是--save的缩写
区别：-D是只在开发环境即dev中使用，项目发布以后就不会使用到，如babel，loader等
-S是在开发和正式环境都会用到，如jq，Vue等
webpack --mode development（开发环境）
webpack --mode production（发布模式），
"dev":"webpack --mode development", "build":"webpack --mode production"

1.预处理css，less
安装less，less-loader，css-loader，style-loader，postcss-loader和autoprefixer
cnpm install less less-loader css-loader style-loader postcss-loader autoprefixer -D

module: {
  rules: [
    {
      test: /\.less$/,
      loader: 'style-loader!css-loader!postcss-loader!less-loader'  // 从右到左执行，所以注意顺序  
    }
  ]
}
为了加webkit等前缀需要在webpack.config同级下创建一个postcss.config.js文件导入autoprefixer自动补全
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}

还需在package.json文件中添加判断浏览器版本
"browserslist": [
  "> 1%",       // 全球浏览器使用率大于1%，最新两个版本并且是IE8以上的浏览器，加前缀  
  "last 2 versions",
  "not ie <= 8"
]

加入babel对es6语法进行转译
cnpm install babel-loader babel-core babel-preset-env --save-dev
{
  test: /\.js$/,               // 匹配js文件
  loader: 'babel-loader',
  exclude: path.resolve(__dirname, 'node_modules'),    //匹配时忽略这个目录，提高打包速度
  include: path.resolve(__dirname, 'src'),             // 匹配时查找的范围
  query: {
    presets: ['env']
  }
}



启动项目


npm install

npm run dev

npm run start











