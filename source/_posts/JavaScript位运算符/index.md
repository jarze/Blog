---
title: JavaScript位运算符
date: 2020-12-09 16:10:52
tags: js
categories:
  - Front
  - js
---

[JavaScript 位运算符](https://www.w3school.com.cn/js/js_bitwise.asp)

<!-- more -->

---

- 使用&运算符判断一个数的奇偶（只需记住 0 和 1 与 1 进行&运算的结果即可）：
  - 偶数 & 1 = 0
  - 奇数 & 1 = 1
- 使用~~，>>,<<,>>>,|来取整：
  - ~~Math.PI：3（按位取反再取反）
  - Math.PI>>0，Math.PI<<0，Math.PI>>>0：3（按位左移或者右移 0 位，>>>不可用于负数）
  - Math.PI|0：3，按位异或
- 使用<<,>>来计算乘除：
  - 整数左移 n 位相当于乘 2 的 n 次方；
  - 右移相当于除以 2 的 n 次方，再向下取整
- 利用^来完成比较两个数是否相等：!(a ^ b)
- 使用^来完成值交换：参考第十五式
- 使用&,>>,|来完成 rgb 值和 16 进制颜色值之间的转换

  - 16 进制颜色值转 RGB：

  ```js
  function hexToRGB(hex) {
    hex = hex.replace('#', '0x');
    let r = hex >> 16;
    let g = (hex >> 8) & 0xff;
    let b = hex & 0xff;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }
  hexToRGB('#cccccc'); // rgb(204,204,204)
  ```

  - RGB 转 16 进制颜色值：

  ```js
  function RGBToHex(rgb) {
    let rgbArr = rgb.split(/[^\d]+/);
    let color = (rgbArr[1] << 16) | (rgbArr[2] << 8) | rgbArr[3];
    return '#' + color.toString(16);
  }
  RGBToHex('rgb(204,204,204)'); // #cccccc
  ```

---

<iframe src="https://www.w3school.com.cn/js/js_bitwise.asp" width="100%" height="100vh" style="min-height: 800px;" />
