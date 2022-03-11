---
title: commitizen规范
date: 2022-03-11 15:43:48
tags:
  - git
---

- [commitizen](https://www.npmjs.com/package/commitizen)
- [Angular commit-message-guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)
- [Google's JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>

```

<!-- more -->


## `type`

| 规范名   | 描述                                                                                  |
| -------- | ------------------------------------------------------------------------------------- |
| docs     | 仅仅修改了文档，比如 README, CHANGELOG, CONTRIBUTE 等等                               |
| chore    | 改变构建流程、或者增加依赖库、工具等                                                  |
| feat     | 新增 feature                                                                          |
| fix      | 修复 bug                                                                              |
| merge    | 合并分之                                                                              |
| perf     | 优化相关，比如提升性能、体验                                                          |
| refactor | 代码重构，没有加新功能或者修复 bug                                                    |
| revert   | 回滚到上一个版本                                                                      |
| style    | 仅仅修改了空格、格式缩进、都好等等，不改变代码逻辑                                    |
| test     | 测试用例，包括单元测试、集成测试等                                                    |
| build    | 影响构建系统或外部依赖项的更改（示例范围：gulp、broccoli、npm）                       |
| ci       | 对我们的 CI 配置文件和脚本的更改（示例范围：Travis、Circle、BrowserStack、SauceLabs） |


```bash

docs(changelog): update changelog to beta.5

#####

fix(release): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.


```