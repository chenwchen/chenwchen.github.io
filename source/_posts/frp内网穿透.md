---
title: FRP内网穿透
tags:
  - Linux
  - 内网穿透
  - windows
categories:
  - server
abbrlink: 918088272
date: 2020-02-09 13:48:06
---
frp（fast-reserve-proxy） 是一个可用于内网穿透的高性能的反向代理应用，支持 tcp, udp 协议，为 http 和 https 应用协议提供了额外的能力，且尝试性支持了点对点穿透。 \([官方文档](https://github.com/fatedier/frp/blob/master/README_zh.md)\)
<!-- more -->

## 架构
<img  width="100%" src="/images/frp.png" alt="frp">

## 准备
> 公网服务器（阿里云服务器）
> 内网服务器(本地客服端)
### 域名配置
> 购买域名
> 域名解析

![dns](/images/dns.png)

### windows开启openssh 
> 开启Windows中ssh服务 net start sshd
> 关闭Windows中ssh服务 net stop sshd
> 查看用户 net user
> 测试登录 ssh -p port_number user@localhost

## 下载(https://github.com/fatedier/frp/releases)
下载后两端文件目录结构差不多，公网服务器端需要文件frps.ini、frps 和sytemd，内网服务端 frpc.ini、frpc、systemd,其余文件可以删除。
> 本地端 windows[直接下载](https://github.com/fatedier/frp/releases/download/v0.31.2/frp_0.31.2_windows_amd64.zip)
> 服务端 wget https://github.com/fatedier/frp/releases/download/v0.31.2/frp_0.31.2_linux_amd64.tar.gz && mkdir -p /usr/local/frp && tar -zxvf frp_0.31.2_linux_amd64.tar.gz -C /usr/local/frp

## 修改配置文件
注意阿里云服务器需要配置阿里云安全组规则
### ssh配置
配置完成后[启动服务](#启动),在使用命令ssh -oPort=6000 user@public_addr测试配置成功
```sh
# frps.ini
[common]
bind_port = 7000 #绑定端口

# frpc.ini
[common]
server_addr = x.x.x.x #公网服务器地址
server_port = 7000 #服务器绑定的端口

# ssh conf
[ssh]
type = tcp #服务类型
local_ip = 127.0.0.1 #本地地址
local_port = 22 #绑定本地地址
remote_port = 6000 #远程地址
```

### DDNS配置
动态域名配置需要关于域名的相关[域名配置](#域名配置)，配置完成之后把域名对应填入custom_domains
```sh
# frps.ini
[common]
bind_port = 7000
vhost_http_port = 8080 # 访问公网8080端口映射到内网80端口

# frpc.ini
[common]
server_addr = x.x.x.x
server_port = 7000

# web conf
[web]
type = http  # http协议
local_port = 80   # 内网服务器端口
custom_domains = www.yourdomain.com # 配置域名指向公网服务器，必须已经备案
```


## 启动
> 公网服务器 cd /usr/local/frp && ./frps -c ./frps.ini
> 内网服务器 cd install_addr && frpc -c ./frpc.ini

## 配置服务
> 公网服务器 nohup ./frps -c frps.ini >/dev/null 2>&1 &
> >/dev/null 2>&1 &  表示丢弃
### 内网服务器 
* linunx  nohup ./frpc -c frpc.ini >/dev/null 2>&1 &
* win10 https://lo-li.cn/239

## 访问
根据上面配置端口访问，端口自定义，注意安全组规则需要配置
> ssh访问 ssh -p 7000 user_name@x.x.x.x
> web访问 www.yourdomain.com:8080

### ERR_UNSAFE_PORT错误
6666-6669这几个端口是IRC(Internet Relay Chat)协议使用的缺省端口，存在很大的安全风险，出于安全考虑，Chrome、Firefox都禁止了对6666端口的访问。

## 参考文献
> [frp官方参考文献](https://github.com/fatedier/frp/blob/master/README_zh.md)
> [十分钟教你配置frp实现内网穿透](https://blog.csdn.net/u013144287/article/details/78589643/)
> [ERR_UNSAFE_PORT](https://www.applenice.net/2019/06/04/ERR-UNSAFE-PORT-On-Browser/)