
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



