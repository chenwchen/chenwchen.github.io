---
title: Linux用户管理
tags:
  - Linux
categories:
  - Linux
abbrlink: 4012342053
date: 2020-02-15 22:31:10
---
<style>
	th:first-child{
		width: 20%;
	}
	th:not(:first-child){
		width: 40%;
	}
</style>
用户管理是Linux系统工作重要的一环，用户管理包括用户与组账号的管理。所谓账号管理，是指账号的新增、删除和修改、账号规划以及权限的授予等问题。
<!-- more -->
## 用户管理命令

命令|描述|常用命令
----|---|----
useradd|用户添加|useradd -d userdir username
adduser|用户提示输入|adduser username
usermod|对useradd产生的重新设置|usermod -s shell
userdel|删除用户|userdel -r username
groupadd|组添加|groupadd groupname
groupmod|对组修改|
groupdel|删除组|groupdel username
id|显示用户当前的uid、gid和用户所属的组列表|id username
w/who|显示登录用户及相关信息|w username,who
su|切换用户|su username
sudo|普通用户执行管理员命令|sudo command
newusers/chpasswd|成批添加用户/密码|newusers \< users/ chpasswd \< passwds

## 用户配置文件
> 账号信息 /etc/passwd (user:passwd:UID:GID:comment:DIR:shell)
> 口令文件 /etc/shadow (user:passwd:::::::)

## 用户CURD
用户目录文件 /home/dir 或 /root,shell文件 /bin/shell 或 /bin/bash
```sh
# 添加用户
useradd -d<dirname> -s<shellname> -g<GID> -c<comment> -u<UID> -e<expired> username
adduser username # 提示输入
# 修改密码
passwd username 
# 切换用户
su username
# 查看当前用户
who
w username 
finger username
who -uH # 显示当前用户包括标题
# 修改用户
usermod -d<dirname> -s<shellname> -g<GID> -c<comment> -u<UID> -e<expired> username
usermod -l old_username new_username # 重命名用户
# 删除用户
userdel username
userdel -r username # 删除用户目录
```
## 用户组配置文件
> /etc/group  groupname:passwd:groupid:users

## 用户组CRUD
```sh
## 添加用户组
groupadd groupname
## 重命名用户组
groupmod -n old_groupname new_groupname
## 删除用户组
groupdel groupname
```
### 用户和组信息
> id username

## 权限命令
* ```chmod```:改变文件或目录权限
* ```chown```:改变文件或目录的属主（所有者），chown -R dir username
* ```chgrp```:改变文件或目录所属的组
* ```umask```:设置文件的缺省生成掩码

## 文件权限
![permission](/images/permission.png)
```sh
root@root:~# ll
total 43
drwx------  19 root root  4096 Feb 15 20:34 ./
drwxr-xr-x  22 root root  4096 Feb  3 22:10 ../
-rw-------   1 root root 30166 Feb 15 23:09 .bash_history
-rw-r--r--   1 root root  3188 Oct 10 10:26 .bashrc
```

权限	|二进制 / 八进制|描述
----|-----|-
---	|000 / 0|无权限
--x	|001 / 1|只有执行权限
-w-	|010 / 2|只有写入权限
-wx	|011 / 3|写和执行权限
r--	|100 / 4|读权限
r-x	|101 / 5|读取和执行的权限
rw-	|110 / 6|读取的写入的权限
rwx	|111 / 7|所有权限

> 例子 # ---------- 1 root root 0 Feb 17 18:43 ./file.txt

```sh
# -rwxrwxrwx 1 root root 0 Feb 17 18:43 ./file.txt
chmod 777 file.txt
#-rw-rw-rw- 1 root root 0 Feb 17 18:43 ./file.txt
chmod -x file.txt 或 chmod 666 file.txt
#--w--w--w- 1 root root 0 Feb 17 18:43 ./file.txt
chmod -r file.txt 或 chmod 222 file.txt
#-rwxr-xr-x 1 root root 0 Feb 17 18:43 ./file.txt*
chmod 755 ./file.txt
```
## 用户目录
> 目录拥有者 chown -R dir username

## 参考文献
> [Linux用户和权限管理看了你就会用啦](Linux用户和权限管理看了你就会用啦)
> [理解Linux文件权限](https://www.jianshu.com/p/8566a74e77be)