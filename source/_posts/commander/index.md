---
title: commander 基本用法
date: 2019-09-30 16:07:26
tags: commander nodejs js
categories: IT JS
---

* [github](https://github.com/tj/commander.js)
* [npm](https://www.npmjs.com/package/commander)

## 安装

``` javascript
npm install commander --save
```

## 定义
`<>`定义必需参数，`[]`定义可选参数

## 示例

``` javascript
const program = require('commander');

program
  .version('0.1.0')
  .option('-C, --chdir <path>', 'change the working directory')
  .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
  .option('-T, --no-tests', 'ignore test hook');

program
  .command('setup [env]')
  .description('run setup commands for all envs')
  .option("-s, --setup_mode [mode]", "Which setup mode to use")
  .action(function(env, options){
    const mode = options.setup_mode || "normal";
    env = env || 'all';
    console.log('setup for %s env(s) with %s mode', env, mode);
  });

program
  .command('exec <cmd>')
  .alias('ex')
  .description('execute the given remote cmd')
  .option("-e, --exec_mode <mode>", "Which exec mode to use")
  .action(function(cmd, options){
    console.log('exec "%s" using %s mode', cmd, options.exec_mode);
  }).on('--help', function() {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('  $ deploy exec sequential');
    console.log('  $ deploy exec async');
  });

program
  .command('*')
  .action(function(env){
    console.log('deploying "%s"', env);
  });

program.parse(process.argv);
```
结果：
{% asset_img commander.png %}


## 方法

### version
作用：定义命令程序的版本号

### option
作用：定义命令的选项

### command
作用：自定义命令

### description
作用：命令的描述性语句

### action
作用：定义命令的回调函数

### parse
作用：用于解析process.argv，设置options以及触发commands
