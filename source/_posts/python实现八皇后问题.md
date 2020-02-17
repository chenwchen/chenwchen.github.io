---
title: python实现八皇后问题
tags:
  - python
  - 算法
categories:
  - python
abbrlink: 2000091492
date: 2019-08-08 00:48:56
---


## 使用生成器

```python
def queens(num=8, state=()):
    for pos in range(num):
        if not conflict(state, pos):
            if len(state) == num-1:
                yield (pos,)
            else:
                for result in queens(num, state + (pos,)):
                    yield (pos,) + result 
                    
def conflict(state, nextX):
    nextY = len(state)
    for i in range(nextY):
        if abs(state[i] - nextX) in (0, nextY - i):
            '''利用等腰直角三角形的两边相等'''
            return True
    return False

for reslist in queens():
    print(reslist)
```
<!-- more -->

##使用压栈回溯
```python
def queens(state = [],num=8):
    for col in range(num):
        if not isconflict(state,col):
            '''压栈'''
            state.append(col)
            if len(state) == num:
                print(state)
            queens(state)
    if state:
        '''弹出栈'''
        state.pop()
 
def isconflict(state,col):
    row = len(state)
    for i in range(row):
        if abs(state[i] - col) in (0, row - i):
            return True
    return False
```

