---
title: mobx-可观察对象
date: 2022-05-24 10:59:05
tags:
  - mobx
  - js
categories:
  - Front
  - js
---

- https://zh.mobx.js.org/observable-state.html

---

<!-- toc -->

---

<!-- more -->

<style id='none-comment'></style>

## `makeObservable`

用法：

- `makeObservable(target, annotations?, options?)`

```js
import { makeObservable, observable, computed, action, flow } from "mobx"

class Doubler {
    value

    constructor(value) {
        makeObservable(this, {
            value: observable,
            double: computed,
            increment: action,
            fetch: flow
        })
        this.value = value
    }

    get double() {
        return this.value * 2
    }

    increment() {
        this.value++
    }

    *fetch() {
        const response = yield fetch("/api/value")
        this.value = response.json()
    }
}
```

## `makeAutoObservable`

使用：

- `makeAutoObservable(target, overrides?, options?)`

`makeAutoObservable` 就像是加强版的 `makeObservable`，在默认情况下它将推断所有的属性。你仍然可以使用 `overrides` 重写某些注解的默认行为

推断规则：

- 所有 自有 属性都成为 `observable`。
- 所有 `getters` 都成为 `computed`。
- 所有 `setters` 都成为 `action`。
- 所有 `prototype` 中的 `functions` 都成为 `autoAction`。
- 所有 `prototype` 中的 `generator functions` 都成为 `flow`。（需要注意，`generators` 函数在某些编译器配置中无法被检测到，如果 `flow` 没有正常运行，请务必明确地指定 `flow` 注解。）
- 在 `overrides` 参数中标记为 `false` 的成员将不会被添加注解。例如，将其用于像标识符这样的只读字段。

```js
import { makeAutoObservable } from "mobx"

function createDoubler(value) {
    return makeAutoObservable({
        value,
        get double() {
            return this.value * 2
        },
        increment() {
            this.value++
        }
    })
}
```

## `observable`


## 可用的注解
| 注解                 | 描述                                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `observable`         | observable.deep	定义一个存储 state 的可跟踪字段。如果可能，任何被赋值给 observable 的字段都会基于它自己的类型被（深 | 度）转化为observable、autoAction 或 flow。只有 plain object、array、Map、Set、function、generator function 可以转换，类实例和其他实例不会被影响。 |
| `observable.ref `    | 类似于 observable，但只有重新赋值才会被追踪。所赋的值会被完全忽略，并且将不会主动转化为                             | observable/autoAction/flow。比方说，在你打算将不可变数据存储在可观察字段中时，可以使用这个注解。                                                  |
| `observable.shallow` | 类似于 observable.ref 但是是用于集合的。任何所赋的集合都会被转化为可观察值，但是其内部的值并不                      | 会变为可观察值。                                                                                                                                  |
| `observable.struct`  | 类似于 observable，但是会忽略所赋的值中所有在结构上与当前值相同的值。                                               |
| `action`             | 把一个函数标记为会修改state 的 action。查看 actions 获取更多信息。不可写。                                          |
| `action.bound `      | 类似于 action，但是会将 action 绑定到实例，因此将始终设置 this。不可写。                                            |
| `computed`           | 可以用在getter 上，用来将其声明为可缓存的派生值。查看 computeds 获取更多信息。                                      |
| `computed.struct`    | 类似于 computed，但如果重新计算后的结果在结构上与之前的结果相等，那么观察者将不会收到通知。                         |
| `true`               | 推断最佳注解。查看makeAutoObservable 获取更多信息。                                                                 |
| `false`              | 刻意不为该属性指定注解。                                                                                            |
| `flow`               | 创建一个 flow 管理异步进程。查看 flow 获取更多信息。需要注意的是，推断出来的 TypeScript 返回类型可能会出错。        | 不可写。                                                                                                                                          |
| `flow.bound`         | 类似于 flow, 但是会将 flow 绑定到实例，因此将始终设置 this。 不可写。                                               |
| `override`           | 用于子类覆盖继承的action，flow，computed，action.bound。                                                            |
| `autoAction`         | 不应被显式调用，但 makeAutoObservable 内部会对其进行调用，以便根据调用上下文将方法标识为 action 或者                | 派生值。                                                                                                                                          |