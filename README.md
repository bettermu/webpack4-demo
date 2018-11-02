
# 基于webpack4 构建的 多页面 demo

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





