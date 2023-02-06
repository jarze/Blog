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

<!-- toc -->

---

<!-- more -->


> **`context`**

```js

import { createContext } from 'react';

export default createContext({});

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