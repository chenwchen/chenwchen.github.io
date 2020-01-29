## 保存博客文件
博文发布（hexo deploy）后，只把public文件夹下的内容发布到仓库里。如果出现一些意外情况，导致博客文件损坏，这就糟糕了。这个时候我们可以新建一个仓库储存博客文件，但是这里我们讨论这种方法，我们在该仓库下建立一个分支，用于储存文件。

## 初始化博客
> cd blog_dir
> git init 

## 编写.gitignore
> .DS_Store
> Thumbs.db
> db.json
> *.log
> public/
> .deploy*/

## 添加远程
> git remote add origin blog_git_address

## 添加到推动
> git add .
> git commit -m "init"
> git push -f master:remote_branch