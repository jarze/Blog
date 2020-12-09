---
title: TTS（Text To Speah）
date: 2020-12-09 15:13:20
tags:
  - js
categories: Fun
---

在项目中需要对 ajax 请求返回的消息进行语音播报，str 为需要播报的信息（适应于错误信息语音提示等场景）:

<!-- more -->

```js
//语音播报
function voiceAnnouncements(str) {
  // 百度语音合成：或者使用新版地址https://tsn.baidu.com/text2audio
  var url =
    "http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text=" +
    encodeURI(str);
  var n = new Audio(url);
  n.src = url;
  n.play();
}

voiceAnnouncements(`
秋名山上路人稀，常有车手较高低；
如今车道依旧在，不见当年老司机。
司机车技今尚好，前端群里不寂寥；
向天再借五百年，誓言各行领风骚。
`);
```

- 参数解释：
  - lan：固定值 zh。语言选择,目前只有中英文混合模式，填写固定值 zh
  - ie:编码方式
  - spd：语速，取值 0-9，默认为 5 中语速
  - text：合成的文本，使用 UTF-8 编码。小于 512 个中文字或者英文数字。（文本在百度服务器内转换为 GBK 后，长度必须小于 1024 字节）
- React Native Text-To-Speech library for Android and iOS
- 用语音控制自己的网站 annyang：A tiny JavaScript Speech Recognition library that lets your users control your site with voice commands.annyang has no dependencies, weighs just 2 KB, and is free to use and modify under the MIT license。
