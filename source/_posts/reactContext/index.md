---
title: React Context 的运用
date: 2023-02-06 17:02:37
tags:
	- react
categories:
  - Front
  - js
  - react
---

> [`React Context`](https://zh-hans.reactjs.org/docs/context.html)

- `React.createContext`
- `Context.Provider`
- `Class.contextType`
- `Context.Consumer`
- `Context.displayName`
- [`useContext`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecontext)

---

<!-- toc -->

---

<!-- more -->

- 只有当组件所处的树中没有匹配到 `Provider` 时，其 `defaultValue` 参数才会生效。这有助于在不使用 `Provider` 包装组件的情况下对组件进行测试。
- 将 `undefined` 传递给 `Provider` 的 `value` 时，消费组件的 `defaultValue` 不会生效。
- `Provider` 接收一个 `value` 属性，传递给消费组件。一个 `Provider` 可以和多个消费组件由对应关系。多个 `Provider` 也可以嵌套使用，里层的会覆盖外层的数据。
- 当 `Provider` 的 `value` 值发生变化时，它内部的所有消费组件都会重新渲染。`<Provider>` 及其内部 `<Consumer>` 组件都不受制于 `shouldComponentUpdate` 函数，因此当 `<Consumer>` 组件在其祖先组件退出更新的情况下也能更新。

> **`context`**

```js

import { createContext } from 'react';

const MyContext = createContext({ name: 'defaultValue' });

// 在 DevTools 中显示 MyContext.Provider 和 MyContext.Consumer
MyContext.displayName = 'MyContextName';

export default MyContext;

```

> **`index`**

```js

import React, { useState, Fragment } from 'react';
import MyContext from './context';
import NormalC from './Normal';
import FnC from './Fn';
import ClassC from './Class';

export default function App() {
  const [string, setString] = useState(`'context's value is string!`);

  return (
    <Fragment>
      <button onClick={() => setString(string + '😄')}>刷新</button>
      <br />
      <br />
      {/* Provider组件接收一个value属性 */}
      <MyContext.Provider value={{ name: string }}>
        <NormalC />
        <hr />
        <FnC />
        <hr />
        <ClassC />
      </MyContext.Provider>
    </Fragment>
  );
}

```

##  **`Normal`**  `React.createContext` 提供的 `Provider` 和 `Consumer`

```js

import React from 'react';
import MyContext from './context';

const NormalC = () => {
  return (
    <MyContext.Consumer>
      {value => {
        return <div>Consumer使用Context方式获取的值：{JSON.stringify(value)}</div>;
      }}
    </MyContext.Consumer>
  );
};

export default NormalC;

```

## **`Fn`**  `React.createContext` 提供的 `Provider` 和 `useContext` 钩子

```js
import React, { useContext } from 'react';
import MyContext from './context';

const FnC = () => {
  const context = useContext(MyContext);
  return <div> 函数组件使用Context方式获取的值：{JSON.stringify(context)}</div>;
};

export default FnC;

```

## **`Class`** `React.createContext` 提供的 `Provider` 和 `class` 的 `contextType` 属性

```js

import React, { Component } from 'react';
import context from './context';

class ClassC extends Component {
  static contextType = context;
  render() {
    const value = this.context;
    return <div>Class组件使用Context方式获取的值：{JSON.stringify(value)}</div>;
  }
}

// ClassC.contextType = context; //此处与写static关键字作用一致
export default ClassC;

```

---

## 已废弃 ~~`getChildContext`~~

```js

import React from 'react';
import PropTypes from 'prop-types';

class ParentComponent extends React.Component {
  static childContextTypes = {
    theme: PropTypes.string,
  };

  getChildContext() {
    return { theme: 'dark' };
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <ChildComponent />
        <ChildComponent1 />
      </div>
    );
  }
}

// 函数组件
function ChildComponent(props, context) {
  return <div>ChildComponent Theme: {context.theme}</div>;
}

ChildComponent.contextTypes = {
  theme: PropTypes.string,
};

// Class组件
class ChildComponent1 extends React.Component {
  static contextTypes = {
    theme: PropTypes.string,
  };

  render() {
    return <div>ChildComponent1 Theme: {this.context.theme}</div>;
  }
}

export default ParentComponent;

```