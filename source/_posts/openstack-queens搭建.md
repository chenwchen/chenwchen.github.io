---
title: openstack queens搭建
abbrlink: 1099219925
date: 2020-05-04 19:20:40
tags:
---
openstack各个组件的作用
> openstack是框架， 用户可以在上面定制你需要的服务

|组件|项目名|描述|
|:---|:--|:---|
|compute|Nova| 计算服务 （创建销毁虚拟机）
|Image Service|Glance| 镜像服务（不同镜像版本）
|Object storage|Swift| 对象储存
|Block storage|Cinder| 块存储
|Networking|Neutron| 网络服务 
|Dashboard|Horizon| 仪表盘
|Identity service|Keystone|认证服务
|Orchestration|Heat|编排
|Telemetry|Ceilometer| 监控（CPU利用率监控）
|Database Service|Trove|数据库服务
|Data processing|Sahara| 数据处理

<!-- more -->

# 环境
## 关闭防火墙、selinux
>  Permission denied: AH00072
```sh
systemctl disable firewalld 
sed -i 's/SELINUX=enforcing/SELINUX=disabled/' /etc/selinux/config
# 验证是否关闭
grep SELINUX=disabled /etc/selinux/config
setenforce 0
```

## 节点IP配置
> 注意配置前需要先设置静态IP地址
```sh
vim /etc/hosts
192.168.1.100  controller
192.168.1.101  computer
192.168.1.102  block
192.168.1.103  object001
192.168.1.104  object002
```

## 网络时间协议NTP(chrony)
```sh
yum install -y chrony 
/etc/chrony.conf  #添加配置
server NTP_SERVER iburst
allow 192.168.1.0/24  # 设置网段
# 自启和启动
systemctl enable chroyd
systemctl start chroyd
chronyc sources # 验证同步
```

## openstack软件包
```sh
yum search openstack  # 搜索openstack
yum install -y centos-release-openstack-queens  # 安装oepnstack
yum upgrade # 更新
yum install -y python-openstackclient # 安装openstack客户端
yum install -y openstack-selinux # 自动管理openstack的安全组策略
```

## SQL数据库
```sh
yum install -y mariadb mariadb-server python2-PyMySQL # 安装mariadb
vim /etc/my.conf.d/oepnstack.cnf  # 编辑并插入
# oepnstack.cnf
[mysqld]
bind-address = 10.0.0.11
default-storage-engine = innodb
innodb_file_per_table = on
max_connections = 4096
collation-server = utf8_general_ci
character-set-server = utf8
# 设置自启和启动
systemctl enable mariadb.service
systemctl start mariadb.service
mysql_secure_installation  # 选择适当密码，密码初始化为空  [123456]
```

## 消息队列
```sh
yum install -y rabbitmq-server
systemctl enable rabbitmq-service.serivice
systemctl start rabbitmq-server.service
rabbitmaqctl add_user openstack 123456  # 添加openstack用户 密码[123456]
rabbitmqctl set_permissions openstack ".*" ".*" ".*"  # openstack添加读写权限
```
 
## Memcached缓存令牌
```sh
yum install -y memcached python-memcached
vim  /etc/sysconfig/memcached
# memcached
OPTIONS="-l 127.0.0.1,::1,controller"
# 自启和启动
systemctl enable memcached.service
systemctl start memcached.service 
```
## 分布式可靠键值储存（Etcd）
```sh
yum install -y etcd
# cp /etc/etcd/etcd.conf /etc/etcd/etcd.conf.bak 备份
vim /etc/etcd/etcd.conf  # IP为控制节点
#[Member]
ETCD_DATA_DIR="/var/lib/etcd/default.etcd"
ETCD_LISTEN_PEER_URLS="http://192.168.1.100:2380"
ETCD_LISTEN_CLIENT_URLS="http://192.168.1.100:2379"
ETCD_NAME="controller"  
#[Clustering]
ETCD_INITIAL_ADVERTISE_PEER_URLS="http://192.168.1.100:2380"
ETCD_ADVERTISE_CLIENT_URLS="http://192.168.1.100:2379"
ETCD_INITIAL_CLUSTER="controller=http://192.168.1.100:2380"
ETCD_INITIAL_CLUSTER_TOKEN="etcd-cluster-01"
ETCD_INITIAL_CLUSTER_STATE="new"
# 设置自启并启动
systemctl enable etcd
systemctl start etcd
```


# keystone（Identity Serveice）安装配置
## 创建数据库和授权
```sh
mysql -u root -p   # 登录mysql
CREATE DATABASE  keystone # keystone数据库
# keystone数据的所有权限授权给keystone用户 密码[123456]
GRANT ALL PRIVILEGES ON keystone.* TO 'keystone'@'localhost' IDENTIFIED BY '123456';
MariaDB [(none)]> GRANT ALL PRIVILEGES ON keystone.* TO 'keystone'@'%' IDENTIFIED BY '123456';
openssl rand -hex 10 # 随机生成管理员令牌ADMIN_TOKEN  05d9bdf3dfd5196e6424
```

## keytone配置安装
```sh
yum install  -y oepnstack-keystone httpd mod_wsgi
vim /etc/keystone/keystone.conf
# keystone.conf
[DEFAULT] 
admin_token = ADMIN_TOKEN
[database]
connection = mysql+pymysql:keystone:123456@controller/keystone  # 配置数据库访问 123456为数据库密码 
[token]
provider = fernet # Fernet认证方式
# 填充身份到数据库
su -s /bin/sh -c "keystone-manage db_sync" keystone # 初始化身份认证服务的数据库
# 初始化fernet钥匙仓库
keystone-manage fernet_setup --keystone-user keystone --keystone-group keystone  
keystone-manage credential_setup --keystone-user keystone --keystone-group keystone
# 引导身份服务 
keystone-manage bootstrap --bootstrap-password 123456 \
  --bootstrap-admin-url http://controller:5000/v3/ \
  --bootstrap-internal-url http://controller:5000/v3/ \
  --bootstrap-public-url http://controller:5000/v3/ \
  --bootstrap-region-id RegionOne
```

## 配置apache http服务器
```sh
ServerName controller
# 软连
ln -s /usr/share/keystone/wsgi-keystone.conf /etc/httpd/conf.d/
# 启动httpd
systemctl enable httpd.service
systemctl start httpd.service
```


## 管理员账户环境变量
```sh
export OS_USERNAME=admin
export OS_PASSWORD=123456
export OS_PROJECT_NAME=admin
export OS_USER_DOMAIN_NAME=Default
export OS_PROJECT_DOMAIN_NAME=Default
export OS_AUTH_URL=http://controller:5000/v3
export OS_IDENTITY_API_VERSION=3 # 配置API版本
```

## 创建domain、project、user、role
```sh
# 创建example domain
openstack domain create --description "An Example Domain" example
# 创建service project
openstack project create --domain default --description "Service Project" service
# 创建demo project
openstack project create --domain default --description "Demo Project" demo
# 创建demo user
openstack user create --domain default --password-prompt demo # password [123456]
# 创建user角色
openstack role create user

```
<!-- ![project-user-role.png](project-user-role.png) -->

## 验证 keystone
```sh
unset OS_AUTH_URL OS_PASSWORD

openstack --os-auth-url http://controller:35357/v3 \
  --os-project-domain-name Default --os-user-domain-name Default \
  --os-project-name admin --os-username admin token issue
openstack --os-auth-url http://controller:5000/v3 \
  --os-project-domain-name Default --os-user-domain-name Default \
  --os-project-name demo --os-username demo token issue
```
## 创建脚本
```sh
# $CUSTOM自定义目录
# vim $CUSTOM/admin-openrc
export OS_PROJECT_DOMAIN_NAME=Default
export OS_USER_DOMAIN_NAME=Default
export OS_PROJECT_NAME=admin
export OS_USERNAME=admin
export OS_PASSWORD=123456
export OS_AUTH_URL=http://controller:5000/v3
export OS_IDENTITY_API_VERSION=3
export OS_IMAGE_API_VERSION=2
# vim $CUSTOM/demo-openrc
export OS_PROJECT_DOMAIN_NAME=Default
export OS_USER_DOMAIN_NAME=Default
export OS_PROJECT_NAME=demo
export OS_USERNAME=demo
export OS_PASSWORD=123456
export OS_AUTH_URL=http://controller:5000/v3
export OS_IDENTITY_API_VERSION=3
export OS_IMAGE_API_VERSION=2
```

# 安装glance (Image Service)

## 前提
```sh
mysql -u root -p
CREATE DATABASE glance;
# 授权 password [123456]
GRANT ALL PRIVILEGES ON glance.* TO 'glance'@'localhost' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON glance.* TO 'glance'@'%' IDENTIFIED BY '123456';
# 运行自定义脚本
source $CUSTOM/admin-openrc
# 创建glance用户 password[123456]
openstack user create --domain default --password-prompt glance
# 将管理员角色添加到glance项目中
openstack role add --project service --user glance admin
# 创建服务实体
openstack service create --name glance \
  --description "OpenStack Image" image
# 创建镜像服务API endpoints
openstack endpoint create --region RegionOne \
  image public http://controller:9292
openstack endpoint create --region RegionOne \
  image internal http://controller:9292
openstack endpoint create --region RegionOne \
  image admin http://controller:9292
```

## glance安装配置
```sh
yum install -y openstack-glance
vim /etc/glance/glance-api.conf
# glance-api.conf
[database]
# password [123456]
connection = mysql+pymysql://glance:123456S@controller/glance 

[keystone_authtoken]
# ...
auth_uri = http://controller:5000
auth_url = http://controller:5000
memcached_servers = controller:11211
auth_type = password
project_domain_name = Default
user_domain_name = Default
project_name = service
username = glance
password = GLANCE_PASS

[paste_deploy]
# ...
flavor = keystone
[glance_store]
# ...
stores = file,http
default_store = file
filesystem_store_datadir = /var/lib/glance/images/

vim  /etc/glance/glance-registry.conf
# glance-registry.conf
[database]
connection = mysql+pymysql://glance:GLANCE_DBPASS@controller/glance
[keystone_authtoken]
# ...
auth_uri = http://controller:5000
auth_url = http://controller:5000
memcached_servers = controller:11211
auth_type = password
project_domain_name = Default
user_domain_name = Default
project_name = service
username = glance
password = GLANCE_PASS

[paste_deploy]
# ...
flavor = keystone
# 填充数据库
su -s /bin/sh -c "glance-manage db_sync" glance
# 设置自启和启动
systemctl enable openstack-glance-api.service \
  openstack-glance-registry.service
systemctl start openstack-glance-api.service \
  openstack-glance-registry.service
```
## 验证glance
```sh
source admin-openrc
wget http://download.cirros-cloud.net/0.4.0/cirros-0.4.0-x86_64-disk.img

openstack image create "cirros" \
  --file cirros-0.4.0-x86_64-disk.img \
  --disk-format qcow2 --container-format bare \
  --public
# 查看镜像列表
openstack image list
```

# nova配置安装(compute)
## 前提
```sh
# 使用root用户连接数据库
mysql -u root -p
# 创建数据库
CREATE DATABASE nova_api;
CREATE DATABASE nova;
CREATE DATABASE nova_cell0;
# 授权
GRANT ALL PRIVILEGES ON nova_api.* TO 'nova'@'localhost' \
  IDENTIFIED BY 'NOVA_DBPASS';
GRANT ALL PRIVILEGES ON nova_api.* TO 'nova'@'%' \
  IDENTIFIED BY 'NOVA_DBPASS';

GRANT ALL PRIVILEGES ON nova.* TO 'nova'@'localhost' \
  IDENTIFIED BY 'NOVA_DBPASS';
GRANT ALL PRIVILEGES ON nova.* TO 'nova'@'%' \
  IDENTIFIED BY 'NOVA_DBPASS';

GRANT ALL PRIVILEGES ON nova_cell0.* TO 'nova'@'localhost' \
  IDENTIFIED BY 'NOVA_DBPASS';
GRANT ALL PRIVILEGES ON nova_cell0.* TO 'nova'@'%' \
  IDENTIFIED BY 'NOVA_DBPASS';
# 管理员
. admin-openrc
# 创建用户
openstack user create --domain default --password-prompt nova # password[123456]
# 添加管理员角色
openstack role add --project service --user nova admin
# 创建服务实体
openstack service create --name nova \
  --description "OpenStack Compute" compute
# 创建api endpoint
openstack endpoint create --region RegionOne \
  compute public http://controller:8774/v2.1

openstack endpoint create --region RegionOne \
  compute internal http://controller:8774/v2.1

openstack endpoint create --region RegionOne \
  compute internal http://controller:8774/v2.1
# 创建user placement
openstack user create --domain default --password-prompt placement
# 创建服务实体
openstack service create --name placement --description "Placement API" placement
# 创建api endpoint  
openstack endpoint create --region RegionOne placement public http://controller:8778 
openstack endpoint create --region RegionOne placement internal http://controller:8778 
openstack endpoint create --region RegionOne placement admin http://controller:8778
```
## 安装配置
```sh
# 安装
yum install openstack-nova-api openstack-nova-conductor \
  openstack-nova-console openstack-nova-novncproxy \
  openstack-nova-scheduler openstack-nova-placement-api
# 修改配置文件
vim /etc/nova/nova.conf
[DEFAULT]
# ...
enabled_apis = osapi_compute,metadata
[api_database]
# ...
connection = mysql+pymysql://nova:NOVA_DBPASS@controller/nova_api

[database]
# ...
connection = mysql+pymysql://nova:NOVA_DBPASS@controller/nova
[DEFAULT]
# ...
transport_url = rabbit://openstack:RABBIT_PASS@controller
[api]
# ...
auth_strategy = keystone

[keystone_authtoken]
# ...
auth_url = http://controller:5000/v3
memcached_servers = controller:11211
auth_type = password
project_domain_name = default
user_domain_name = default
project_name = service
username = nova
password = NOVA_PASS
```












