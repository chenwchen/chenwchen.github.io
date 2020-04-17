---
title: vue技术解密
abbrlink: 1069906284
date: 2020-04-17 17:26:59
tags: vue.js
categories: web
---
<style>
    img {
        width: 100%;
    }
</style>

## 阅读源码顺序
```
src/platforms/entry-runtime-with-compiler
src/platforms/runtime/index.js
src/core/instance/index.js  
src/core/instance/init.js
src/core/instance/lifecycle.js
    mountComponen	
    Vue.prototype._update 
patch.js 
```

<!-- more -->
![](vue-lifecycle.png)

## vue.$mount
对el进行限制，Vue不能挂载在body、html上，如果没有render方法。把el或者template字符串转换为render方法，无论单文件.vue方式开发组件，还是el或者template属性最终都转换为render方法 
![](1.png)
![](2.png)


模板和数据如何渲染成最终的 DOM 的过程分析完毕了，我们可以通过下图更直观地看到从初始化 Vue 到最终渲染的整个过程。
![](3.png)

## 在vm.prototype._update的作用
> 首次更新视图调用，把虚拟节点转化为真是的节点
> 当视图发生变化时，对比当前节点和以前节点进行更新视图

![](4.png)

