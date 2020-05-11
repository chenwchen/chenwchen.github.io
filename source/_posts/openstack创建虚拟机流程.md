---
title: openstack创建虚拟机流程
tags: cloud computing
categories: openstack
abbrlink: 3642561074
date: 2020-05-11 13:55:07
---

<style> 
    img {
        width: 100%;
    }
</style>
在初学openstack的时候， 总搞不懂openstack到底是干什么的？ 通过学习openstack创建虚拟机的流程， 意在了解虚拟机创建过程中各个组件之间的协调工作， 加深对openstack有清晰的结构。 该文章属于转载文章， 对其中一些不清楚的概念进行补充， 主要分为两部分， 第一部分创建虚拟机过程中的数据流向（整体架构），第二部分是虚拟机创建过程的各个部分的详细解说（部分架构）
<!-- more -->

# 阶段解释
![1.png](1.png)

1. 登录界面或命令通过RESTful API 向keystone获取认证信息
2. keystone通过用户的认证请求信息， 并生成auth-token返回给对应的认证请求
3. 界面或命令行通过RESTful API向nova-api发送一个boot instance请求（携带auth-token）
4. nova-api接受请求后向keystone发送认证请求， 查看token是否为有效用户和token
5. keystone验证token是否有效，如有效则返回有效的认证的角色（注： 有些操	作需要角色权限才能操作）
6. 认证通过后nova-api和数据库通讯
7. 初始化新建虚拟机的数据库记录
8. nova-api通过rpc.call向nova-scheduler请求是否有创建虚拟机的资源（HOST ID）
9. nova-scheduler进程侦听消息队列， 获取nova-api的请求
10. nova-scheduler通过查询nova数据库中计算机资源情况， 并通过调度算法计算符合虚拟机创建需要的主机
11. 对于符合虚拟机创建的主机， nova-scheduler更新数据库中虚拟机对应的物理主机信息
12. nova-scheduler通过rpc.cast向nova-compute发送对应的创建虚拟机请求信息
13. nova-compute会从对应的消息队列中获取创建虚拟机请求的消息。
14. nova-compute通过rpc.call向nova-conductor请求获取虚拟机信息（Flvor）
15. nova-conductor从消息队列中拿到nova-compute请求信息
16. nova-ocnductor根据信息查询虚拟机对应信息
17. nova-conductor从数据库中获取信息
18. nova-conductor吧虚拟机信息通过消息的方式发送给消息队列中
19. nova-compute从对应的消息队列中获取虚拟机信息消息。
20. nova-compute通过keysotne的RESTful API拿到认证的token， 并通过HTTP请求glance-api获取创建拟机所需的镜像
21. glance-api向keystone认证token是否有效， 并返回验证结果
22. token验证通过， nova-compute获取虚拟机镜像信息（URL）
23. nova-compute通过keystone的RESTful拿到验证的token， 并通过HTTP请去neutron-server获取创建拟机所需的网络信息
24. neutron-server向keystone认证token是否有效， 听返回验证结果
25. token验证通过后， nova-compute获取虚拟机网络信息
26. nova-compute通过keystone的RESTful API 拿到认证的token，并通过HTTP请求cinder-api获取创建拟机所需的持久化储存信息
27. cinder-api想keystone验证token是否有效， 并返回验证结果
28. token验证通过， nova-compute获取虚拟机持久化存储信息
29. nova-compute根据instace的信息调用配置虚拟化驱动来创建虚拟机

注：
> * cast方式的远程调用，请求发送后就直接回了；call方式远程调用，需要等响应从服务返回 
> * nova-conductor 的作用是nova-compute和数据库之间建立桥梁， 提高全性
> * libvirt是用于管理kvm， quem， xen等提供的API


# 部分架构
## 从novaclient到nova-api
创建虚拟机一般是从界面或命令行发出请求开始的，两种方式都会借助novaclient向nova-api发出HTTP请求。nova-api暴露了一组RESTful的API，以接受novaclient发出的各种请求。创建虚拟机时需要向{your_compute_service_url}/servers发送POST请求。在使用命令行创建时可使用“--debug”选项来跟踪这些HTTP请求，如使用nova --debug boot。
![2.png](2.png)

为了保证对OpenStack各个服务的安全访问，在请求创建虚拟机之前，novaclient会先向Keystone发送用户的用户名、密码、域名信息来申请一个有效的token，之后向nova-api发送请求的头部就会带有token信息。nova-api收到请求后会向Keystone验证token的有效性，token验证通过后，nova-api会向数据库写入虚拟机的初始数据。Keystone在验证token时，会先去缓存数据库memcached中查找，若缓存未命中再去数据库中的token表查找对应记录。由于OpenStack各个组件之间都需要token验证，并且token存在有效期，过期的token不会自动清理，所以随着时间的增长token表的记录会越来越多，那么在查询token表时就可能存在慢查询。除了使用memcached做缓存之外，我们还可以使用keystone-manage token_flush对token表做定期清理，避免数据库慢查询。

## 从nova-api到nova-compute

nova-api工作结束后会向nova-conductor发起RPC请求，请求创建虚拟机。nova-conductor是nova-compute和数据库之间的桥梁，它可以防止nova-compute直接访问数据库，从而提高对数据库访问的安全性。随着nova-conductor功能的完善，它也接管了nova-compute中一些耗时较长的任务，如build_instances、resize_instance、live_migrate_instance等。
![3.png](3.png)

nova-conductor收到请求后首先以rpc.call的方式请求nova-scheduler完成虚拟机创建的调度工作。nova-scheduler使用过滤和权重计算的方法来选定创建虚拟机的主机，过滤器和权重计算方法可以在nova.conf中配置。nova-scheduler自己会维护一份计算节点数据，并根数据库中对比。调度完成后将选定的host返回给nova-conductor，由nova-conductor向nova-compute发起rpc.cast的创建请求。
一般来说，OpenStack各个组件之间会通过RESTful API进行通信，而组件内部的各个服务进程之间则是通过基于AMPQ的RPC方式进行通信。RPC方式又分为两种，rpc.cast和rpc.call，rpc.call为request/response方式，多用于同步场景；而使用rpc.cast方式发出请求后则无需一直等待响应，但之后需要定期查询执行结果，一般用于异步场景。实现RPC通信还需借助消息队列，OpenStack将其使用的通信方式都封装在公有库oslo_messaging中，目前支持的消息队列包括Rabbitmq、Zeromq、Kafka等。
以nova-api和nova-conductor之间的通信为例。nova-conductor服务在启动时会注册一个RPC server等待处理请求，nova-api发送创建虚拟机的rpc请求时会先创建一个topic publisher用于话题发布，发布的topic为conductor，method为build_instance，然后publisher将消息发送给话题交换器，话题交换器再根据routing_key转发给绑定的消息队列，最后由topic consumer接收并调用nova-conductor manager中的build_instance方法处理
![4.ping](4.png)


创建虚拟机过程中的所有HTTP请求和RPC请求均会占用服务器的TCP连接数。一般来说，作为客户端的TCP连接数最大为65535个，但也会受到内存、文件描述符等因素的影响，所以为保证正常创建虚拟机，可以使用监控工具来监控服务器的资源或进行TCP连接的调优。
## 从nova-compute到Hypervisor
nova-compute收到请求后再分别调用glanceclient、neutronclient和cinderclient向glance、neutron、cinder获取创建虚拟机的镜像、网络、存储信息，认证过程与nova-api类似。

![5.png](5.png)

此时虚拟机的vm_state为Building，虚拟机还只存在于数据库中，完成最后的创建还要交给Hypervisor。OpenStack支持的Hypervisor包括Libvirt、hyperv、xen、vmware等，其中对libvirt管理的KVM的支持性最好，这也是OpenStack默认的hypervisor。当libvirt收到创建请求时，会拉取镜像创建根存储、根据请求中的虚拟机信息生成xml文件，再根据xml文件创建网络（如ovs上创建端口）、define domain、start domain等，直到libvirt检测到虚拟机状态为running则创建成功。
当OpenStack使用Ceph共享存储时，镜像无需下载到本地再上传到后端，而是直接使用clone，配合Ceph支持的COW技术几乎可以完成虚拟机的秒级启动。前提是使用raw格式的镜像，因为Ceph不支持从qcow2的镜像引导，若使用qcow2镜像创建虚拟机，则需要将镜像下载到本地转换成raw格式再上传，不仅增加启动时间，而且还可能因为空间不足无法完成镜像的格式转换从而造成虚拟机启动失败，所以建议直接使用raw格式的镜像创建虚拟机。
为避免创建过程中服务的单点故障，建议使用keepalived+haproxy的方式实现OpenStack各个服务的高可用。
结束语
创建虚拟机是OpenStack的基本功能，掌握整个虚拟机的创建流程，有助于理解OpenStack各个组件以及组件内部的通信过程，同时，对理解虚拟机的其他操作流程也有很大帮助。同时，对于OpenStack运维人员来说，掌握虚拟机几个核心操作的流程，可以帮助我们在遇到类似虚拟机创建错误等问题时进行快速定位。

# 参考文献
> https://www.cnblogs.com/girl1314/p/10647168.html
https://blog.csdn.net/dylloveyou/article/details/78587308
https://www.cnblogs.com/chris-cp/p/6678719.html


