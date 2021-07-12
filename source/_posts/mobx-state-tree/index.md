---
title: mobx-state-tree
date: 2020-08-19 16:32:32
tags:
  - mobx
  - js
categories:
  - Front
  - js
---

```
.model
.views
.volatile
.actions
```

<!-- more -->

# mobx-state-tree

<!-- toc -->

---

types.model 创建一个可链接的模型类型，其中每个链接的方法都会产生一个新的类型：

- **`named(name)`** 克隆当前类型，但是给它一个新名称
- **`props(props)`** 根据当前类型生成一个新类型，并添加/覆盖指定的属性
- **`actions(self => object literal with actions)`** 根据当前类型生成一种新类型，并添加/覆盖指定的操作
- **`views(self => object literal with view functions)`** 根据当前类型生成一种新类型，并添加/覆盖指定的视图函数
- **`preProcessSnapshot(snapshot => snapshot)`**可用于在实例化新模型之前对原始JSON进行预处理。请参阅生命周期挂钩或其他types.snapshotProcessor
- **`postProcessSnapshot(snapshot => snapshot)`**可用于在获取模型快照之前对原始JSON进行后处理。请参阅生命周期挂钩或其他types.snapshotProcessor

---

# model

## `model.volatile`

```js
const Todo = types
    .model({})
    .volatile(self => ({
        localState: 3
    }))
    .actions(self => ({
        setX(value) {
            self.localState = value
        }
    }))
```
从volatile初始化函数返回的对象可以包含任何数据，并将导致具有相同名称的实例属性。挥发性特性具有以下特征：

1. 可以从模型外部读取它们（如果您想要隐藏的易失性状态，请如上一节中所述将其保留在闭包中，并且仅当未在视图中使用该状态时，才考虑使其不可观察）。
2. 易挥发的属性将仅可观察，请参见可观察的参考资料。分配给它们的值将保持不变，并且不会自动转换为可观察的深层结构。
3. 像普通属性一样，只能通过操作对其进行修改
4. 易挥发的道具不会显示在快照中，也无法通过应用快照进行更新
5. 在实例的生命周期中保留了易挥发的道具。另请参阅对帐
6. 易失性道具的更改不会显示在补丁或快照流中
7. 当前不支持在由返回的对象中定义getters / setter方法 volatile

# types

## 复杂类型
- **`types.model(properties, actions)`** 定义一个“类似”类型，该类具有在对象上操作的属性和操作。
- **`types.array(type)`** 声明指定类型的数组。
- **`types.map(type)`** 声明指定类型的映射。
**请注意，由于MST v3types.array和MSTtypes.map在types.optional默认情况下是自动包装的，因此分别将[]和{}设置为其默认值。**

## 原始类型
- **`types.string`**
- **`types.number`**
- **`types.integer`**
- **`types.boolean`**
- **`types.Date`**
- **`types.custom`**创建一个自定义基本类型。这对于定义自己的类型很有用，这些类型可以将序列化表格一对一映射到不可变的对象（如Decimal或Date）。

## 实用程序类型
- **`types.union(options?: { dispatcher?: (snapshot) => Type, eager?: boolean }, types...)`**创建多种类型的联合。如果无法从快照中明确推断出正确的类型，请提供调度程序功能来确定类型。当eagerflag设置为true（默认）时-将使用第一个匹配类型，如果将其设置为false类型检查，则仅在完全匹配1个类型时通过。
- **`types.optional(type, defaultValue, optionalValues?)`**将值标记为可选（例如在模型中）。如果未提供值undefined（或设置为作为可选optionalValues数组传递的任何原始值），defaultValue则将使用它。如果defaultValue为函数，则将对其进行评估。创建时可用于生成ID或时间戳。
- **`types.literal(value)`**可用于创建文字类型，其中唯一可能的值就是该值。与unions结合使用时，功能非常强大。例如temperature: types.union(types.literal("hot"), types.literal("cold"))。
- **`types.enumeration(name?, options: string[])`**创建一个枚举。此方法是字符串文字的并集的简写形式。如果您使用的是Typescript，并且想基于字符串枚举（例如enum Color { ... }）创建类型，请使用types.enumeration<Color>("Color", Object.values(Color))，其中"Color"name参数是可选的。
- **`types.refinement(name?, baseType, (snapshot) => boolean)`**创建比基本类型更具体的类型，例如types.refinement(types.string, value => value.length > 5)，创建只能长于5的字符串类型。
- **`types.maybe(type)`**使类型成为可选且可为null的简写形式types.optional(types.union(type, types.literal(undefined)), undefined)。
- **`types.maybeNull(type)`**类似于maybe，但用于null表示缺少值。
- **`types.null`**的类型null。
- **`types.undefined`**的类型undefined。
- **`types.late(() => type)`** 可以用于创建递归或循环类型，或者以这样的方式分布在文件上的类型：否则文件之间的循环依赖关系将成为一个问题。
- **`types.frozen(subType? | defaultValue?)`**接受任何类型的可序列化的值（原始的和复杂的），但假定该值本身是不可变的且可序列化的。 frozen可以通过几种不同的方式调用：
  - `types.frozen()` -行为与MST 2中的types.frozen相同。
  - `types.frozen(subType)`-提供有效的MST类型，然后冻结将检查提供的数据是否符合该类型的快照。请注意，该类型实际上不会实例化，因此只能用于检查数据的形状。向SubType添加视图或动作将毫无意义。
  - `types.frozen(someDefaultValue)` -提供原始值，对象或数组，MST将根据该对象推断类型，并将其设置为字段的默认值
  - （打字稿）`types.frozen<TypeScriptType>(...)`-提供打字稿类型，以帮助强力键入字段（仅设计时）
- **`types.compose(name?, type1...typeX)`**，通过采用一堆现有类型并将它们组合成一个新模型来创建新模型类型。
- **`types.reference(targetType)`**创建一个属性，该属性引用targetType同一棵树中某处给定项的另一个项。有关更多详细信息，请参见参考。
- **`types.safeReference(targetType)`**类似于标准引用，不同之处在于它默认情况下接受未定义的值并自动将其自身设置为未定义（当父级是模型时）/当其指向的引用被分离/销毁时，将自身从数组和映射中移除。有关更多详细信息，请参见参考。
- **`types.snapshotProcessor(type, processors, name?)`**在序列化给定类型之前/之后运行快照前/快照后处理器。例子：

---

### `types.identifier`

```js
const Todo = types.model({
  id: types.identifier,
  title: types.string,
});

const TodoStore = types.model({
  todos: types.array(Todo),
  selectedTodo: types.reference(Todo),
});

// create a store with a normalized snapshot
const storeInstance = TodoStore.create({
  todos: [
    {
      id: "47",
      title: "Get coffee",
    },
  ],
  selectedTodo: "47",
});

// because `selectedTodo` is declared to be a reference, it returns the actual Todo node with the matching identifier
console.log(storeInstance.selectedTodo.title);
```

### `types.refinement`

```js
const Car = types.model("Car", {
    id: types.refinement(types.identifier, identifier => identifier.indexOf("Car_") === 0)
})
```


### `types.reference`

```js
const User = types.model({
    id: types.identifier,
    name: types.string
})

const UserByNameReference = types.maybeNull(
    types.reference(User, {
        // given an identifier, find the user
        get(identifier /* string */, parent: any /*Store*/) {
            return parent.users.find(u => u.name === identifier) || null
        },
        // given a user, produce the identifier that should be stored
        set(value /* User */) {
            return value.name
        }
    })
)

const Store = types.model({
    users: types.array(User),
    selection: UserByNameReference
})

const s = Store.create({
    users: [{ id: "1", name: "Michel" }, { id: "2", name: "Mattia" }],
    selection: "Mattia"
})
```

# actions

- onAction 侦听在模型或其任何后代上调用的任何操作。
- addMiddleware 将拦截器功能添加到在子树上调用的任何操作。
- applyAction 根据给定的动作描述在模型上调用动作