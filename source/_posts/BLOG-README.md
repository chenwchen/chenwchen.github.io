---
title: BLOG README
date: 2020-01-28 11:05:32
comments: false
categories: 
- node.js
tags:
- blog
- hexo
---
![wchen-blog](/images/wchen-blog.png)

## wchen blog
> https://chenwchen.github.io
> 本博客基于hexo博客框架，主题来源于githu开源主题[hexo-theme-next](https://github.com/iissnan/hexo-theme-next)
<!-- more -->
## 安装node.js(hexo是基于node.js的博客框架)

1. [安装node.js](https://nodejs.org/zh-cn/),下一步，下一步......
2. 验证安装,打开控制台（windows平台cmd）,键入npm -v，显示版本号为安装成功
3. 使用npm(nodejs包管理器)安装hexo

>```
> 全局安装和本地安装的区别:全局安装可以在命令可以在控制台直接使用
> cnpm安装 npm install -g cnpm --registry=https://registry.npm.taobao.org
> 全局安装 npm install -g plugin 
> 局部安装 npm install --save plugin
> 显示安装 npm list -g --depth 0 || npm list --depth 0
> 移除安装 npm remove -g plugin || npm remove plugin
> 更新npm npm install -g npm
> 一般使用淘宝进行cnpm安装（npm下载慢，容易被墙），只是为了通用例子使用npm
>```

4. hexo 命令使用

>``` 
> 全局安装hexo npm install -g hexo
> 选择目录 mkdir blog_dir && cd blog_dir
> 初始化 hexo init
> 清理博客 hexo clean 
> 生成博客 hexo generate  || hexo g
> 开启服务 hexo serve || hexo s
> 发布github 修改站点_config.yml中deploy相应的内容后使用命令hexo deploy
> 集成命令 hexo clean && hexo g && hexo s
>```

5. 选择合适的主题下载到 ./themes/themes_name 修改站点_config.yml中theme为theme_name
6. [hexo-next主题的相关修改](https://theme-next.iissnan.com/getting-started.html)

## 参考文献
> [hexo-theme-next](https://github.com/iissnan/hexo-theme-next)
> [live2d](https://github.com/xiazeyu/live2d-widget-models)
> [hexo官方文档](https://theme-next.iissnan.com/getting-started.htm)
> [hexo-next添加音乐播放器](https://yfzhou.coding.me/2018/08/08/Hexo-Next%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2%EF%BC%88%E6%B7%BB%E5%8A%A0%E7%BD%91%E9%A1%B5%E9%9F%B3%E4%B9%90%E6%92%AD%E6%94%BE%E5%99%A8%E5%8A%9F%E8%83%BD%EF%BC%89/)
> [代码复制](https://yfzhou.coding.me/2018/08/27/Hexo-Next%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2%EF%BC%88%E4%BB%A3%E7%A0%81%E5%9D%97%E5%A4%8D%E5%88%B6%E5%8A%9F%E8%83%BD%EF%BC%89/)