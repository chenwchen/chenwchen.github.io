---
title: vim基本操作
date: 2019-08-18 17:54:27
tags: linux
categories: linux
---
# <center ><font size = 5>linux基本操作-vim学习</font></center>
## <font size = 4 color = red>notepad的基本操作</font>
*打开文件、编辑、复制、粘贴、删除、撤回、查找、替换、保存、另存为。*
## <font size = 4 color = red>vim的基本操作</font>
## <font size = 3 color = gray>vim模式</font>
```c
命令模式：刚打开文件的时候、和按下ECS键模式
编辑模式：按下a、i、o进入文本编辑模式,底线显示INSERT，使用ECS键退出编辑模式
底线命令模式：在命令模式输入:command
```
<!-- more -->
<font size = 2 color = red>* ***命令前面加冒号的是底线命令模式，没有加冒号的是命令模式***</font>
## <font size = 3 color = gray>打开文件</font>
```c
文件存在 ，直接打开
vim filename
文件不存在 vim，新建文件打开
```
## <font size = 3 color = gray>编辑</font>

```c
i，从游标处开始编辑
```
## <font size = 3 color = gray>复制</font>
```c
yy：复制游标所在一行
nyy: n表示数字，复制游标开始处开始n行
```
## <font size = 3 color = gray>粘贴</font>

```c
p： 向下粘贴
P： 向上粘贴
```
##  <font size = 3 color = gray>删除</font>
```c
dd: 删除游标所在的一行
ndd:  n表示数字，删除游标开始处开始n行
```
## <font size = 3 color = gray>撤回</font>
```c
u：撤回当前操作 
```
## <font size = 3 color = gray>替换</font>
```c
:s/cur_word/rep_word/ :当前行第一个替换
:s/cur_word/rep_word/g : 当前行所有替换
:1,$s/cur_word/rep_word/g:从第一行开始替换全部
:1,$s/cur_word/rep_word/gc :从第一行开始询问是否替换
```
## <font size = 3 color = gray>保存</font>

```c
:q  : 未修改退出，修改过文档，不能用此命令退出
:q! : 强制退出，不保存修改
:wq : 保存修改退出
```
## <font size = 3 color = gray>另存为</font>
```c
:w new_file : 另存为new_file文件
:wq new_file : 另存为new_file退出
```
## <font size = 3 color = gray>多行选择</font>
```c
v : 上下左右控制多行选择
ctrl v : 块多行选择
```
## <font size = 3 color = gray>移动</font>
```c
方向键 : up down left right
字符键 : j k j l 
```
## <font size = 3 color = gray>设置行号</font>
```c
:set nu : 显示行号
:set nonu : 不显示行号
```
## <font size = 3 color = gray>翻页</font>

```c
ctrl f : 向下翻页
ctrl b : 向上翻页    
```




