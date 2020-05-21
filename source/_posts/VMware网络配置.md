---
title: VMware网络配置
tags: VMware
categories: VM
abbrlink: 2469974346
date: 2020-05-21 19:14:59
---

VMware网络模式有桥接模式、NAT模式和仅主机模式，不同的模式对应的功能有所不同， 联网方式也有所不同。 
> 桥接模式： 物理机和虚拟机属于同一个局域网
> NAT模式： 物理机充当虚拟机的路由
> 仅主机模式： 物理机和虚拟机直连
> 虚拟网卡:  用于与物理机之间的通信
> 仅主机模式： Vmware Network Adapter VMnet1
> NAT模式： Vmware Network Adapter VMnet8
<!-- more -->

<style> 
    img {
        width: 100%;
    }
</style>
# 模式图解
## 桥接模式
![](2.png)

## NAT模式
![](3.png)

> Vmware Network Adapter VMnet8的作用： 主机与虚拟机之间的通信， 如果禁用不会影响虚拟机联网， 但是主机无法与虚拟机之间进行通信。 Vmware Network Adapter VMnet8是要和虚拟机同一个网段， 不然找不到虚拟机网段。

## 仅主机模式
![](4.png)

# 网络设置
## 本机网络配置 
> 控制面板\网络和 Internet\网络连接

![](5.png)

## 网络模式选择
vmware软件/虚拟机/设置/网络适配器
![](6.png)

## 虚拟网络编辑器
> vmware软件/虚拟网络编辑器

![](7.png)
## 虚拟机网卡信息
```sh
 /etc/sysconfig/network-scripts/ifcfg-ens33
TYPE=Ethernet  # 网卡类型
PROXY_METHOD=“none” # 代理方式，默认为关闭状态
BROWSER_ONLY=“no” # 只是浏览器
BOOTPROTO=”dhcp“ # 网卡引导协议
DEFAULT=“no”  # 默认路由
IPV4_FAILURE=“no” # 是不是开启IPV4致命检测
IPV6INIT="YES" # IPV6初始化
IPV6_AUTOCONF=“yes”  #IPV6是否自动配置
IPV6_DEFAULT=”YES“  #IPV6是否为默认路由
IPV6_FAILURE_FATAL=“no” # 是不是开启IPV6知名错误
NAME=“ens33“  # 物理网卡名称
UUID  # 通用唯一标识码
DEVICE=”ens33“  # 网卡设备名称，必须和NAME一致
ONBOOT=“yes”  是否开机启动，是否能通过systemctl start network启动
```
## 测试
```sh
联网测试   ping 8.8.8.8 -c 4
域名服务   ping www.baidu.com -c 4
重启网络   systemctl restart network
```
# 联网设置
## 桥接模式
> 网络模式选择 -> 编辑/虚拟网络编辑器/桥接模式/桥接至联网网卡

![](8.png)
> 注意如果桥接网络选项没有需要的网络适配器， 需要对该网络适配器的属性中勾选 Vmware Bridge Protocol 之后重新选择
### 虚拟机网卡
![](9.png)
### 路由器信息
![](10.png)
> 注意 无线网络路由器中没有虚拟机IP的信息

## NAT模式
> 网络模式选择 -> 编辑/虚拟网络编辑器

![](11.png)
![](12.png)

### 虚拟机静态IP设置
![](14.png)

## 仅主机模式
> 仅主机模式和NAT模式类似， 没有NAT设备， 网络通过共享主机网络。

![](15.png)
![](16.png)




# SSH配置
> 由于本人使用的是终端模式，没有使用可视化界面，让界面看着很难受。所以配置了一下ssh，使
用其他的ssh终端来减轻自己的痛苦。
```sh
yum list | grep openssh   # 查看是否安装openssh
netstat -ant | grep 22    # 查看服务是否启动
yum install -y openssh    # 安装openssh
systemctl restart sshd    # 启动ssh服务
```

总结
> 对于这篇文章对于我来说感触颇多， 在测试仅主机模式的时候， 虚拟机一直无法连接外网虚拟机重装了三四次！ 问题非常奇怪， 主机能ping通虚拟机， 虚拟机能ping同网关，网络共享正常。 感觉一切都很ok。 配置文件我一项一项地对照其他博文不停的修修改改，每一项都改了七八遍左右，网络一直不通。 很难受， 最后神奇的事情发生了，我的网络突然能连接外网了, 哎…..

参考文献
> https://www.xinruiyun.cn/nat/1753.html
> https://blog.csdn.net/zhang_xinxiu/article/details/84404848
> https://blog.csdn.net/cckevincyh/article/details/80543510
> https://www.cnblogs.com/fun0623/p/4744797.html
> https://blog.csdn.net/qq_41395106/article/details/89027987
