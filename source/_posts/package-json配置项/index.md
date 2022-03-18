---
title: package.json配置项
date: 2022-03-16 14:24:04
tags:
  - npm
categories:
  - Front
  - tool
---

> [ _`npmjs` _](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)

{% asset_img pkg.png %}

<!-- more -->

<details><summary><b>👋 PlantUML</b></summary>

```plantuml

@startmindmap
* package.json

left side

 * 必须属性
  * name
   *_ 名称
  * version
   *_ 版本号

 * 描述属性
  * description
   *_ 描述信息
  * keywords
   *_ 关键词
  * author
   *_ 作者
  * contributors
   *_ 贡献者
  * homepage
   *_ 主页
  * repository
   *_ 仓库
  * bugs
   *_ Bug反馈地址

 * 依赖配置
  * dependencies
   *_ 生产环境依赖
  * devDependencies
   *_ 开发环境依赖
  * peerDependencies
   *_ 兼容依赖
  * optionalDependencies
   *_ 不阻断安装依赖
  * bundledDependencies
   *_ 打包依赖
  * engines
   *_ 版本要求

 * 脚本配置
  * scripts
  * config

right side

 * 文件&目录
  * main
   *_ 程序入口
  * browser
   *_ 程序入口
  * module
   *_ 程序入口
  * bin
   *_ 命令行工具入口
  * files
   *_ 发布文件配置
  * man
   *_ man文档
  * directories
   *_ 项目目录

 * 发布配置
  * private
   *_ 限制发布
  * preferGlobal
   *_ 警告本地安装
  * publishConfig
   *_ 限制发布仓库
   *_ 限制发布版本
  * os
   *_ 限制用户安装系统
  * cpu
   *_ 限制用户安装cpu
  * license
   *_ 开发协议

 * 第三方配置
  * typings
  * eslintConfig
  * babel
  * unpkg
  * lint-staged
  * gitHooks
  * browserslist
  * sideEffects
   *_ webpack tree shaking

@endmindmap

```

</details>

---

```bash
 //如果 private 为 true，npm 会拒绝发布。
 "private": true,
 //分别指定生产环境依赖和开发依赖
  "dependencies": {
    "antd": "^2.11.1",
    "classnames": "^2.2.5"
  },
  "devDependencies": {
    "axios": "^0.15.3",
    "babel-eslint": "^6.1.2"
  },
//bin制作命令行工具
  "bin": {
    "dk-cli": "./bin/dk-cli.js"
  },
//script用于配置一些脚本，如npm run start
  "scripts": {
    "start": "node index.js"
  },
//engines记录当前项目依赖 node 和 npm 的版本号
  "engines": {
    "node": ">=6.9.0",
    "npm": ">=3.10.10"
  }
//publishConfig决定了我们发布包发布到哪里去，此时发布包就不是往 www.npmjs.com/ 了
  "publishConfig": {
    "registry": "http://gong/"
  }

```
