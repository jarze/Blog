---
title: npm-scripts
date: 2021-12-10 14:57:18
tags:
  - npm
categories:
  - Front
---

[npm scripts 使用指南](https://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)

<!-- more -->

## 通配符

由于 npm 脚本就是 Shell 脚本，因为可以使用 Shell 通配符。

```zsh
"lint": "jshint *.js"
"lint": "jshint **/*.js"
```

上面代码中，\*表示任意文件名，\*\*表示任意一层子目录。

如果要将通配符传入原始命令，防止被 Shell 转义，要将星号转义。

```zsh
"test": "tap test/\*.js"
```

## 传参

向 npm 脚本传入参数，要使用`--`标明。

```zsh
"lint": "jshint **.js"
```

向上面的 npm run lint 命令传入参数，必须写成下面这样。

```zsh
$ npm run lint --  --reporter checkstyle > checkstyle.xml
```

也可以在 package.json 里面再封装一个命令。

```zsh
"lint": "jshint **.js",
"lint:checkstyle": "npm run lint -- --reporter checkstyle > checkstyle.xml"
```

## 执行顺序

如果 npm 脚本里面需要执行多个任务，那么需要明确它们的执行顺序。
如果是并行执行（即同时的平行执行），可以使用&符号。

```zsh
npm run script1.js & npm run script2.js
```

如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用&&符号。

```zsh
$ npm run script1.js && npm run script2.js
```

这两个符号是 Bash 的功能。此外，还可以使用 node 的任务管理模块：script-runner、npm-run-all、redrun。

## 默认值

一般来说，npm 脚本由用户提供。但是，npm 对两个脚本提供了默认值。也就是说，这两个脚本不用定义，就可以直接使用。

```zsh
"start": "node server.js"，
"install": "node-gyp rebuild"
```

上面代码中，npm run start 的默认值是 node server.js，前提是项目根目录下有 server.js 这个脚本；npm run install 的默认值是 node-gyp rebuild，前提是项目根目录下有 binding.gyp 文件。

## 钩子

npm 脚本有 **`pre`**和 **`post`** 两个钩子。举例来说，`build` 脚本命令的钩子就是 `prebuild` 和 `postbuild`。

```zsh
"prebuild": "echo I run before the build script",
"build": "cross-env NODE_ENV=production webpack",
"postbuild": "echo I run after the build script"
```

用户执行 npm run build 的时候，会自动按照下面的顺序执行。

```zsh
npm run prebuild && npm run build && npm run postbuild
```

因此，可以在这两个钩子里面，完成一些准备工作和清理工作。下面是一个例子。

```zsh
"clean": "rimraf ./dist && mkdir dist",
"prebuild": "npm run clean",
"build": "cross-env NODE_ENV=production webpack"
```

npm 默认提供下面这些钩子。

```zsh
prepublish，postpublish
preinstall，postinstall
preuninstall，postuninstall
preversion，postversion
pretest，posttest
prestop，poststop
prestart，poststart
prerestart，postrestart
```

npm start、npm stop 和 npm restart 都比较好理解，而 npm restart 是一个复合命令，实际上会执行三个脚本命令：stop、restart、start。具体的执行顺序如下。

```zsh
prerestart
prestop
stop
poststop
restart
prestart
start
poststart
postrestart
```

而发包的生命周期更为复杂，当执行 `npm publish`，将自动执行以下脚本。

```js
prepublishOnly; // 最重要的一个生命周期。
prepack;
prepare; //npm install 之后自动执行,npm publish 之前自动执行
postpack;
publish;
postpublish;
```

当然你无需完全记住所有的生命周期，如果你需要在发包之前自动做一些事情，如测试、构建等，请在 `prepulishOnly` 中完成。

## 变量

npm 脚本有一个非常强大的功能，就是可以使用 npm 的内部变量。
首先，通过`npm_package_`前缀，npm 脚本可以拿到 package.json 里面的字段。

```jsLOP90;
// view.js
console.log(process.env.npm_package_name); // foo
console.log(process.env.npm_package_version); // 1.2.5
```

```zsh
# env 命令可以列出所有环境变量。
"env": "env"

# 通过npm_package_前缀，npm 脚本可以拿到package.json里面的字段
console.log(process.env.npm_package_name); // foo
console.log(process.env.npm_package_version); // 1.2.5

# npm 脚本还可以通过npm_config_前缀，拿到 npm 的配置变量
"view": "echo $npm_config_tag",

```
