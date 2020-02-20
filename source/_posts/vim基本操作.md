---
title: vim基本操作
tags: linux
categories: linux
abbrlink: 1704325616
date: 2019-08-18 17:54:27
---
vim的基本操作分为打开文件、编辑、复制、粘贴、删除、撤回、查找、替换、保存、另存为。vim有五种工作模式：命令模式、插入模式、末行模式、可视化模式、末行模式
<!-- more -->
## vim模式
> 命令模式：刚打开文件的时候、和按下ECS键模式
> 插入模式：按下a、i、o进入文本编辑模式,底线显示INSERT，使用ECS键退出编辑模式

![/vim-scheme.png](/images/vim-scheme.png)

## 打开文件
```sh
vim file                   #文件存在直接打开，文件不存在创建后打开
vim file1 file2 [...filen] # 打开多个文件
```

## 插入模式
```sh
i   # 光标之前插入
a   # 光标之后插入
o   # 光标所在行后新增一行
I   # 光标所在行开始处插入
A   # 光标所在行结尾处插入
O   # 光标所在行前新增一行
```
## 可视化模式
```sh
v       # 上下左右控制多行选择
ctrl v  # 列块选择
```

## 复制粘贴
在可视化模式（ctrl v 和 v）下，输入y复制选定的字符串，然后可以在命令模式下按下p进行粘贴操作
```sh
yy  # 复制游标所在一行
nyy # n表示数字，复制游标开始处开始n行
p   # 向下粘贴
P   # 向上粘贴
```

## 删除撤回
```sh
dd     # 删除游标所在的一行
ndd    # n表示数字，删除游标开始处开始n行
:u     # 撤回当前操作 
ctrl r # 撤回上一个被撤销操作 
```
## 查找替换
```sh
# 查找
/string                     # 查找字符串string
n                           # 向下查找
N                           # 向上查找
# 替换
:s/cur_word/rep_word/       # 当前行第一个替换
:s/cur_word/rep_word/g      # 当前行所有替换
:1,$s/cur_word/rep_word/g   # 从第一行开始替换全部
:1,$s/cur_word/rep_word/gc  # 从第一行开始询问是否替换
```
## 保存
```sh
:q  		 # 未修改退出，修改过文档，不能用此命令退出
:q! 		 # 强制退出，不保存修改
:wq 		 # 保存修改退出
:w new_file  # 另存为new_file文件
:wq new_file # 另存为new_file退出
```

## 移动
```sh
↑ ↓ ← → # 方向键
k j h l # 字母键
$       # 当前光标行尾
^       # 当前光标行首、
gg      # 文章行首
G       # 文章行尾
ctrl f  # 向下翻页
ctrl b  # 向上翻页  
```
## 设置行号
```sh
:set nu    # 显示行号
:set nonu  # 不显示行号
```