
# 基于webpack4 构建的 多页面 demo


## 介绍

* webpack4结构配置
* 引入jquery
* 引入vue
* 配置 webpack-dev-server
* 图片正确引入

## 如何使用

* git clone
* npm install
* 记得全局安装webpack webpack-cli webpack-dev-server
* npm run dev (开发环境)
* npm run build (生产环境打包)


## 安装依赖


* 全局安装webpack，注意，webpack4版本需要单独再安装webpack-cli
```
npm install webpack webpack-cli -g
```

* 项目开发依赖安装webpack,webpack-cli

```
npm install webpack webpack-cli -D
```

* 安装各种插件和loader依赖
```
cnpm install html-webpack-plugin extract-text-webpack-plugin clean-webpack-plugin style-loader less less-loader css-loader url-loader file-loader html-loader --save-dev

```
注意：1、注意在webpack4.X里面 `extract-text-webpack-plugin`由于版本支持的问题，会报下面这样的错误：   

```
Error: Chunk.entrypoints: Use Chunks.groupsIterable and filter by instanceof Entrypoint instead 
```
因此需要安装与webpack4以上适应的版本：   

```
npm install -D extract-text-webpack-plugin@next
```


## 如何全局引入jquery

* 首先安装加载器expose-loader和jquery:
```
npm i expose-loader jquery --save
```

* 然后，在webpack.config.js里的modules.rules里加入下面代码

```js
rules: [
        	//暴露$和jQuery到全局
	        {
	            test: require.resolve('jquery'), //require.resolve 用来获取模块的绝对路径
	            use: [{
	                loader: 'expose-loader',
	                options: 'jQuery'
	            }, {
	                loader: 'expose-loader',
	                options: '$'
	            }]
	        }
        ]
```

* 接下来就可以在每个页面的js模块里引入了：
```js
//a.js

require('jquery')

$('.wrap').addClass('hhhh')

```


## 如何在多页面里引入vue

* 首先 安装vue vue-loader vue-template-compile

```
npm install vue@2.5.16 --save


npm install vue-loader@14.2.2 vue-template-compiler@2.5.16 --save-dev

```

* 然后，在webpack.config.js里增加如下配置：

```js
module: {
        rules: [
          //引入vue-loader
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                    options: {}
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'  //通过别名来把原导入路径映射成一个新的导入路径
        }
    },

```

* 接着，在相关文件里进行vue相关的引入以及测试代码编写：

```js
//a.js
import Vue from 'vue'
import a1 from './components/a1.vue'

new Vue({
  render:h=> h(a1)
}).$mount('#app')
```

```js
//./components/a1.vue
<template>
<div>
  <div>{{head}}</div>
  <ab></ab>
</div>
  
</template>

<script>
import Ab from './a2.vue'
export default {
  data(){
    return{
      head:'我是a页面的子组件'
    }
  },
  components:{
    Ab
  }
}
</script>

<style>

</style>
```

```js
//./components/a2.vue
<template>
  <div>{{head}}</div>
</template>

<script>
export default {
  data(){
    return{
      head:'我是孙子组件'
    }
  }
}
</script>

<style>

</style>

```

* 然后再运行 npm run dev 访问dist目录下的a.html，就可以看到完成后的效果啦~~

![](https://github.com/bettermu/blog-picture-store/blob/master/20181103-webpack4-demo/2.png?raw=true)


## 重新整理本地环境，引入webpack-dev-server进行开发环境热更新

其实上面的代码有不妥的地方，就是package.json的scripts里只配置了一条生产环境打包的脚本执行：

![](https://github.com/bettermu/blog-picture-store/blob/master/20181103-webpack4-demo/1.png?raw=true)

其实这样对于开发来讲，并不友好，我们急切需要一个能够在开发环境，于是，首先，我们全局安装下webpack-dev-server：

```
npm install webpack-dev-server -g
```

然后，在webpack.config.js文件里，加入devServer模块：

```js
//起本地服务
  devServer:{
    //目录
    contentBase:"./dist/",
    historyApiFallback:true,
    inline:true,
    hot:true,
    host:'127.0.0.1'  //服务地址
  }
```

接下来，在package.json文件里的scripts里加入：

```js
"dev":"webpack-dev-server --mode development --inline --hot --watch"
```

如图：  

![](https://github.com/bettermu/blog-picture-store/blob/master/20181103-webpack4-demo/3.png?raw=true)

然后，我们在命令行里输入：

```
npm run dev
```

然后，打开浏览器，输入：http://localhost:8080/a/a.html （这里需要注意，我们在devServer里配置的目录是dist下面的，因此，访问的时候，后面直接加dist下面的目录就好，无需再加前缀dist）

效果如下：   

![](https://github.com/bettermu/blog-picture-store/blob/master/20181103-webpack4-demo/4.png?raw=true)

## 配置webpack-dev-server proxy代理 解决请求跨域问题

首先，我们在webpack.config.js里的devServer中配置proxy：
```js

//起本地服务
  devServer:{
    //目录
    contentBase:"./dist/",
    historyApiFallback:true,
    inline:true,
    hot:true,
    host:'127.0.0.1',
    port:8090,
    proxy: {
      '/': {
          target: 'http://localhost:3000',  //请求的目标地址
          changeOrigin: true,
      }
  }

```

发个请求试下：

```js
//a.js
$.ajax({
  type: "get",
  url: "/search/hot",
  dataType: "json",
  success: function (response) {
    console.log(response)
  }
});
```

如上面代码所示：当我们请求 /search/hot的时候，也就是请求http://localhost:3000/search/hot  

http://localhost:3000/search/hot 接口返回数据如图：   

![](https://github.com/bettermu/blog-picture-store/blob/master/20181103-webpack4-demo/12.png?raw=true)

启动  npm run dev 之后，效果截图如下：   

![](https://github.com/bettermu/blog-picture-store/blob/master/20181103-webpack4-demo/13.png?raw=true)   

可以看到  我们的数据正确请求回来了。



## 问题记录

### 关于在htmlWebpackPlugin中配置的title属性未生效的问题

```js
new HtmlWebpackPlugin({
      title: '页面一', //标题
      filename: './a/a.html', //文件目录名
      template: './src/page1/a.html', //文件模板目录
      hash: true, //是否添加hash值
      chunks: ['a'], //模板所引用的js块
    }),
```

我在a页面的配置里加上了title的配置，同样在a.html里加入了：
```html
<title><%= htmlWebpackPlugin.options.title %></title>
```

这里需要注意，htmlWebpackPlugin不能写成HtmlWebpackPlugin。  

发现配置未生效，结果页面的title显示是<%= htmlWebpackPlugin.options.title %>，后来找到了原因，需要把webpack.config.js里的html-loader给注释掉：

![](https://github.com/bettermu/blog-picture-store/blob/master/20181103-webpack4-demo/5.png?raw=true)



### 关于图片的正确引入

开发目录如下  

![](https://github.com/bettermu/blog-picture-store/blob/master/20181103-webpack4-demo/7.png?raw=true)

打包后的目录如下

![](https://github.com/bettermu/blog-picture-store/blob/master/20181103-webpack4-demo/8.png?raw=true)

a.html

![](https://github.com/bettermu/blog-picture-store/blob/master/20181103-webpack4-demo/6.png?raw=true)

a.less

![](https://github.com/bettermu/blog-picture-store/blob/master/20181103-webpack4-demo/9.png?raw=true)



由于html文件是通过html-wepback-plugin生成的，如果希望webpack能够正确处理打包之后图片的引用路径，需要在模板文件中这样引用图片。


```html
<!-- 正确：会交给url-loader 或 file-loader -->
<!-- require让图片和html产生依赖引用关系 -->
<img src="<%= require('../imgs/1.jpg') %>" alt="">

<!-- 错误：原样输出，不做任何处理 -->
<img src="../imgs/1.jpg" alt="">
```

参照上面的目录，分析下，我们开发环境里图片路径，是通过 '../imgs/1.jpg' 来访问的，但是打包到dist文件夹下，其中图片在asset文件夹下，那么需要通过 '../assets/[hash].jpg' 去访问，那么如何去做这一层处理呢？

通过配置webpack.config.js里的file-loader

![](https://github.com/bettermu/blog-picture-store/blob/master/20181103-webpack4-demo/10.png?raw=true)

一开始我只指定了outputPath，那么实际打包之后，文件访问路径为 'assets/[hash].jpg'，实际上就是  path.join(outputPath, name)  ，这里的name是默认命名规则，[hash].[ext]  。不符合预期，那么这就引入了第二个属性： publicPath:

如果指定了publicPath，则路径会变成 path.join(publicPath, name)，这里会忽略掉outputPath，那么这里我们只需要添加  publicPath:'../assets/'  即可

重新运行打包，就能看到效果了，可以看到图片已经正确引入了：

![](https://github.com/bettermu/blog-picture-store/blob/master/20181103-webpack4-demo/11.png?raw=true)

















