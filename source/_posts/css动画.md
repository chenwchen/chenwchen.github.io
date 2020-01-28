---
title: CSS动画
date: 2020-01-23 00:35:47
tags: css
categories: 前端
---
### 前言
最近一段时间在研究css的动画的效果，才发现css写出的一些动画效果并不弱于javascript实现，如[css实现轮播](https://www.jianshu.com/p/550c11f3b731)、css实现一些炫酷动画等。研究css的案例，你会发现很多可以使用javascript的代码都可以简化为css实现。
<!-- more -->
### 产生动画属性
属性 | 作用|选项
-------|-------|-------
transform|放大、缩小、平移、旋转、倾斜|scale(value)、translate(x-translate,y-translate)、rotate(deg)、skew(x-deg,y-deg)
transiton|属性（width、height、transform、all）、持续时间、时间函数、延迟开始时间|transition-property、transition-duration、transition-timing-function、transition-delay
animation|动画,动画绑定使用@keyframes|@keyframes name

### transform 演示代码
```html
<!--html部分-->
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>transform-csdn</title>
	<link rel="stylesheet" href="css/transform-csdn.css">
</head>
<body>
	<ul class="transform">
		<li>原始</li>
		<li>放大</li>
		<li>缩小</li>
		<li>平移</li>
		<li>倾斜</li>
		<li>旋转</li>
	</ul>	
</body>
</html>
```
```css
/**css代码部分**/
/*基本样式*/
.transform{
	padding: 0px;
	margin: 0px;
	width: 100%;
	height: 80px;
}
.transform li{
	height: 100%;
	display: inline-block;
	list-style: none;
	margin: 0px 40px 0px 0px;
	width: 10%;
	background: #ccc;
	color: white;
	font-weight: 900;
	font-size: 2em;
	text-align: center;
	line-height: 80px;
}
/*变换
 主要包括：放大、缩小、平移、旋转、倾斜*/
.transform li:nth-child(2){
	/*放大到1.2倍*/
	transform: scale(1.2);
}
.transform li:nth-child(3){
	/*缩小到0.8倍*/
	transform: scale(0.8)
}
.transform li:nth-child(4){
	/*y轴平移100px*/
	transform: translate(0px,100px);
}
.transform li:nth-child(5){
	/*x轴倾斜10deg*/
	transform: skew(10deg,0deg);
}
.transform li:nth-child(6){
	/*旋转180deg*/
	transform: rotate(180deg);
}
```

### transfrom演示图片
![transofrom演示图片](https://img-blog.csdnimg.cn/20200122223628608.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyODI0NTYy,size_16,color_FFFFFF,t_70)
### transition介绍
#### 1、缺点
>1. 一次性
>2. 只能定义开始状态和结束状态
>3. 单属性变化
#### 2、属性详细介绍
>值|描述
>---|-----
>transition-property|对应过渡属性、width变化、高变化、opacity、all等等
>transition-duration|过渡持续时间
>transiton-timing-function|速度时间曲线 ease、linear、ease-in、ease-out、ease-in-out
>transiton-delay|延迟开始
>transition-timing-function
>![在这里插入图片描述](https://img-blog.csdnimg.cn/2020012223414557.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyODI0NTYy,size_16,color_FFFFFF,t_70)
### transition演示代码
```html
<html>
<head>
<meta charset="utf-8"> 
<title>菜鸟教程(runoob.com)</title>
<style> 
div
{
	width:100px;
	height:100px;
	background:red;
	transition:all ease 2s 3s;
}

div:hover
{
	width:200px;
}
</style>
</head>
<body>

<p><b>注意：</b>该实例无法在 Internet Explorer 9 及更早 IE 版本上工作。</p>



<div></div>

<p>鼠标移动到 div 元素上，查看过渡效果。</p>
<p><b>注意：</b> 过渡效果需要等待两秒后才开始。</p>

</body>
</html>
```
### 3、animation属性介绍
>值|描述
>---|-----
>name|使用@keyframes绑定的名字
>duration|动画持续时间
>timing-function|速度时间函数
>delay|延迟开始时间
>iteration-count|循环次数 infinite（无穷）
>direction(方向)|normal(按时间轴顺序)、reverse(时间轴反方向运行)、alternate(来回往复进行)、alternate-reverse(交替反方向运行再正方向运行）
>play-state|running、pause
### animation代码演示
```html
<!--html代码部分-->
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>animation-csdn</title>
	<link rel="stylesheet" href="css/animation-csdn.css">
</head>
<body>
	<div class="animation"></div>
</body>
</html>
```
```css
/**css代码部分**/
.animation{
	width: 200px;
	height: 200px;
	background: #ccc;
	/*名字、持续时间、循环次数、速度时间曲线、方向、运行状态*/
	animation: amimation-demo 5s infinite linear running;
}
@keyframes amimation-demo{
	25%{
		background: yellow;
	}
	50%{
		background: green;
	}
	75%{
		background: blue;
	}
}

```
### 感谢
[CSS动画：animation、transition、transform、translate](https://juejin.im/post/5b137e6e51882513ac201dfb)
[菜鸟教程教程](https://www.runoob.com/css3/css3-tutorial.html)