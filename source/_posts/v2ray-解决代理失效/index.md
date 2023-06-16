---
title: v2ray-Mac升级后导致导致代理失效
date: 2023-06-16 10:03:39
tags:
 - issues
categories:
 - Software
 - issues
---

V2Ray之前运行好好的，升级后突然代理失效，日志也不打印了，重启也不行，重装也不行。

最后晚上搜索了各种解决方法，终于找到了[解决办法](https://zhuanlan.zhihu.com/p/355204476)。

运行这两条指令：

```bash
rm -rf ~/Library/LaunchAgents/yanue.v2rayu.v2ray-core.plist
rm -rf ~/Library/Preferences/net.yanue.V2rayU.plist

```

V2RayU的配置都搞在这俩文件里面，卸载应用的时候，不会自动把它俩删了，导致卸载不干净，重装不起作用。

删除后需要重新配置订阅信息，然后重启V2RayU，就可以了。