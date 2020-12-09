---
title: chrome 开发者工具之 Console
date: 2020-12-09 11:12:54
tags:
  - js
categories:
  - Front
  - tool
---

---

```
java system.out.println('hello world')
python print('hello world')
js console.log('hello world')
```

> **`F12 或者 Control+Shift+i（PC 平台）/ Alt+Command+i（Mac 平台）打开我们的控制台`**

<!-- more -->

## console `API` 介绍

`JavaScript` 原生中默认是没有 `Console` 对象。是宿主对象提供的，也就是说 **`console` 是浏览器提供的内置对象。**
用于访问调试控制台, 在不同的浏览器里效果可能不同。
IE 低版本没有（当然你装了高版本，然后打开控制台他又能用 `console` 了）。

### 日志级别 `API`

提供了日志级别 `api`。可以方便我们根据类型，更快的定位需要关注的问题。

- `console.log('普通-文本')`与 `console.dir('普通-对象')`
  不同之处在于输出 `dom` 节点对象类型是会有一些差别。
- `console.info('信息')` `console.log` 的别名，输出信息，部分浏览器会增加一个蓝色标志。
- `console.warn('警告')` 黄色警告标识，也有堆栈信息。
- `console.error('错误')` 输出信息时，在最前面加一个红色的叉，表示出错，同时会显示错误发生的堆栈。
- `console.debug('调试')` 从 `Chromium 58` 开始，`Chromium` 浏览器只有勾选了控制台中的 `“Verbose”` 日志级别才可见。

支持多种写法

- 多参数
  - `console.log('auther:', 'lilnong.top')`
- <mark>`占位符格式，支持的占位符有：字符（%s）、整数（%d 或%i）、浮点数（%f）、可展开的 DOM（%o）、列出 DOM 的属性（%O）、根据提供的 css 样式格式化字符串（%c）`</mark>
  - `console.log('auther:%s', 'lilnong.top')`
  - `console.log('%cauther:%s', "color: red; font-size: 20px",'lilnong.top')`; 更适合封装起来使用。

### 功能性的 `API`

- `console.assert(location.protocol=='https:', "https 防止劫持哦~")` 接受两个参数，第一个参数是表达式，第二个参数是字符串。只有当第一个参数为 `false`，才会输出第二个参数，否则不会有任何结果。

- `console.clear()` 清除当前控制台的所有输出。

- `console.count('count')` 提供计数功能。比如说有个排序算法，我们想统计时间复杂度。
- `Console.countReset()` 我们也可以重置指定标签的计数器值。

- `console.group('第一层')`;`console.groupEnd()`; 提供将显示的信息分组功能，可以把信息进行折叠和展开。
- `console.groupCollapsed('第一层')`;`console.groupEnd()`; 同上，不同点是默认是折叠状态

- `console.table(arr)`; 提供将复合类型的数据转为表格显示。还可以进行排序等操作。

- `console.time('task');console.timeEnd('task')`; 提供了统计代码执行用时的功能。不准，波动会比较奇怪，多统计，然后求平均值吧
- `console.trace()`; 追踪函数的调用过程，也可以理解为把打印堆栈。

## `Console` 面板介绍

上面介绍了 `API`。接下来我们介绍一下面板的使用。

控制的是，级别筛选栏的隐藏与显示。

`messages` 是所有消息类型
`user messages` 是指所有用户日志，浏览器产生的不算。如下，产生的错误就不算

```
document.body.addEventListener('touchmove', (e)=>e.preventDefault())
// VM275:1 [Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive. See https://www.chromestatus.com/features/5093566007214080
```

- `errors` 是指错误级别的日志
- `warning` 是指警告级别的日志
- `info` 是指信息级别的日志
- `verbose` 是指调试级别的日志

清空当前面板内容。

- > 快捷键 `ctrl+l` 对应的命令是 `console.clear()`;

是指当前的作用域。如果有 iframe 的话，可以切换作用域为对应的 iframe。然后就可以快乐的在控制台调用 iframe 里面的变量了。

通过关键词过滤日志
描述有多少条记录被隐藏
设置功能，里面是一些控制开关。
