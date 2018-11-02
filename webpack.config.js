
const config = {
  //入口文件配置
  entry:{
    a:'./src/page1/a.js',
    b:'./src/page2/b.js'
  },

  //出口文件配置
  output:{
    filename:'./[name]/[name].js',
    path:path.resolve(__dirname,'dist')
  }
}