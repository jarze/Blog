---
title: MobX 基础介绍
date: 2020-06-28 16:46:45
tags:
  - mobx
  - js
categories:
  - Front
  - js
---

---

- **`mobx`**([`github`](https://github.com/mobxjs/mobx),[`mobx`中文文档](https://cn.mobx.js.org/))
- **`mobx-state-tree`**([`npm`](https://www.npmjs.com/package/mobx-state-tree),[`github`](https://github.com/mobxjs/mobx-state-tree),[`docs`](http://mobx-state-tree.js.org/))
- **实用工具**: [`mobx-utils`](https://github.com/mobxjs/mobx-utils)
- [博客、视频及相关项目](https://github.com/mobxjs/awesome-mobx#examples)

---

[TOC]

<!-- toc -->

# 概念

## 1. State(状态)

**状态** 是驱动应用的数据。 通常有像待办事项列表这样的**领域特定状态**，还有像当前已选元素的**视图状态**。 记住，状态就像是有数据的 `excel` 表格。

## 2. Derivations(衍生)

**任何** 源自**状态**并且不会再有任何进一步的相互作用的东西就是衍生。 衍生以多种形式存在:

- **用户界面**
- **衍生数据**，比如剩下的待办事项的数量。
- **后端集成**，比如把变化发送到服务器端。

MobX 区分了两种类型的衍生:

- **`Computed values`(计算值)** - 它们是永远可以使用纯函数(`pure function`)从当前可观察状态中衍生出的值。
- **`Reactions`(反应)** - `Reactions` 是当状态改变时需要自动发生的副作用。需要有一个桥梁来连接命令式编程(`imperative programming`)和响应式编程(`reactive programming`)。或者说得更明确一些，它们最终都需要实现 `I / O` 操作。

  _刚开始使用 MobX 时，人们倾向于频繁的使用 reactions。 黄金法则: 如果你想创建一个基于当前状态的值时，请使用 **`computed`**。_

回到 excel 表格这个比喻中来，公式是**计算**值的衍生。但对于用户来说，能看到屏幕给出的**反应**则需要部分重绘 GUI。

## 3. Actions(动作)

**动作** 是任一一段可以改变状态的代码。用户事件、后端数据推送、预定事件、等等。 动作类似于用户在 `excel` 单元格中输入一个新的值。

在 `MobX` 中可以显式地定义动作，它可以帮你把代码组织的更清晰。 如果是在严格模式下使用 `MobX` 的话，`MobX` 会强制只有在动作之中才可以修改状态。

# 原则

`MobX` 支持单向数据流，也就是**动作**改变**状态**，而状态的改变会更新所有受影响的**视图**。
{% asset_img action-state-view.png action-state-view %}

当**状态**改变时，所有**衍生**都会进行**原子级的自动更新**。因此永远不可能观察到中间值。

所有**衍生**默认都是**同步**更新。这意味着例如**动作**可以在改变**状态**之后直接可以安全地检查计算值。

**计算值**是**延迟**更新的。任何不在使用状态的计算值将不会更新，直到需要它进行副作用（`I / O`）操作时。 如果视图不再使用，那么它会自动被垃圾回收。

所有的**计算值**都应该是**纯净**的。它们不应该用来改变**状态**。

# 实例

下面的代码清单举例说明了以上的概念和原则:

```js
import { observable, autorun } from "mobx";

var todoStore = observable({
  /* 一些观察的状态 */
  todos: [],

  /* 推导值 */
  get completedCount() {
    return this.todos.filter((todo) => todo.completed).length;
  },
});

/* 观察状态改变的函数 */
autorun(function () {
  console.log("Completed %d of %d items", todoStore.completedCount, todoStore.todos.length);
});

/* ..以及一些改变状态的动作 */
todoStore.todos[0] = {
  title: "Take a walk",
  completed: false,
};
// -> 同步打印 'Completed 0 of 1 items'

todoStore.todos[0].completed = true;
// -> 同步打印 'Completed 1 of 1 items'
```

# 核心 API

## observable

### `observable(value)`

用法:

- `observable(value)`
- `@observable classProperty = value`

`Observable` 值可以是 `JS` 基本数据类型、引用类型、普通对象、类实例、数组和映射。

**注意**: `observable(value)` 是一个便捷的 `API` ，此 `API` 只有在它可以被制作成可观察的数据结构(数组、映射或 `observable` 对象)时才会成功。对于所有其他值，不会执行转换。

匹配类型应用了以下转换规则，但可以通过使用 装饰器 进行微调。请参见下文。

1. 如果 `value` 是 [`ES6 Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) 的实例: 会返回一个新的 `Observable Map`。如果你不只关注某个特定 entry 的更改，而且对添加或删除其他 entry 时也做出反应的话，那么 `Observable map` 会非常有用。
2. 如果 `value` 是数组，会返回一个 `Observable Array`。
3. 如果 `value` 是没有原型的对象或它的原型是 `Object.prototype`，那么对象会被克隆并且所有的属性都会被转换成可观察的。参见 `Observable Object`。
4. 如果 `value` 是有原型的对象，`JavaSript` 原始数据类型(_JavaScript 原始数据类型 Undefined、Null、Boolean、Number 和 String。(相对于基本数据类型少了个 object)_)或者函数，值不会发生变化。如果你需要 `Boxed Observable`，你可以采用下列任意方式:

   - 显式地调用 `observable.box(value)`
   - 在类定义时使用 `@observable`
   - 调用 `decorate()`
   - 在类中使用 `extendObservable()` 来引入属性

`MobX` 不会自动带有原型的对象转变成 `observable`，因为那是 `observable` 构造函数的职责。在构造函数中使用 `extendObservable` 或在类定义是使用 `@observable` 进行替代。

乍看之下，这些规则可能看上去很复杂，但实际上实践当中你会发现他们是非常直观的。

一些建议:

- 要想使用 `@observable` 装饰器，首先要确保 在你的编译器(`babel` 或者 `typescript`)中 装饰器是启用的。
- 默认情况下将一个数据结构转换成可观察的是**有感染性的**，这意味着 `observable` 被自动应用于数据结构包含的任何值，或者将来会被该数据结构包含的值。这个行为可以通过使用 装饰器 来更改。
- _[`MobX 4` 及以下版本]_ 要创建键是动态的对象时永远都使用 `maps！`对象上只有初始化时便存在的属性会转换成可观察的，尽管新添加的属性可以通过使用 `extendObservable` 转换成可观察的。

### `@observable property = value`

`observable` 也可以用作属性的装饰器。它需要启用装饰器而且它是 `extendObservable(this, { property: value })` 的语法糖。

### @observable property = value

创建一个 `observable` 的盒子，它用来存储 `value` 的 `observable` 引用。使用 `get()` 方法可以得到盒子中的当前 `value`，而使用 `set()` 方法可以更新 `value。` 这是所有其它 `observable` 创建的基础，但实际中你其实很少能使用到它。

通常盒子会自动地尝试把任何还不是 `observable` 的新值转换成 `observable` 。使用 `{deep: false}` 选项会禁用这项行为。

### `observable.object(value, decorators?, options?)`

为提供的对象创建一个克隆并将其所有的属性转换成 `observable` 。 默认情况下这些属性中的任何值都会转换成 `observable，但当使用` {deep: false} 选项时只有属性会转换成 `observable` 引用，而值不会改变(这也适用于将来分配的任何值)。

`observable.object()` 的第二个参数可以很好地调整  装饰器 的可观察性。

### `observable.array(value, options?)`

基于提供的值来创建一个新的 `observable` 数组。

如果不想数组中的值转换成 `observable` 请使用 `{deep: false}`选项。

### `observable.map(value, options?)`

基于提供的值来创建一个新的 `observable` 映射。如果不想映射中的值转换成 `observable` 请使用 `{deep: false}` 选项。 当想创建动态的键集合并且需要能观察到键的添加和移除时，请使用 `map。` 因为内部使用了成熟的 `ES6 Map`，你可以自由使用任何键而无需局限于字符串。

### `extendObservable`

用法: `extendObservable(target, properties, decorators?, options?)`

对于 `propertyMap` 中的每个键值对，都会作为一个(新)的 `observable` 属性引入到 `target` 对象中。 还可以在构造函数中使用来引入 `observable` 属性，这样就不需要用装饰器了。 如果 `propertyMap` 的某个值是一个 `getter` 函数，那么会引入一个 `computed` 属性。

如果新的属性不应该具备感染性(即新分配的值不应该自动地转换成 `observable`)的话，请使用 `extendObservable(target, props, decorators?, {deep: false})` 。 注意 `extendObservable` 增强了现有的对象，不像 `observable.object` 是创建一个新对象。

## 装饰器(Decorators)

使用装饰器可以很好地调节通过 `observable`、 `extendObservable` 和 `observable.object` 定义的属性的可观察性。它们还可以控制特定属性的自动转换规则。

可用的装饰器列表:

- **`observable.deep`**: 所有 `observable` 都使用的默认的装饰器。它可以把任何指定的、非原始数据类型的、非 `observable` 的值转换成 `observable。`
- **`observable.ref`**: 禁用自动的 `observable` 转换，只是创建一个 observable 引用。
- **`observable.shallow`**: 只能与集合组合使用。 将任何分配的集合转换为浅 observable (而不是深 - `observable`)的集合。 换句话说, 集合中的值将不会自动变为 `observable。`
- **`computed`**: 创建一个衍生属性, 参见 `computed`
- **`action`**: 创建一个动作, 参见 `action`

可以使用 `@decorator`语法来应用这些装饰器:

```js
import { observable, action } from "mobx";

class TaskStore {
  @observable.shallow tasks = [];
  @action addTask(task) {
    /* ... */
  }
}
```

或者通过 `observable.object / observable.extendObservable` 或 `decorate()` 传入属性装饰器。 注意，装饰器总是“附着”在属性上的。 因此，即使分配了新值，它们仍将保持有效。

```js
import { observable, action } from "mobx";

const taskStore = observable(
  {
    tasks: [],
    addTask(task) {
      /* ... */
    },
  },
  {
    tasks: observable.shallow,
    addTask: action,
  }
);
```

### `decorate`

用法: `decorate(object, decorators)`

这是将可观察性装饰器)应用于普通对象或类实例的简便方法。第二个参数是一个属性设置为某些装饰器的对象。

当无法使用 `@decorator` 语法或需要对可观察性进行更细粒度的控制时使用这个方法。

```js
class TodoList {
  todos = {};
  get unfinishedTodoCount() {
    return values(this.todos).filter((todo) => !todo.finished).length;
  }
  addTodo() {
    const t = new Todo();
    t.title = "Test_" + Math.random();
    set(this.todos, t.id, t);
  }
}

decorate(TodoList, {
  todos: observable,
  unfinishedTodoCount: computed,
  addTodo: action.bound,
});
```

想要在单个属性上应用多个装饰器的话，你可以传入一个装饰器数组。多个装饰器应用的顺序是从从右至左。

```js
import { decorate, observable } from "mobx";
import { serializable, primitive } from "serializr";
import persist from "mobx-persist";

class Todo {
  id = Math.random();
  title = "";
  finished = false;
}

decorate(Todo, {
  title: [serializable(primitive), persist("object"), observable],
  finished: [serializable(primitive), observable],
});
```

**注意**: 并非所有的装饰器都可以在一起组合，此功能只会尽力而为。一些装饰器会直接影响实例，并且可以“隐藏”其他那些只更改原型的装饰器的效果。

## Computed values(计算值)

用法:

- `computed(() => expression)`
- `computed(() => expression, (newValue) => void)`
- `computed(() => expression, options)`
- `@computed({equals: compareFn}) get classProperty() { return expression; }`
- `@computed get classProperty() { return expression; }`

创建计算值，`expression` 不应该有任何副作用而只是返回一个值。 如果任何 `expression` 中使用的 `observable` 发生改变，它都会自动地重新计算，但前提是计算值被某些 **`reaction`** 使用了。

还有各种选项可以控制 `computed` 的行为。包括:

- `equals: (value, value) => boolean` 用来重载默认检测规则的比较函数。 内置比较器有: `comparer.identity`, `comparer.default`, `comparer.structural`
- `requiresReaction: boolean` 在重新计算衍生属性之前，等待追踪的 `observables` 值发生变化
- `get: () => value)` 重载计算属性的 `getter`
- `set: (value) => void` 重载计算属性的 `setter`
- `keepAlive: boolean` 设置为 `true` 以自动保持计算值活动，而不是在没有观察者时暂停。

## Actions(动作)

任何应用都有动作。动作是任何用来修改状态的东西。

使用 `MobX` 你可以在代码中显式地标记出动作所在的位置。 动作可以有助于更好的组织代码。 建议在任何更改 `observable` 或者有副作用的函数上使用动作。 结合开发者工具的话，动作还能提供非常有用的调试信息。 注意: 当启用严格模式时，需要强制使用 `action`，参见 `enforceActions。`

用法:

- `action(fn)`
- `action(name, fn)`
- `@action classMethod`
- `@action(name) classMethod`
- `@action boundClassMethod = (args) => { body }`
- `@action.bound boundClassMethod(args) { body }`

对于一次性动作，可以使用 `runInAction(name?, fn)` , 它是 `action(name, fn)()` 的语法糖.

## Flow

用法: `flow(function* (args) { })`

`flow()` 接收 `generator` 函数作为它唯一的输入

当处理**异步动作**时，回调中执行的代码不会被 `action` 包装。这意味着你修改的 `observable state` 无法通过 `enforceActions` 检查。保留动作语义的简单方法是使用 `flow` 来包装异步函数。这将确保所有回调都会被 `action()` 包装。

注意，异步函数必须是 `generator` ，而且在内部只能 `yield promises` 。`flow` 会返回一个 `promise` ，需要的话可以使用 `cancel()` 进行撤销。

```js
import { configure } from "mobx";

// 不允许在动作外部修改状态
configure({ enforceActions: true });

class Store {
  @observable githubProjects = [];
  @observable state = "pending"; // "pending" / "done" / "error"

  fetchProjects = flow(function* fetchProjects() {
    // <- 注意*号，这是生成器函数！
    this.githubProjects = [];
    this.state = "pending";
    try {
      const projects = yield fetchGithubProjectsSomehow(); // 用 yield 代替 await
      const filteredProjects = somePreprocessing(projects);

      // 异步代码自动会被 `action` 包装
      this.state = "done";
      this.githubProjects = filteredProjects;
    } catch (error) {
      this.state = "error";
    }
  });
}
```

提示: 推荐为 `generator` 函数起个名称，此名称将出现在开发工具中

### Flows 可以撤销

`Flows` 是可以取消的，这意味着调用返回的 `promise` 的 `cancel()` 方法。这会立即停止 `generator` ，但是 `finally` 子句仍会被处理。 返回的 `promise` 本身会使用 `FLOW_CANCELLED` 进行 `reject` 。

### Flows 支持异步迭代器

`Flows` 支持异步迭代器，这意味着可以使用异步 `generators` :

```js
async function* someNumbers() {
  yield Promise.resolve(1);
  yield Promise.resolve(2);
  yield Promise.resolve(3);
}

const count = mobx.flow(async function* () {
  // 使用 await 来循环异步迭代器
  for await (const number of someNumbers()) {
    total += number;
  }
  return total;
});

const res = await count(); // 6
```

## Reactions(反应) & Derivations(衍生)

计算值 是自动响应状态变化的值。 反应 是自动响应状态变化的副作用。 反应可以确保当相关状态发生变化时指定的副作用(主要是 I/O)可以自动地执行，比如打印日志、网络请求、等等。 使用反应最常见的场景是 React 组件的 `observer` 装饰器(参见下文)。

### observer

可以用作包裹 `React` 组件的高阶组件。 在组件的 `render` 函数中的任何已使用的 `observable` 发生变化时，组件都会自动重新渲染。 注意 `observer` 是由 `"mobx-react"` 包提供的，而不是 `mobx` 本身。

用法:

- `observer(React.createClass({ ... }))`
- `observer((props, context) => ReactElement)`
- `observer(class MyComponent extends React.Component { ... })`
- `@observer class MyComponent extends React.Component { ... }`

### autorun

用法：`autorun(() => { sideEffect }, options)` 。

`autorun` 负责运行所提供的 `sideEffect` 并追踪在 `sideEffect` 运行期间访问过的 `observable` 的状态。 将来如果有其中一个已使用的 `observable` 发生变化，同样的 `sideEffect` 会再运行一遍。 `autorun` 返回一个清理函数用来取消副作用。

选项

- `name?: string: 用于识别和调试的名称`
- `delay?: number: 使副作用延迟和防抖的时间。默认为 0`
- `onError?: (error) => void: 如果 autorun 函数抛出异常，则触发错误处理函数`
- `scheduler?: (callback) => void: 设置自定义调度器以决定如何调度 autorun 函数的重新运行`

### when

用法: `when(() => condition, () => { sideEffect }, options)` 。

`condition` 表达式会自动响应任何它所使用的 `observable。` 一旦表达式返回的是真值，副作用函数便会立即调用，但只会调用一次。

注意: 副作用函数 (第二个参数) 其实是可选的。如果不提供副作用函数的话，将返回一个可取消的 promise (即具有 `cancle()` 方法的 `promise`)

`when` 返回清理器以尽早地取消操作。

如果没有给 `when` 传递副作用函数的话，它将返回一个可以等待条件结束的 `promise` 。

### options

- `name?: string`: 用于识别和调试的名称
- `onError?: (error) => void`: 如果 断言函数 或 副作用函数 函数抛出异常，则触发错误处理函数
- `timeout: number` 以毫秒为单位的延迟，之后将触发 `onError` 处理函数，以通知在指定时间内未满足条件

### reaction

用法: `reaction(() => data, data => { sideEffect }, options)`.

`reaction` 是 `autorun` 的变种，在如何追踪 `observable` 方面给予了更细粒度的控制。 它接收两个函数，第一个是追踪并返回数据，该数据用作第二个函数，也就是副作用的输入。 与 `'autorun'` 不同的是副作用起初不会运行，并且在执行副作用时访问的任何 `observable` 都不会被追踪。 和 `autorunAsync` 一样，副作用是可以进行函数去抖的。

### options

- `fireImmediately?: boolean`: 在触发 副作用函数 之前等待变化。默认为 `false`
- `delay?: number`: 使副作用延迟和防抖的时间。默认为 0
- `equals`. 自定义相等函数来确定 expr 函数是否与之前的结果不同，再决定是否触发副作用。接收与`computed` 的 `equals` 选项相同的选项
- 还接收 `autorun` 的所有选项

### onReactionError

用法: `onReactionError(handler: (error: any, derivation) => void)`

此方法附加一个全局错误监听器，对于从 `reaction` 抛出的每个错误都会调用该错误监听器。 它可以用来监控或者测试。
