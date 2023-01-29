---
title: js实现浏览器全屏
date: 2023-01-29 16:32:13
tags: js
categories:
  - Front
  - js
---

``` javascript
function requestFullScreen(element) {
  var requestMethod = element.requestFullScreen || //W3C
  element.webkitRequestFullScreen || //Chrome等
  element.mozRequestFullScreen || //FireFox
  element.msRequestFullScreen; //IE11
  if (requestMethod) {
    requestMethod.call(element);
  } else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
    var wscript = new ActiveXObject("WScript.Shell");
    if (wscript !== null) {
      wscript.SendKeys("{F11}");
    }
  }
}

function exitFull() {
  var exitMethod = document.exitFullscreen || //W3C
  document.mozCancelFullScreen || //Chrome等
  document.webkitExitFullscreen || //FireFox
  document.webkitExitFullscreen; //IE11
  if (exitMethod) {
    exitMethod.call(document);
  } else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
    var wscript = new ActiveXObject("WScript.Shell");
    if (wscript !== null) {
      wscript.SendKeys("{F11}");
    }
  }
}

```