---
title: javascript实现最小堆
tags:
  - javascript
  - web
  - DataStruct
categories: web
abbrlink: 2316181141
date: 2020-04-21 23:28:42
---
在python可以使用heapq实现最小堆，通过列表初始化最小堆，就可以使用最小堆。但是在javascript最小堆就需要我们自己去实现。本次实践主要是看看python一行代码包含哪些知识点。
<!-- more -->
## 什么是最小堆
> 根结点的键值是所有堆结点键值中最小者的堆 

## 算法实现
左图为操作前，右图为操作后。
### 初始化
![heap1](heap1.png)
> 首先我们找到最后的一个节点的父节点(parent)，把当前parent的左右子节点取最小值(minNode)与父节点进行比较，如若小于父节点，调换最小子节点和父节点。 调换完成之后可能存在minNode的子节点比minNode小，所以minNode向下浮动。
### 插入元素
![push](push.png)
> 插入元素在最后一个位置进行插入，计算当前节点的父节点parent，比较parent与最小节点的大小，如若小于调换位置，parent继续计算上级父节点执行迭代操作
### 删除元素
![pop](pop.png)
> 储存第一个元素temp，调换最后为一个元素和第一个元素并删除最后一个元素。之后一个元素下浮。返回temp

## 实现功能
> 1. 通过数组初始化最小堆
> 2. 插入元素
> 3. 删除堆顶元素


### 通过数组初始化最小堆
```javascript
/**
 * @param {*} list  初始堆列表
 */
constructor(list) {
    this.list = list || [];
    this.build(this.list);
}
/**
 * 堆是否为空
 */
isEmpty() {
    if(this.list.length === 0) return true;
    else return false;
}
size() {
    return this.list.length;
}
build(list) {
    if(list.length === 0 || list.length === 1) return;
    else this.heapUp(); 
}
/**
 * 交换节点
 * @param {*} i 
 * @param {*} j 
 */
swap(i, j) {
    let list = this.list;
    [list[i], list[j]] = [list[j], list[i]];
}
/**
 * 获取最小子节点索引
 * @param {*} parent 父节点索引 
 */
minChildNode(parent) {
    let minIndex;
    let len = this.size();
    let list = this.list;
    if(parent * 2 + 2 < len) {
        minIndex = list[parent * 2 + 2] > list[parent * 2 + 1] ? parent * 2 + 1 : parent *2 + 2;
    } else {
        minIndex = parent * 2 + 1
    }
    return minIndex;
}
/**
 * 上浮
 */
heapUp() {
    let list = this.list;
    let len = this.size();
    let minIndex, parent;
    // 父节点
    parent = parseInt((len - 1) / 2);
    while(parent >= 0) {
        minIndex = this.minChildNode(parent);
        if(list[parent] > list[minIndex]) {
            this.swap(parent, minIndex);
            this.heapDown(minIndex);
        }
        parent --;
    }
}
/**
 * 下浮
 * @param {*} parent 
 */
heapDown(parent) {
    let list = this.list;
    let len = this.size();
    let minIndex;
    while(parent < len) {
        minIndex = this.minChildNode(parent);
        if(minIndex < len && list[parent] > list[minIndex]) {
            this.swap(parent, minIndex);   
            parent = minIndex;
        } else {
            break;
        }
    }
}
```

### 插入元素
```javascript
/**
 * 添加节点如最小堆
 * @param {*} node 
 */
push(node) {
    this.list.push(node);
    if(this.list.length === 1) {
        return;
    }
    let list = this.list;
    let current = this.list.length - 1, parent;
    while(current > 0) {
        parent = parseInt((current - 1) / 2);
        if(list[current] < list[parent]) {
            this.swap(current, parent);
            current = parent;
        } else {
            break;
        }
    }
}
```

### 删除元素
```javascript
/**
 * 弹出堆顶元素
 */
pop() {
    let list = this.list, temp;
    if(list.length === 0 || list.length == 1) {
        return list.pop();
    } else {
        list[0] = list[list.length - 1];
        temp = list.pop();
        this.heapDown(0);
        return temp;
    } 
}
   
```



## 参考文献
[维基百科](https://zh.wikipedia.org/wiki%E6%9C%80%E5%A4%A7%E2%80%94%E6%9C%80%E5%B0%8F%E5%A0%86)