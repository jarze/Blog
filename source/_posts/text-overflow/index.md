---
title: CSS实现单行、多行文本溢出显示省略号（…）
date: 2020-06-28 15:41:18
tags: css
categories:
  - Front
  - css
---

如果实现单行文本的溢出显示省略号同学们应该都知道用 `text-overflow:ellipsis` 属性来，当然还需要加宽度 `width` 属来兼容部分浏览。

<!-- more -->

**实现方法：**

```javascript
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
```

**效果如图：**
{% asset_img one-line.jpg %}

但是这个属性只支持单行文本的溢出显示省略号，如果我们要实现多行文本溢出显示省略号呢。
接下来重点说一说多行文本溢出显示省略号，如下。

**实现方法：**

```javascript
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
```

**效果如图：**
{% asset_img muti-line.jpg %}

**适用范围：**
因使用了 `WebKit` 的 `CSS` 扩展属性，该方法适用于 `WebKit` 浏览器及移动端；
_注：_

- `-webkit-line-clamp` 用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的 `WebKit` 属性。常见结合属性：
- `display: -webkit-box`; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
- `-webkit-box-orient` 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。

**实现方法：**

```javascript
p{
	position: relative; line-height: 20px; max-height: 40px;overflow: hidden;
	}
p::after{
	content: "..."; position: absolute; bottom: 0; right: 0; padding-left: 40px;
	background: -webkit-linear-gradient(left, transparent, #fff 55%);
	background: -o-linear-gradient(right, transparent, #fff 55%);
	background: -moz-linear-gradient(right, transparent, #fff 55%);
	background: linear-gradient(to right, transparent, #fff 55%);
}
```

**效果如图：**
{% asset_img muti-line-2.jpg %}

**适用范围：**
该方法适用范围广，但文字未超出行的情况下也会出现省略号,可结合 `js` 优化该方法。
_注：_

- 将 `height` 设置为 `line-height` 的整数倍，防止超出的文字露出。
- 给 `p::after` 添加渐变背景可避免文字只显示一半。
- 由于 `ie6-7` 不显示 `content` 内容，所以要添加标签兼容 `ie6-7`（如：`<span>…<span/>`）；兼容 ie8 需要将`::after` 替换成`:after`。
