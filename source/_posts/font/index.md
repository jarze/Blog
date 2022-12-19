---
title: font
date: 2022-12-19 16:23:08
tags:
  - css
categories:
  - Front
  - css
---

- [`font-family`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-family)
- https://mp.weixin.qq.com/s/EkFv7W8aX4yzSrFfDPG9IQ

```css
/* 一个字体族名和一个通用字体族名 */
font-family: "Gill Sans Extrabold", sans-serif;
font-family: "Goudy Bookletter 1911", sans-serif;

/* 仅有一个通用字体族名 */
font-family: serif;
font-family: sans-serif;
font-family: monospace;
font-family: cursive;
font-family: fantasy;
font-family: system-ui;
font-family: ui-serif;
font-family: ui-sans-serif;
font-family: ui-monospace;
font-family: ui-rounded;
font-family: emoji;
font-family: math;
font-family: fangsong;

/* 全局值 */
font-family: inherit;
font-family: initial;
font-family: revert;
font-family: revert-layer;
font-family: unset;

```

```css
{
  font-family: system-ui, -apple-system, BlinkMacSystemFont, segoe ui, Roboto, Helvetica, Arial, sans-serif;
}
```

<!-- more -->

<!-- toc -->

## `font-family`关键字

```
font-family = [ <family-name> | <generic-family> ]#
```
CSS 属性 font-family 允许您通过给定一个有先后顺序的，由字体名或者字体族名组成的列表来为选定的元素设置字体。

属性值用逗号隔开。浏览器会选择列表中第一个该计算机上有安装的字体，或者是通过 @font-face 指定的可以直接下载的字体。

属性 font-family 列举一个或多个由逗号隔开的字体族。每个字体族由 `<family-name>` 或 `<generic-name>` 值指定。

- `<family-name>`
一个字体族的名字。例如`"Times"` 和 `"Helvetica"` 都是字体族名。字体族名可以包含空格，但包含空格时应该用引号。

- `<generic-name>`
通用字体族名是一种备选机制，用于在指定的字体不可用时给出较好的字体。通用字体族名都是关键字，所以不可以加引号。在列表的末尾应该至少有一个通用字体族名。以下是该属性可能的取值以及他们的定义。

  - **`serif`**
  带衬线字体，笔画结尾有特殊的装饰线或衬线。例如：`Lucida Bright, Lucida Fax, Palatino, "Palatino Linotype", Palladio, "URW Palladio", serif`.

  - **`sans-serif`**
  无衬线字体，即笔画结尾是平滑的字体。例如： `"Open Sans", "Fira Sans", "Lucida Sans", "Lucida Sans Unicode", "Trebuchet MS", "Liberation Sans", "Nimbus Sans L", sans-serif`.

  - **`monospace`**
  等宽字体，即字体中每个字宽度相同。例如： `"Fira Mono", "DejaVu Sans Mono", Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace`.

  - **`cursive`**
  草书字体。这种字体有的有连笔，有的还有特殊的斜体效果。因为一般这种字体都有一点连笔效果，所以会给人一种手写的感觉。例如：`"Brush Script MT", "Brush Script Std", "Lucida Calligraphy", "Lucida Handwriting", "Apple Chancery", cursive`.

  - **`fantasy`**
  Fantasy 字体主要是那些具有特殊艺术效果的字体。例如：`Papyrus, Herculanum, Party LET, Curlz MT, Harrington, fantasy`.

  - **`system-ui`**
  从浏览器所处平台处获取的默认用户界面字体。由于世界各地的排版习惯之间有很大的差异，这个通用选项 is provided for typefaces that don't map cleanly into the other generics.

  - **`math`**
  针对显示数学相关字符的特殊样式问题而设计的字体：支持上标和下标、跨行括号、嵌套表达式和具有不同含义的 double struck glyphs。

  - **`emoji`**
  专门用于呈现 Emoji 表情符号的字体。

  - **`fangsong`**
  一种汉字字体，介于宋体和楷体之间。这种字体常用于某些政府文件。

## 衬线字体与非衬线字体

- 衬线字体（英文为 `serif`）：意为有衬线的字体，衬线的意思是在字符笔画末端有叫做衬线的小细节的额外装饰，而且笔画的粗细会有所不同，这些细节在大写字母中特别明显。
- 非衬线字体（英文为 `sans-serif`）：sans 的意思是无，sans-serif 也就是无衬线的意思。专指西文中没有衬线的字体，与汉字字体中的黑体相对应。与衬线字体相反，该类字体通常是机械的和统一线条的，它们往往拥有相同的曲率，笔直的线条，锐利的转角。