---
title: css选择器
date: 2020-01-24 15:47:46
tags: css
categories: 前端
---
# 选择器
### 前言
灵活的使用选择器可以美化html的格式，对于一些复杂的结构可以使用不同的选择器的变换来选择对应的元素，而不至于对每个元素添加id选择器或class选择器
<!-- more -->
### 基本选择器
选择器 |例子|例子描述|实例
|:----------|:------|:------|:-------
标签选择器|h1|选择标签h1元素|```h1{background:red;}```|
id选择器|#id_name|选择id="id_name"的所有元素|```#id_name{background:red;}```|
类选择器|.class_name|选择class="class_name"的所有元素|```.class_name{background:red;}```
后代选择器|div span|选择&lt;div&gt;下的所有&lt;span&gt;标签|```div span{color:red;}```
分组选择器|div,ul,h1|选择&lt;div&gt;，&lt;ul&gt;，&lt;h1&gt;元素|```div,ul,h1{margin:0px;margin:0px}```
子类选择器|选择父元素为div>p|&lt;div&gt;下的所有&lt;p&gt;标签|div>p{color:red;}
### 属性选择器
选择器|例子|例子描述
|:---------|:------|:------------
[attribute]|[target]	|选择带有 target 属性所有元素
[attribute=value]|[target=_blank]|选择 target="_blank" 的所有元素
[attribute~=value]|[title~=flower]|选择 title 属性包含单词 "flower" 的所有元素
[attribute=\|value]|[lang\|=en]	|选择 lang 属性值以 "en" 开头的所有元素

### 兄弟选择器
>两种选择器+ 和 ~
>*  h1+p 选择同一父元素下h紧接着的第一个p元素
>*  h1~p 选择同一父元素下h紧接着的所有p元素
### 伪类
#### 1、根据相同父元素紧接着的所有标签计数
>* :first-child: nth-child(1) 同一个父元素下的首个元素，如果不满足则不选择
>* :last-child: nth-child(count)同一父元素下的尾部元素
>* :nth-child(n):  同一父元素下的第n个元素 ，nth-child(2n)选择奇数
#### 2、根据相同父元素下的相同类型标签计数
>* :first-of-type: nth-of-type(1) :同一父元素下被选元素的首个元素
>* :last-of-type: nth-of-type(count):  同一父元素下被选元素的尾部元素
>* :nth-of-type(n) :同一父元素下相同类型的标签的第n个元素
#### 4、事件类
|选择器|例子|例子描述
|:----------|:------|:------|-----
:link|a:link|选择所有未被访问的链接
:visited|a:visited|选择所有已被访问的链接
:active|a:active|选择活动链接
:hover|a:hover|选择鼠标指针位于其上的链接
:focus|input:focus|选择获得焦点的 input 元素
#### 5、表单类
选择器|例子|例子描述
|:--------|:-------|:------|:-----
:checked|input:checked|&lt;input&gt;元素中被选中状态的元素
:disabled|input:disabled|&lt;input&gt;元素中禁用的元素
:enabled|input:enabled|&lt;input&gt;元素中启用的元素
#### 6、其他
> * :not : 除了被选择的元素，选择非第一个元素:not(:first-child)
> * \* ：表示选择所有元素
#### 7、伪元素
>* ::after
>* ::before
>* ::selection
>```html
><!DOCTYPE html>
><html>
><head>
><style>
>/*文本被选中之后才能有效果*/
>.first-text::selection{
>	color:#ff0000;
>}
>/*在class="second-text"前面插入文本*/
>.second-text::before{
>	content:"这是before文本";
> 	color:blue;
>}
>/*在class="second-text"之后插入文本*/
>.second-text::after{
>	content:"这是after文本";
>	color:yellow;
>}
></style>
></head>
><body>
>	<p class="first-text">这是第一段文本</p>
>	<p class="second-text">这是第二段文本</p>
></body>
></html>
>```

<font face=“黑体” color="red" size="5px">*注意</font>
#### :first-child和:first-of-type的区别
> first-child选择同一父元素下第一个标签，:first-of-type是同一父元素下被选择元素的第一个元素
> ```html
> <!--html代码片段-->
> <ul>
> 		<h1>title</h1>
>		<li>1</li>
>		<li>2</li>
>		<li>3</li>
></ul>
> ```
> ul li:first-child:没有元素被选择
> ul li:first-of-type:1被选择
### 感谢
[选择器教程](https://www.w3school.com.cn/cssref/css_selectors.asp)
[类选择器:first-child和:first-of-type](https://www.cnblogs.com/2050/p/3569509.html)
