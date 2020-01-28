---
title: vim基本操作
date: 2019-08-18 17:54:27
tags: linux
categories: linux
---
## notepad的基本操作
> 打开文件、编辑、复制、粘贴、删除、撤回、查找、替换、保存、另存为。*

## vim模式
```c
命令模式：刚打开文件的时候、和按下ECS键模式
编辑模式：按下a、i、o进入文本编辑模式,底线显示INSERT，使用ECS键退出编辑模式
底线命令模式：在命令模式输入:command
```
<!-- more -->
> \*命令前面加冒号的是底线命令模式，没有加冒号的是命令模式
## 打开文件
```c
文件存在 ，直接打开
vim filename
文件不存在 vim，新建文件打开
```
## 编辑

```c
i，从游标处开始编辑
```
## 复制
```c
yy：复制游标所在一行
nyy: n表示数字，复制游标开始处开始n行
```
## 粘贴

```c
p： 向下粘贴
P： 向上粘贴
```
##  删除
```c
dd: 删除游标所在的一行
ndd:  n表示数字，删除游标开始处开始n行
```
## 撤回
```c
u：撤回当前操作 
```
## 替换
```c
:s/cur_word/rep_word/ :当前行第一个替换
:s/cur_word/rep_word/g : 当前行所有替换
:1,$s/cur_word/rep_word/g:从第一行开始替换全部
:1,$s/cur_word/rep_word/gc :从第一行开始询问是否替换
```
## 保存

```c
:q  : 未修改退出，修改过文档，不能用此命令退出
:q! : 强制退出，不保存修改
:wq : 保存修改退出
```
## 另存为
```c
:w new_file : 另存为new_file文件
:wq new_file : 另存为new_file退出
```
## 多行选择
```c
v : 上下左右控制多行选择
ctrl v : 块多行选择
```
## 移动
```c
方向键 : up down left right
字符键 : j k j l 
```
## 设置行号
```c
:set nu : 显示行号
:set nonu : 不显示行号
```
## 翻页

```c
ctrl f : 向下翻页
ctrl b : 向上翻页    
```




