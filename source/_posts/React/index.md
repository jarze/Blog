---
title: React
date: 2022-03-11 15:41:20
tags:
	- react
categories:
  - Front
  - js
  - react
---

<!-- toc -->
<!-- more -->

## `react-dom`

###  `flushSync` 同步刷新状态更新;以将回调函数中的更新任务，放到一个较高级的优先级中，适用于强制刷新，同时确保了DOM会被立即更新

```ts
import { flushSync } from 'react-dom';

flushSync(() => {
  setTodos([...todos, newTodo]);
});

listRef.current.lastChild.scrollIntoView();
```

### 强制批量处理

```ts
import { unstable_batchedUpdates } from 'react-dom';

unstable_batchedUpdates(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
});
```

 ### `createPortal` ：在Portal中提供了一种将子节点渲染到已 DOM 节点中的方式，该节点存在于 DOM 组件的层次结构之外。

 ```js
import React, { useState, useEffect, useRef } from 'react';
import ReactDom from 'react-dom'

const Child = ({children}) => {

  const ref = useRef()
  const [newDom, setNewDom] = useState()

  useEffect(() => {
    setNewDom(ReactDom.createPortal(children, ref.current))
  }, [])

  return <div>
    <div ref={ref}>container</div>
    <div>
      DOM
      {newDom}
    </div>
  </div>
}

 ```

我们可以处理一些顶层元素，如：Modal弹框组件，Modal组件在内部中书写，挂载到外层的容器（如body），此时这个Api就非常有用

---

## `React v18中的hooks`

- https://zh-hans.reactjs.org/docs/hooks-reference.html

### `useDebugValue` 可用于在 React 开发者工具中显示自定义 hook 的标签。

```js
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  // 在开发者工具中的这个 Hook 旁边显示标签
  // e.g. "FriendStatus: Online"
  useDebugValue(isOnline ? 'Online' : 'Offline');

  return isOnline;
}
```

```js
useDebugValue(value);
useDebugValue(date, date => date.toDateString());
```

### `useDeferredValue` 接受一个值，并返回该值的新副本，该副本将推迟到更紧急地更新之后。如果当前渲染是一个紧急更新的结果，比如用户输入，`React` 将返回之前的值，然后在紧急渲染完成后渲染新的值。

```js
function Typeahead() {
  const query = useSearchQuery('');
  const deferredQuery = useDeferredValue(query);

  // Memoizing 告诉 React 仅当 deferredQuery 改变，
  // 而不是 query 改变的时候才重新渲染
  const suggestions = useMemo(
    () => <SearchSuggestions query={deferredQuery} />,
    [deferredQuery]
  );

  return (
    <>
      <SearchInput query={query} />
      <Suspense fallback="Loading results...">{suggestions}</Suspense>
    </>
  );
}
```

### `useTransition` 返回一个状态值表示过渡任务的等待状态，以及一个启动该过渡任务的函数。

```js
function App() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  function handleClick() {
    startTransition(() => {
      setCount(c => c + 1);
    });
  }

  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}
```

`startTransition` 允许你通过标记更新将提供的回调函数作为一个过渡任务：
`isPending` 指示过渡任务何时活跃以显示一个等待状态

### `useId` 是一个用于生成横跨服务端和客户端的稳定的唯一 ID 的同时避免 hydration 不匹配的 hook。

```js
const id = useId();
```
`useId` 生成一个包含 : 的字符串 `token`。这有助于确保 `token` 是唯一的，但在 `CSS` 选择器或 `querySelectorAll` 等 `API` 中不受支持。

---

## `Library Hooks`

以下 `hook` 是为库作者提供的，用于将库深入集成到 `React` 模型中，通常不会在应用程序代码中使用。

### `useSyncExternalStore`是一个推荐用于读取和订阅外部数据源的 `hook`，其方式与选择性的 `hydration` 和时间切片等并发渲染功能兼容。


```js
const state = useSyncExternalStore(subscribe, getSnapshot[, getServerSnapshot]);
```

此方法返回存储的值并接受三个参数：

- `subscribe`：用于注册一个回调函数，当存储值发生更改时被调用。
- `getSnapshot`： 返回当前存储值的函数。
- `getServerSnapshot`：返回服务端渲染期间使用的存储值的函数

🌰
```jsx
import React, {useSyncExternalStore} from 'react';
import { combineReducers , createStore  } from 'redux'

const reducer = (state=1,action) => {
  switch (action.type){
    case 'ADD':
      return state + 1
    case 'DEL':
      return state - 1
    default:
      return state
  }
}

/* 注册reducer,并创建store */
const rootReducer = combineReducers({ count: reducer  })
const store = createStore(rootReducer,{ count: 1  })

const Index = () => {
    // 订阅
    const state = useSyncExternalStore(store.subscribe,() => store.getState().count)
    return (
      <div>
        <div>{state}</div>
        <div>
          <button onClick={() => store.dispatch({ type:'ADD' })} >加1</button>
          <button style={{marginLeft: 8}} onClick={() => store.dispatch({ type:'DEL' })} >减1</button>
        </div>
      </div>
    )
}

export default Index
```

### `useInsertionEffect`

```js
useInsertionEffect(didUpdate);
```

该签名与 `useEffect` 相同，但它在所有 `DOM` 突变 之前 同步触发。使用它在读取 `useLayoutEffect` 中的布局之前将样式注入 `DOM`。由于这个 `hook` 的作用域有限，所以这个 `hook` 不能访问 `refs`，也不能安排更新。

可以看到在执行顺序上 `useInsertionEffect ### useLayoutEffect ### useEffect`

**注意**：
`useInsertionEffect` 应仅限于 `css-in-js` 库作者使用。优先考虑使用 `useEffect` 或 `useLayoutEffect` 来替代。
