---
title: plantuml
date: 2021-01-19 09:30:29
tags:
  - puml
  - tool
categories: 工具查询
---

PlantUML 是一个可以快速编写的组件。绘制图表。

- (https://plantuml.com)
- [文档](https://plantuml.com/zh/guide)

<!-- more -->

---

## VSCode+Markdown+UML

> 插件

- **PlantUML**
  将文件名以 `*.pu`, `*.puml`后缀结尾，即可使用 PlantUML 语法画图，使用快捷键 `Alt+D` 编译预览。

  ***

- **Copy Markdown as HTML**
  功能同插件名
- **Markdown All in One**
  为 Markdown 文件的编辑提供各种快捷键（如加粗、插入表格）
- **Markdown Extended**
  Markdown 扩展语法（比如 info、danger）
- **Markdown Preview Enhanced**
  增强的 markdown 预览，不装这个很多 markdown 效果不能正常预览
- **Markdown Preview Mermaid Support**
  支持 Mermaid，实测在 VSCode 和 Typora 中只支持流程图/序列图/甘特图/简单类图（无法描述类间关系）

---

{% asset_img demo.png %}

```plantuml

@startuml


header Page Header
footer Page %page% of %lastpage%

title 时序图

autonumber

actor Foo1
boundary Foo2
control Foo3
entity Foo4
database Foo5
collections Foo6

actor Bob #red
' The only difference between actor
'and participant is the drawing
participant Alice
participant "I have a really\nlong name" as L #99FF99
/' You can also declare:
   participant L as "I have a really\nlong name"  #99FF99
  '/
Foo1 -> Foo2 : To boundary
Foo1 -> Foo3 : To control
Foo1 -> Foo4 : To entity
Foo1 -> Foo5 : To database
Foo1 -> Foo6 : To collections

autonumber 60 10

Alice->Bob: Authentication
Bob->Alice: Authentication
Bob->L: Log transaction

autonumber 40 10 "<font color=red><b>Msg 0  "

Bob ->x Alice: authentication
Bob -> Alice
Bob ->> Alice

autonumber 15 "<b>(<u>##</u>)"

Bob -\ Alice
Bob \\- Alice
Bob //-- Alice
Bob ->o Alice
Bob o\\-- Alice

autonumber 15

Bob <-> Alice
Bob <->o Alice

autonumber "<b>[000]"

Bob -[#red]> Alice : hello
Alice -[#0000FF]->Bob : ok

note right of L: afterEmit
note over L, Log #FFAAAA: This is displayed\n over Bob and Alice.
hnote over L : idle
rnote over L
 "r" as rectangle
 "h" as hexagon
endrnote

note left of Alice #aqua
This is displayed
left of Alice.
end note

@enduml

```
