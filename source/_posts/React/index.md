---
title: React
date: 2022-03-11 15:41:20
tags:
	- react
categories:
  - Front
  - js
---

> 与 `flushSync` 同步刷新状态更新

```ts
import { flushSync } from 'react-dom';

flushSync(() => {
  setTodos([...todos, newTodo]);
});

listRef.current.lastChild.scrollIntoView();
```

> 强制批量处理

```ts
import { unstable_batchedUpdates } from 'react-dom';

unstable_batchedUpdates(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
});
```
