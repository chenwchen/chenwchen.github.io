---
title: git基本操作
tags:
  - git
  - Linux
categories: Linux
abbrlink: 2879265125
date: 2019-08-18 18:53:41
---

## Git 基本操作
> Linux上安装 --dbian系列

```sh
# 解决依赖
apt install libcurl4-gnutls-dev libexpat1-dev gettext libz-dev libssl-dev
# 安装git
apt install git
```
<!-- more -->
## 初始化
```sh
# 建立工作目录 : 这里以在用户目录为例，dir_name为任意目录名
mkdir ~/dir_name
# 切换进入目录
cd ~/dir_name
# 初始化 : 这里会创建一个.git隐藏目录，使用ls -al可以查看
git init
# 配置用户 : 全局用户和仓库用户，可以只配置其中一种
## 全局配置
git config --global user.name = name
git config --global user.email = email
## 本地配置
git config user.name = name
git config user.email = email
## 远程配置
git remote add origin git_addr
```
## 创建文件、添加暂存区、提交到本地库
```sh
# 创建文件
touch filename
# 添加到暂存区
git add .        # 添加所有文件
git add filename # 添加文件
# 提交到本地库
git commit -m "描述文件信息" filename
```
## 查看状态和日志
```sh
# 查看状态 : 文件暂存区情况
git status
# 查看日志
git reflog        # 简介
git log           # 详细
git log --oneline # 单行
```
## 版本控制
```sh
# 哈希值 : 使用git reflog 或者 git log可以查看（跳转到固定的版本，可以回退和前进）
git reset --hard 哈希值
# 只能后退，每个^代表后退一个版本
git reset --hard HEAD^
# 只能后退，后退n个版本
git reset --hard HEAD~n
```
## 分支
```sh
# 查看分支 : 默认分支为master
git branch -v && git branch
# 创建分支
git branch branch_name
# 切换分支
git checkout branch branch_name
# 合并不同分支的版本
git merge branch_name
```
## 克隆、拉取、推送
```sh
# 可以使用ssh（需要配置ssh）、https地址
## 远程克隆库
git clone https_address
## 拉取
git pull https_address
## 推送
git push origin master ## 当地分支推送到远程master分支
git push origin local_branch:remote_branch  ## 从当地分支local_branch 推送到远程分支remote_branch
```
