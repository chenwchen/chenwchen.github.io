---
title: 'vue源码解析'
abbrlink: 1110837624
date: 2020-04-17 17:04:38
tags: vue.js
categories: web
---

<style>
	img {
		width: 100%;
	}
</style>
Vue采用数据劫持配合发布者-订阅者模式的方式，通过Object.defineProperty来配置getter和setter来劫持数据的变化，在数据变动时，发布消息给依赖收集器，去通知观察者做出对应的回调函数，去更新视图。
MVVM 作为绑定的入口，整合Observer,Compile和Watcher三者，通过Observer来监听model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer,Compile之间的通信桥梁，达到数据数据变化 => 视图更新，视图的交互变化 => 数据model变更的双向绑定效果
<!-- more -->
## 数据绑定
![](UML.png)
## 观察者-订阅者部分
### 数据观察者
observer: 对数据进行循环遍历调用defineReactive方法
defineReactive: 对数据通过Object.defineProperty进行配置
> 在getter方法中添加订阅者
> 在setter方法调用Dep.notify通知订阅者
### 收集依赖器
![](dep.png)
当对data上的对象进行修改值的时候会触发它的setter，那么取值的时候自然就会触发getter事件，所以我们只要在最开始进行一次render，那么所有被渲染所依赖的data中的数据就会被getter收集到Dep的subs中去。在对data中的数据进行修改的时候setter只会触发Dep的subs的函数。
![](1.png)
![](2.png)
> 关于为什么Dep.target销毁，获取数据的时候就会触发添加依赖器，会导致多个观察者
### 订阅者
订阅者，当依赖收集的时候会addSub到sub中，在修改data中数据的时候会触发dep对象的notify，通知所有Watcher对象去修改对应视图。
> 解析指令时添加订阅者
![](3.png)

### 编译部分
通过使用Fragment进行简单的测试，并没有实现虚拟节点转化到编译
> 节点转换   DOM Node --> Fragment
![](4.png)

> 解析指令 v-directive --> directive
![](5.png)
> 指令封装    getDirective --> parseDirective --> removeDirective
![](6.png)
> 数据的双向绑定 监听input时间更新数据
![](7.png)
> 数据代理 this.$data.message --> this.message
![](8.png)

## 问题总结
> 什么时候会触发数据绑定
![](9.png)

首先通过一次渲染操作触发Data的getter（这里保证只有视图中需要被用到的data才会触发getter）进行依赖收集，这时候其实Watcher与data可以看成一种被绑定的状态（实际上是data的闭包中有一个Deps订阅者，在修改的时候会通知所有的Watcher观察者），在data发生变化的时候会触发它的setter，setter通知Watcher，Watcher进行回调通知组件重新渲染的函数，之后根据diff算法来决定是否发生视图的更新。
### 如下代码，while是死循环？
![](10.png)
![](11.png)


