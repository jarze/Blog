---
title: less
date: 2022-08-05 10:42:24
tags:
---

<!-- toc -->

<!-- more -->

less 是一门 css 预处理语言，它扩展了 css 语言，增加了变量，Mixin,函数等新特性，使 css 更易维护和扩展，less 可以运行在浏览器和服务器端

[TOC]

## @import

## 嵌套

```less
.wrapper {
  .content {
    ul {
      li {
        color: red;
      }
    }
  }
}
```

```css
.wrapper .content ul li {
  color: red;
}
```

## &

```less
a {
  color: blue;
  &:hover {
    color: aqua;
  }
}

.wrap {
  &_2 {
    color: aliceblue;
  }
}

.link {
  & + & {
    color: red;
  }

  & & {
    color: green;
  }

  && {
    color: blue;
  }

  &,
  &ish {
    color: cyan;
  }
}
```

```css
a {
  color: blue;
}
a:hover {
  color: aqua;
}
.wrap_2 {
  color: aliceblue;
}
.link + .link {
  color: red;
}
.link .link {
  color: green;
}
.link.link {
  color: blue;
}
.link,
.linkish {
  color: cyan;
}
```

## 变量

`@`开头

> 注意点:变量有作用域，只能给自己和后代元素用，出了最外层的{}，别的类没法调用。

```less
.box {
  @width: 200px;
  @height: 500px;
  @my_color: #ccc;
  width: @width;
  height: @height;
  background: @my_color;
}

@index: 1;

.bl_@{index} {
  background-color: #55e276;
  color: #662424;
}

.button-group-base(@btnClassName) {
  > .@{btnClassName} {
    position: relative;
  }
}

.button-g-1 {
  .button-group-base(dis);
}
```

```css
.box {
  width: 200px;
  height: 500px;
  background: #cccccc;
}
.bl_1 {
  background-color: #55e276;
  color: #662424;
}
.button-g-1 > .dis {
  position: relative;
}
```

`@arguments`包含了所有传递进来的参数

```less
.bor(@w:3px,@c:@color,@s:solid) {
  border: @arguments;
}
.test {
  .bor();
}
```

```css
.test {
  border: 3px #5f30b0 solid;
}
```

## 运算

两个数参与运算，只有一个单位，结果就以这个单位为准。
两个数参与运算，都有单位，结果就以第一个为准。

```less
@width: 500px;
.box {
  width: @width - 50;
  color: #ccc - 10;
  width: 50% - 20px;
  width: 50px - 20%;
  height: 50 - 20px;
  height: 50 - 20%;
  border: 50% - 20;
  border: 50px - 20;
}
```

```css
.box {
  width: 450px;
  color: #c2c2c2;
  width: 30%;
  width: 30px;
  height: 30px;
  height: 30%;
  border: 30%;
  border: 30px;
}
```

## 混合

```less
.btn {
  border-radius: 15px;
}
.submit {
  .btn;
  background: red;
}
.star {
  .btn;
  background: #e65151;
}
```

```css
.btn {
  border-radius: 15px;
}
.submit {
  border-radius: 15px;
  background: red;
}
.star {
  border-radius: 15px;
  background: #e65151;
}
```

---

```less
.btn1(@color: red) {
  width: 120px;
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
  background: @color; /* 用参数表示 */
}

.submit1 {
  .btn1();
}
.star1 {
  .btn1(#55e276);
}
```

```css
.submit1 {
  width: 120px;
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
  background: #ff0000;
}
.star1 {
  width: 120px;
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
  background: #55e276;
}
```

## 匹配模式

```less
.atn(@_,@color: #fff) {
  /* 不同命名的公共部分要这样写，必须是@_，表示公共部分 */
  width: 120px;
  height: 30px;
  background: @color; /* 用参数表示 */
  cursor: pointer;
}
.atn(primary,@color) {
  border: 1px solid black;
}
.atn(danger,@color) {
  border: 1px solid red;
}
.atn-1 {
  .atn(primary);
}
.atn-2 {
  .atn(danger,#E65151);
}
.atn-3 {
  .atn(danger);
}
```

```css
.atn-1 {
  width: 120px;
  height: 30px;
  background: #ffffff;
  cursor: pointer;
}
.atn-2 {
  width: 120px;
  height: 30px;
  background: #e65151;
  cursor: pointer;
  border: 1px solid red;
}
.atn-3 {
  width: 120px;
  height: 30px;
  background: #ffffff;
  cursor: pointer;
}
```

## > 符号

```less
#bgcolor() {
  background: #fff;
  .a() {
    color: #888;
    &:hover {
      color: #ff6600;
    }
    .b() {
      background: #ff0000;
    }
  }
}

.bgcolor1 {
  background: #fdfee0;
  #bgcolor > .a;
}
.bgcolor2 {
  #bgcolor > .a > .b;
}
```

```css
.bgcolor1 {
  background: #fdfee0;
  color: #888;
}
.bgcolor1:hover {
  color: #ff6600;
}
.bgcolor2 {
  background: #ff0000;
}
```

## 避免编译

> `~''`

```less
.test {
  width: ~'calc(300px - 30px)';
  width: calc(300px - 30px);
  width: 'calc(300px - 30px)';
}
```

```css
.test {
  width: calc(300px - 30px);
  width: calc(270px);
  width: 'calc(300px - 30px)';
}
```

## Javascript 表达式

```less
.js {
  @var: ` 'hello' .toUpperCase() + '!' `;
  @height: `document.body.clientHeight`;

  content: @var;
  height: @height;
}
```

```css
.js {
  content: "HELLO!";
  height: 0;
}
```

## @media 媒体查询

```less
.media {
  background: #662424;
  @media (min-width: 400px) {
    background: blue;
  }
}
```

```css
.media {
  background: #662424;
}
@media (min-width: 400px) {
  .media {
    background: blue;
  }
}
```

## [函数](https://less.bootcss.com/functions)

> [`CSS_FUNCTIONS`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Functions)

### 字符串函数

```less
/*判断 是否为数字*/
isnumber(1234);   true

/*判断 是否为字符串*/
isstring('1234');   true

/*判断 是否为颜色*/
iscolor(#fff);   true

/*返回指定颜色*/
color("#aaa");   #aaa

/*向上取整*/
ceil(0.7)  1
/*向下取整*/
floor(3.3)  3
/*四舍五入*/
round(3.77)  4
/*指定一个或者多个参数的最小值*/
min(70,30,45,20)   20
/*指定一个或者多个参数的最大值*/
max(70,30,45,20)   70
// css宣布支持三角函数 less中也有一些三角函数的数学函数方法
/*正弦*/
sin(2)  0.90929742682
/*反正弦*/
asin(1)  1.5707963267948966
/*余弦*/
cos(2)   -0.4161468365471424
/*正切整*/
tan(60)   0.320040389379563

pi()   3.14159265
pow(2, 2) 4
```

```less
/*返回图片尺寸*/
image-size('./x.png');   64px 64px
/*返回图片宽度或高度*/
image-width('./x.png');   64px
image-height('./x.png');   64px

data-uri('./x.png');  url("data:image/png;base64,iVBORw0KGgo...")

@list: red, green 30%, blue;
svg-gradient(to right, @list); url('data:image/svg+xml,%3Csvg%20xm...")
```

### if

> Released: v3.0.0 Updated: v3.6.0

```less
@bg: black;
@bg-light: boolean(luma(@bg) > 50%);
@some: foo;

div {
  margin: if((2 > 1), 0, 3px);
  color: if((iscolor(@some)), @some, black);
  color: if(@bg-light, black, white);

}
```

```css
div {
  margin: 0;
  color: black;
  color: white;
}
```

---

```less
if(not (true), foo, bar);
if((true) and (2 > 1), foo, bar);
if((false) or (isstring("boo!")), foo, bar);
```

### [default](https://less.bootcss.com/functions/#misc-functions-default)

Available only inside guard conditions and returns true only if no other mixin matches, false otherwise.
仅当没有其他 mixin 匹配时才返回 true，否则返回 false

```less
.mixin(1) {
  x: 11;
}
.mixin(2) {
  y: 22;
}
.mixin(@x) when (default()) {
  z: @x;
}

div {
  .mixin(3);
}

div.special {
  .mixin(1);
}
```

```css
div {
  z: 3;
}
div.special {
  x: 11;
}
```

---

```less
.mixin1(@value) when (ispixel(@value)) {
  width: @value;
}
.mixin1(@value) when not(default()) {
  padding: (@value / 5);
}

div-1 {
  .mixin1(100px);
}

div-2 {
  /* ... */
  .mixin1(100%);
}
```

```css
div-1 {
  width: 100px;
  padding: 20px;
}
div-2 {
  /* ... */
}
```

---

```less
.x {
  .m(red) {
    case-1: darkred;
  }
  .m(blue) {
    case-2: darkblue;
  }
  .m(@x) when (iscolor(@x)) and (default()) {
    default-color: @x;
  }
  .m('foo') {
    case-1: I am 'foo';
  }
  .m('bar') {
    case-2: I am 'bar';
  }
  .m(@x) when (isstring(@x)) and (default()) {
    default-string: and I am the default;
  }

  &-blue {
    .m(blue);
  }
  &-green {
    .m(green);
  }
  &-foo {
    .m('foo');
  }
  &-baz {
    .m('baz');
  }
}
```

```css
.x-blue {
  case-2: darkblue;
}
.x-green {
  default-color: #008000;
}
.x-foo {
  case-1: I am 'foo';
}
.x-baz {
  default-string: and I am the default;
}
```

### [List Functions](https://less.bootcss.com/functions/#list-functions)

```less
l {
  @list: 'banana', 'tomato', 'potato', 'peach';
  len: length(@list);
  e: extract(@list, 3);
  /*Released v3.9.0*/
  r: range(10px, 40px, 10);
}
```

```css
l {
  len: 4;
  e: 'potato';
  r: 10px 20px 30px 40px;
}
```

---

> Released v3.7.0

```less
@selectors: blue, green, red;

each(@selectors, {
    .sel-@{value} {
      a: b;
    }
  });
```

```css
.sel-blue {
  a: b;
}
.sel-green {
  a: b;
}
.sel-red {
  a: b;
}
```

---

```less
@set: {
  one: blue;
  two: green;
  three: red;
};
.set {
  each(@set, {
      @{key}-@{index}: @value;
    });
}
```

```css
.set {
  one-1: blue;
  two-2: green;
  three-3: red;
}
```

---

```less
.set-2() {
  one: blue;
  two: green;
  three: red;
}
.set-2 {
  each(.set-2(), .(@v, @k, @i) {
    @{k}-@{i}: @v;
  });
}
```

```css
.set-2 {
  one-1: blue;
  two-2: green;
  three-3: red;
}
```

---

> Creating a for loop using range and each
> Requires Less v3.9.0

```less
each(range(4), {
  .col-@{value} {
    height: (@value * 50px);
  }
});
```

```css
.col-1 {
  height: 50px;
}
.col-2 {
  height: 100px;
}
.col-3 {
  height: 150px;
}
.col-4 {
  height: 200px;
}
```

## other

### Variable Variables

```less
@primary:  green;
@secondary: blue;

.section {
  @color: primary;

  .element {
    color: @@color;
  }
}
```

```css
.section .element {
  color: green;
}
```

---

```less
.foods() {
  @dessert: ice cream;
}

@key-to-lookup: dessert;

.lunch {
  treat: .foods[@@key-to-lookup];
}
```

```css
.lunch {
  treat: ice cream;
}
```

### Properties as Variables (NEW!)

> v3.0.0

```less
.widget {
  color: #efefef;
  background-color: $color;
}
```

```css
.widget {
  color: #efefef;
  background-color: #efefef;
}
```

```less
nav ul {
  &:extend(.inline);
  background: blue;
}
.inline {
  color: red;
}
```

```css
nav ul {
  background: blue;
}
.inline,
nav ul {
  color: red;
}
```