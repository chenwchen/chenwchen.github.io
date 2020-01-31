# wchen 博客
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
>选择目录 mkdir blog_dir && cd blog_dir
> 初始化 hexo init
> 清理博客 hexo clean 
> 生成博客 hexo generate  || hexo g
> 开启服务 hexo serve || hexo s
> 发布github 修改站点_config.yml中deploy相应的内容后使用命令hexo deploy
> 集成命令 hexo clean && hexo g && hexo s
>```

4. 选择合适的主题下载到 ./themes/themes_name 修改站点_config.yml中theme为theme_name
5. [hexo-next主题的相关修改](https://theme-next.iissnan.com/getting-started.html)

## 感谢
> [hexo-theme-next](https://github.com/iissnan/hexo-theme-next)
> [live2d](https://github.com/xiazeyu/live2d-widget-models)
> [hexo官方文档](https://theme-next.iissnan.com/getting-started.htm)
> [APlayer](https://aplayer.js.org/#/zh-Hans/)