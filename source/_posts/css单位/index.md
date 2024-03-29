---
title: css单位
date: 2021-01-29 11:22:37
tags: css
categories:
  - Front
  - css
---

<!-- toc -->


- [MDN](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Values_and_units)

<!-- more -->

# 浏览器支持

> 下表中的数字表示支持该长度单位的最低浏览器版本。

| 长度单位                          | Chrome | IE     | Firefox | Safari | Opera |
| --------------------------------- | ------ | ------ | ------- | ------ | ----- |
| em, ex, %, px, cm, mm, in, pt, pc | 1.0    | 3.0    | 1.0     | 1.0    | 3.5   |
| ch                                | 27.0   | 9.0    | 1.0     | 7.0    | 20.0  |
| rem                               | 4.0    | 9.0    | 3.6     | 4.1    | 11.6  |
| vh, vw                            | 20.0   | 9.0    | 19.0    | 6.0    | 20.0  |
| vmin                              | 20.0   | 9.0\*  | 19.0    | 6.0    | 20.0  |
| vmax                              | 26.0   | 不支持 | 19.0    | 不支持 | 20.0  |

<!-- more -->

# 相对长度

> 相对长度单位指定了一个长度相对于另一个长度的属性。对于不同的设备相对长度更适用。
> 提示: rem 与 em 有什么区别呢？区别在于使用 rem 为元素设定字体大小时，仍然是相对大小，但相对的只是 HTML 根元素。

| 单位 | 描述                                                                                          |
| ---- | --------------------------------------------------------------------------------------------- |
| em   | 在 font-size 中使用是相对于父元素的字体大小，在其他属性中使用是相对于自身的字体大小，如 width |
| ex   | 字符“x”的高度                                                                                 |
| ch   | 数字 0                                                                                        |
| rem  | rem 是根元素字体大小。                                                                        |
| lh   | 元素的 line-height                                                                            |
| vw   | viewpoint width，视窗宽度，1vw=视窗宽度的 1%                                                  |
| vh   | viewpoint height，视窗高度，1vh=视窗高度的 1%                                                 |
| vmin | vw 和 vh 中较小的那个。                                                                       |
| vmax | vw 和 vh 中较大的那个。                                                                       |
| %    | 相对父元素百分比                                                                              |

# 绝对长度

> 绝对长度单位是一个固定的值，它反应一个真实的物理尺寸。绝对长度单位视输出介质而定，不依赖于环境（显示器、分辨率、操作系统等）。

| 单位 | 名称         | 等价换算            |
| ---- | ------------ | ------------------- |
| cm   | 厘米         | 1cm = 96px/2.54     |
| mm   | 毫米         | 1mm = 1/10th of 1cm |
| Q    | 四分之一毫米 | 1Q = 1/40th of 1cm  |
| in   | 英寸         | 1in = 2.54cm = 96px |
| pc   | 十二点活字   | 1pc = 1/6th of 1in  |
| pt   | 点           | 1pt = 1/72th of 1in |
| px   | 像素         | 1px = 1/96th of 1in |


# 角度单位[`<angle>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/angle)

| 单位 | 描述                            | 换算                 |
| ---- | ------------------------------- | -------------------- |
| deg  | 度(Degress)。一个圆共360度      | 90deg                |
| grad | 梯度(Gradians)。一个圆共400梯度 | 100grad              |
| rad  | 弧度(Radians)。一个圆共2π弧度   | 1.570796326794897rad |
| turn | 转、圈(Turns)。一个圆共1圈      | 0.25turn             |