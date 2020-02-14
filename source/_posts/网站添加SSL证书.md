---
title: 网站添加SSL证书
date: 2020-02-13 15:47:46
tags: 
- https
categories:
- 前端
---
HTTP协议使用明文传输数据，访问网站会提示网站不安全字样，而HTTPS协议解决这一缺陷。HTTPS协议在HTTP协议的增加SSL协议（HTTPS=HTTP+SSL），SSL依靠证书来验证服务器的身份，并为浏览器和服务器之间的通信加密。
<!-- more -->

## 申请证书 
前往网站[https://homenew.console.aliyun.com/](https://homenew.console.aliyun.com/)搜索SSL证书，选择免费购买免费个人证书可获得一年免费SSL证书。

## 下载证书并上传到服务器
![ssl-download](/images/ssl-download.png)
> 新建目录 mkdir -p /etc/nginx/cert （位置随意）
> 上传文件 scp local_addr/*  server_user@ip_addr:/etc/nginx/cert/

## nginx开启https证书
编辑配置文件 (/etc/nginx/sites-available/default) 位置不定
配置文件有SSL的配置取消注释修改
```sh
# SSL configuration
listen 443 ssl default_server;
listen [::]:443 ssl default_server;
server_name domain_name #域名配置
ssl on; # 开启SSL
ssl_certificate  /etc/nginx/cert/a.pem; # 上传文件
ssl_certificate_key  /etc/nginx/cert/b.key; # 上传文件

# 后面复制即可
# ssl_session_cache    shared:SSL:1m;
ssl_session_timeout  5m;
ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
#ssl_ciphers  HIGH:!aNULL:!MD5;
ssl_prefer_server_ciphers  on;
```
## nginx端口重定向
HTTP协议默认端口80,HTTPS协议默认端口443
```sh
# 80端口重定向到443端口
server {
        listen 80;
        listen [::]:80;
        server_name domain_name;
        rewrite ^(.*)$ https://${server_name}$1 permanent; 
}
```
## 结语
配置完成之后重启nginx(nginx -s reload)。如果不能访问先不要慌，仔细排查是否配置出现问题，如果没有问题查看安全组规则是否开启（使用阿里云服务器经常会遇到这个问题）。

## 参考文献
> [阿里云配置HTTPS](https://juejin.im/post/5b88b58151882542db3bedf7)
> [阿里云nginx服务器如何配置ssl证书,让你的网站添加https](https://yq.aliyun.com/articles/707479)