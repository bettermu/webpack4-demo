const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

const config = {
  //入口文件配置
  entry: {
    a: './src/page1/a.js',
    b: './src/page2/b.js'
  },

  //出口文件配置
  output: {
    filename: './[name]/[name].js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    //分割css插件
    new ExtractTextWebpackPlugin({
      filename: "[name]/[name].css", //指定编译后的目录
      allChunks: true //把分割的 块分别打包
    }),

    //配置html模板，因为是多页面，所以需要配置多个模板
    new HtmlWebpackPlugin({
      title: '页面一', //标题
      filename: './a/a.html', //文件目录名
      template: './src/page1/a.html', //文件模板目录
      hash: true, //是否添加hash值
      chunks: ['a'], //模板所引用的js块
    }),
    new HtmlWebpackPlugin({
      title: '页面二', //标题
      filename: './b/b.html', //文件目录名
      template: './src/page2/b.html', //文件模板目录
      hash: true, //是否添加hash值
      chunks: ['b'], //模板所引用的js块
    }),

    //每次清空dist目录
    new CleanWebpackPlugin(['dist'])
  ],

  module: {

    rules: [
      {
        test:/.vue$/,
        use:{
          loader:'vue-loader',
          options:{}
        }
      },

      {
        test: /\.css/,
        use: ExtractTextWebpackPlugin.extract({
          use: ['css-loader']
        }, )
      }, //带css的css编译
      {
        test: /\.less/,
        //内联配置
        //use:['style-loader','css-loader','less-loader']

        //分离配置
        use: ExtractTextWebpackPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'less-loader']
        }, )
      },//带less的css编译
      {
        test: /\.(svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'assets/'
          }
        }]
      }, //图片和字体加载
      {
        test: /\.png$/,
        use: {
          loader: "url-loader",
          options: {
            mimetype: "image/png",
            limit: "4096"
          }
        }
      }, //如果有png格式的图片，超过4M直接转化为base64格式
      //{
      //  test: /\.html$/,
      //  use: {
      //    loader: 'html-loader',
      //    options: { //打包html文件
      //      minimize: true, //是否打包为最小值
      //      removeComments: true, //是否移除注释
      //      collapseWhitespace: true, //是否合并空格
      //    }
      //  }
      //},

      //暴露$和jquery到全局
      {
        test:require.resolve('jquery'),//require.resolve 用来获取模块的绝对路径
        use:[{
          loader:'expose-loader',
          options:'jQuery'
        },{
          loader:'expose-loader',
          options:'$'
        }]
      }


    ],


  },

  resolve:{
    alias:{
      'vue$':'vue/dist/vue.esm.js'
    }
  },

  //起本地服务
  devServer:{
    //目录
    contentBase:"./dist/",
    historyApiFallback:true,
    inline:true,
    hot:true,
    host:'127.0.0.1'
  }

}

module.exports = config