---
title: hexo发布到服务器
tags:
  - 前端
  - html
  - css
  - hexo
categories: web
abbrlink: 4021348188
date: 2020-02-01 20:09:14
---
学习了一段时间搭建博客，从最初的landscape主题到hexo-next，修改配置文件和改动样式，终于能在GitHub上跑起来了。搭建完访问自己博客的时候，发现每次都要转动半天。苦恼了半天，最终决定把博客搭建到阿里云服务器上
<!-- more -->

## 搭建流程
1. [本地环境搭建](#本地搭建)
2. [远程服务器搭建(ubuntu)](#远程服务器搭建)
3. [使用hexo自动化发布 hexo deploy](#hexo自动化发布)

## 本地搭建
### hexo配置
```sh
初始博客 hexo init
新建文章 hexo new "new page"
清理生成 hexo clean && hexo generate(hexo clean && hexo g)
启动服务 hexo serve(hexo s)
```
### ssh配置
```sh
ssh生成 ssh-keygen -t rsa -C "youremail@email.com"
目录结构
.ssh(windows在C:/Users/user_name/.ssh linux在~/.ssh)
   |.id_rsa.pub.swp
   |id_rsa          私钥
   |id_rsa.pub      公钥
   |known_hosts
```
## 远程服务器搭建
### git和nginx安装配置
> nginx默认配置文件 /etc/nginx/sites-available/default

![/etc/nginx/sites-available/default](/images/nginx-default.png)
```sh
apt-get update
apt-get install -y git
apt-get install -y nginx
git config --global user.email your_config_email 
git config --global user.name your_config_username
```

### 新建用户
```sh
添加用户 adduser git
修改密码 passwd git
```
### 目录部署
```sh
切换git用户 su git
博客部署目录 mkdir -p /home/git/www/hexo
git仓库目录 mkdir -p /home/git/repo/blog.git
git裸库初始化 cd /home/git/repo/blog.git && git init --bare 
仓库hooks设置 cd /home/git/repo/blog.git/hooks && touch post-receive && chmod +x post-revice
```

### post-receive添加脚本 
```sh
#!bin/sh
git --work-tree=/home/git/www/hexo --git-dir=/home/git/repo/blog.git  checkout -f
```
### 授权和ssh测试
> 复制本地端的公钥到远程服务器/home/git/authorized_keys中,测试是否能够免密登录远程 ssh -v git@ip_address
```sh
切换root exit 
chown -R git:git /home/git
chmod -R 755 /home/git/www/hexo 
```
### 禁用git的登陆权限
>为了安全考虑，禁用GIT用户的SHELL 登录权限配置,查看git-shell执行文件目录 which git-shell,修改/etc/passwd文件下git用户/bin/bash为git-shell执行文件目录。一般/bin/bash为/usr/bin/git-shell

## hexo自动化发布
> 为了方便，建立两个发布源 github和远程服务器

<img width="100%" src="/images/hexo-deploy.png" alt="hexo-deploy">


## 参考文献
> [关于git hooks](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90)
> [HEXO 部署到云服务器详细指南](https://www.jianshu.com/p/70bf58c48010)
> [配置SSH的正确方式](https://www.jianshu.com/p/1d67b764dfce)

