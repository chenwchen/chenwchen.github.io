---
title: git基本操作
date: 2019-8-18 18:53:41
tags: git
categories: 基本操作
---
# <center><font color = red>Git基本操作</font><center>
## <font  color = gray>Git 基本操作</font>
<font  color = gray>Linux上安装 --dbian系列</font>

```c
解决依赖
apt install libcurl4-gnutls-dev libexpat1-dev gettext libz-dev libssl-dev
安装Git
apt install git
```
<!-- more -->
<font  color = gray>初始化</font>
```c
建立工作目录 : 这里以在用户目录为例，directory_name为任意目录名
mkdir ~/directory_name
切换进入目录
cd ~/directory_name
初始化 : 这里会创建一个.git隐藏目录，使用ls -al可以查看
git init
配置用户 : 全局用户和仓库用户，可以只配置其中一种
   全局用户 : git config --global user.name = name
   			 git config --global user.email = email
   仓库用户 : git config user.name = name
   			 git config user.email = email
```
<font  color = gray>创建文件、添加暂存区、提交到本地库</font>
```c
创建文件
touch filename
添加到暂存区
git add filename
提交到本地库
git commit -m "描述文件信息" filename
```
<font  color = gray>查看状态和日志</font>
```c
查看状态 : 文件暂存区情况
git status
查看日志
简洁版 : git reflog
详细版 : git log
```
<font  color = gray>版本控制</font>
```c
哈希值 : 使用git reflog 或者 git log可以查看
跳转到固定的版本，可以回退和前进
git reset --hard 哈希值
只能后退，每个^代表后退一个版本
git reset --hard HEAD^
只能后退，后退n个版本
git reset --hard HEAD~n
```
<font  color = gray>分支</font>
```c
查看分支 : 默认分支为master
git branch -v && git branch
创建分支
git branch branch_name
切换分支
git checkout branch branch_name
合并不同分支的版本
git merge branch_name
```
<font  color = gray>克隆、拉取、推送</font>
```c
可以使用ssh（需要配置ssh）、https地址
远程克隆库
git clone https_address
拉取
git pull https_address
推送
git push https_address
```
