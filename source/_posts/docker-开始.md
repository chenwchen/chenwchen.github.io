---
title: docker 开始
abbrlink: 102226629
date: 2020-05-14 12:21:36
tags: 
    - docker
    - cloud computing
    - container
categories: CloudComputing
---
> docker container 是一种内核虚拟化技术， 可以提供轻量级的虚拟化， 以便隔离进程和资源
> docker是Paas提供商dotcould开源的一个基于LXC的高级容器引擎， 源代码托管在github上，基于go语言的并遵从Apache2.0开源协议
> Docker设想是交互运行环境如同海运， OS如同一个货轮， 每一个在OS基础上的软件都如同一个集装箱， 用户可以通过标准换手段自由封装运行环境， 同时集装箱的内容可以由用户自定义， 也可以由专业人员制造。
<!-- more -->
# 初识Docker
## 开发过程中的环境
> 开发环境    开发人员
> 测试环境    测试人员
> 生产环境    运维人员
> 代码”水土“不服，由于环境不同造成，docker使用容器的概念把环境和代码都进行打包。规避软件跨环境迁移问题

![1.png](1.png)
## 概念
1. Docker是一个开源的应用容器引擎
2. 诞生于2013初，基于Go语言，dotCloud公司出品（后改名为Docker Inc）
3. Docker可以让开发这打包他们的引用以及依赖包到一个轻量级，可移植的容器中，然后发布到任何流行的Linux机器上。
4. 容器时完全使用沙箱机制，相互隔离
5. 容器性能开销极低

## Docker安装
> 一键脚本： https://get.docker.com/   ||   https://test.docker.com/
wget -O get-docker.sh  https://get.docker.com && sh get-docker.sh

## Docker架构
<!-- ![2.png](2.png) -->
<img src="2.png" width="50%">

> 镜像：(Image) Docker镜像（Image），相当于是一个root问及那系统，比如官方镜像ubuntu16.0.4就包含完整的ubuntu16.0.4的最小系统的root文件系统
> 容器：(container) 镜像和容器的关系就像镜像是静态当以而容器时镜像运行的实体，容器可以被创建、删除、停止、暂停、删除等
> 仓库：(respository)仓库可看成代码控制中心用来保存镜像

# Docker命令操作
## 守护进程
```sh
systemctl status docker      # 服务状态
systemctl restart docker     # 重启
systemctl  start  docker     # 开启
systemctl stop docker        # 停止
systemctl enable docker      # 开机自启
```
> 注意： ubuntu可以使用systemctl或者使用service
		
## 镜像部分
```sh
docker imges           # 查看                      
docker search  image   # 搜索  
# 拉取
docker pull image[:version]               
    docker image centos:7
    docker image mysql:5.7
    docker image redis
# 删除  
docker rmi image[:version]               
   docker rmi mysql:5.7
   docker rmi `docker image -aq`    # 删除全部镜像
```
## 容器部分
### 查看容器状态
```sh
# 参数
    # -a: 显示所有的容器，包括未运行的。
    # -f: 根据条件过滤显示的内容。
    # --format: 指定返回值的模板文件。
    # -l: 显示最近创建的容器。
    # -n: 列出最近创建的n个容器
    # --no-trunc: 不截断输出
    # -q: 静默模式，只显示容器编号
    # -s: 显示总的文件大小
docker ps -a
```
### 创建容器   
```sh
# 参数  
    # -i  : 以交互模式运行容器，通常与 -t 同时使用
    # -t : 为容器重新分配一个伪输入终端，通常与 -i 同时使用
    # -h "mars": 指定容器的hostname
    # --name=container_name:  为容器指定一个名称
    # --volume,-v: 绑定一个卷
    # -P: 随机端口映射，容器内部端口随机映射到主机的高端口
    # -p: 指定端口映射，格式为：主机(宿主)端口:容器端口
# 前台(前台需要分配终端，退出即停止)
docker run -it --name=centos-docker -h centos-docker centos:7  /bin/bash  
docker run -id --name=centos-docker -h centos-docker centos:7   # 后台  
# 创建容器不运行
docker create -i --name=centos-docker -h centos-docker centos:7
```
### 进入容器
```sh
# 参数
    # -d :分离模式: 在后台运行
    # -i :即使没有附加也保持STDIN 打开
    # -t :分配一个伪终端
docker exec -it container-name /bin/bash     
exit    # 退出 
# 启动/停止/重启                   
docker start/stop/restart container_name  
# 查看容器映射端口
docker port container_name
```
### 容器提交生成镜像
```sh
# 参数
    # -a: 提交的镜像作者
    # -c: 使用Dockerfile指令来创建镜像
    # -m: 提交时的说明文字
    # -p: 在commit时，将容器暂停
docker commit container_name
```
### 容器数据复制
```
docker cp local_path container_name:PATH
```
### 删除容器
```sh
# 参数
    # -f: 通过 SIGKILL 信号强制删除一个运行中的容器。
    # -l: 移除容器间的网络连接，而非容器本身。
    # -v: 删除与容器关联的卷。
docker rm container_name  
docker rm `docker ps -aq`  # 删除全部    
```
### 容器导出导入
```sh
# 从容器中导出归档文件
docker export -o PATH/new_image.tar new_container
# 镜像的导入导出
docker save -o PATH/new_image.tar new_container
docker load -i PATH/new_image.tar new_image # 结合save 使用
```

### 查看相关信息
```sh
# 显示 Docker 系统信息，包括镜像和容器数
docker info 
# 显示版本信息
docker version
# 查看容器元数据信息
docker inspect container_name
```

### 通过Dockerfile创建
> 会抽出单独一章节来讲
```sh
# 有语法错误时会返回
docker build -t test/myapp .
# 通过 -f Dockerfile 文件的位置
docker build -f /path/to/a/Dockerfile .
```
## 数据卷部分
![6.png](6.png)
> 数据卷是宿主机文件，docker容器内文件挂载到宿主机目录下，实现数据之间的共享。可以通过不      同容器绑定同一个数据卷来实现容器的数据交换。

### 创建数据卷(只需创建实例添加-v命令)
```sh
docker run -it --name=c1 v:/root/data:/root/docker centos:7 /bin/bash
```
### 数据卷容器
```sh
# 创建数据卷容器  
docker run -it --name=c3  -v ~/data:/root/c3  centos:7 /bin/bash
# 创建c1、c2容器，通过--volumes-from设置数据卷
docker run -it --name=c1 -volumes-from c3 centos:7 /bin/bash
docker run -it --name=c2 -volumes-from c3 centos:7 /bin/bash
```

# 参考文献
> https://www.runoob.com/docker
	

