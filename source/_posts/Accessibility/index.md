---
title: 无障碍与可访问-Accessibility
date: 2022-04-12 15:20:04
tags: 
- Accessibility
- WCAG
---

---

<!-- toc -->

---

## 无障碍?

特指环境或制度的一种属性，即一切有关人类衣食住行的公共空间环境以及各类建筑设施、设备的使用，都必须充分服务具有不同程度生理伤残缺陷者和正常活动能力衰退者（如残疾人、老年人），营造一个充满爱与关怀、切实保障人类安全、方便、舒适的现代生活环境。

<p v-click>引申出的相关词汇有：无障碍设计，无障碍设施，无障碍出行，无障碍交流，无障碍服务!</p>
<p v-click >

### 无障碍设计
主要考虑以下 4 个主要方面：

- 视觉无障碍设计（visual）
- 听觉无障碍设计（hearing）
- 行动无障碍设计（mobility）
- 认知无障碍设计（cognition）
</p>
<div v-click >

- 📝 **无障碍设施** - 无障碍卫生间,无障碍车位,无障碍电影
- 🎨 **屏幕阅读器** - 为有视觉障碍的人放大屏幕上的内容
- 🧑‍💻 **AI字幕** - 为听障人士自动生成字幕
- 🤹 **控制器** - 帮助有运动障碍的人使用电子设备;用户通过嘴部与控制器进行交互，以控制电脑, xbox无障碍手柄
</div>

<!--
You can have `style` tag in markdown to override the style for the current page.
Learn more: https://sli.dev/guide/syntax#embedded-styles
-->

<style>
h2 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}

</style>

---

## [Resdesign——无障碍设计](https://mp.weixin.qq.com/s/c3TGPuWvQZFiUWq5jX95Jg)
无障碍设计这个概念名称始见于1974年，是联合国组织提出的设计新主张。

<p v-click >

> 误区1 无障碍设计只适用于残疾人

三种类型的残疾: 永久性、临时性和情境性。对于每种类型的残疾，人们有可能需要无障碍帮助的情况。
</p>

<p v-click >

> 误区2 无障碍设计只为残疾人士提供更好的服务

视频字幕的最初目的是帮助有听力障碍或语言理解问题的人更好地理解他们在看什么。但是对于那些可能在嘈杂环境中或者在练习第二语言的听力理解的用户而言，字幕也能方便他们阅读他们所要听到的内容。

这就是所谓的“人行道斜坡效应”，即无障碍环境可以改善每个人群的整体体验，而不仅仅是那些残疾人。

</p>
<p v-click >

### [关于无障碍，我们都想错了什么？](https://mp.weixin.qq.com/s/w41qC8K4j6QNLBuIbn4TFg)
</p>
<p v-click >

### [无障碍设计师](https://zhuanlan.zhihu.com/p/119766231)
</p>

---

## 无障碍：法律要求

不仅仅只有同理心来驱使设计师把可达性放在心里，法律也是其中一个因素。

<p v-click >
根据美国人残疾法案第三章：网站和应用程序属于公共场所（According to the Americans With Disabilities Act, Title III: “Websites and apps are places of public accommodations”.）
这意味着，如果有一个网站或app没有提供给有障碍群体使用权，就像有一个没有轮椅坡道的建筑入口，这将被视为歧视。

《联合国残疾人权利公约》(UN CRPD)将获得包括网络在内的信息和通信技术定义为一项基本人权.
</p>
<p v-click >

###  🔴 Web无障碍
([法律和政策因素](https://www.w3.org/WAI/business-case/archive/pol.php))

Web 可访问性要求可以采用政策、法律、法规、标准、指南、指令、通信、命令或其他类型的文档的形式。[Web Accessibility Laws & Policies](https://www.w3.org/WAI/policies/)列出了许多国家和地区的政府立法和相关信息。

一些政府的法律特别要求某些类型的网站可以访问。例如，一些接受政府资助的组织必须遵守政府的无障碍政策。其他政府可能不会直接指定 Web 可访问性，但 Web 被更广泛的反歧视立法、信息和通信技术 (ICT) 政策或其他法律或政策间接涵盖。在某些国家/地区，组织的内部网和内部应用程序受到要求在工作场所为残疾人提供无障碍便利的法律或针对年长员工的年龄歧视立法。

非政府政策可能要求组织使其网站可访问，例如要求部门网站可访问的大学 Web 可访问性政策。有时，组织被迫遵守其他政策，例如来自贸易或行业协会、专业协会或标准组织的政策。
</p>

<style>
h3 {
    color: cadetblue;
}
</style>
---

## [Web Accessibility](https://www.w3.org/WAI/fundamentals/accessibility-intro/zh-hans)
Web从根本上是为所有人设计的，无论他们的硬件、软件、语言、位置或能力如何。当web达到这一目标时，具有不同听力、运动、视觉和认知能力的人就可以访问它。

因此，残疾对Web的影响发生了根本性的变化，因为Web消除了许多人在现实世界中面临的沟通和互动障碍。然而，当网站、应用程序、技术或工具设计得很糟糕时，它们可能会造成阻碍，使人们无法使用Web。

对于想要创建高质量网站和web工具的开发人员和组织来说，无障碍是必不可少的，这就不会让一些人在使用他们的产品和服务的时候被排除在外。
<p v-click >

Web无障碍包括所有影响浏览网页的障碍，包括:
- 听觉
- 认知能力
- 神经损伤
- 身体上的
- 语言
- 视觉
</p>

---

## [Web Accessibility Initiative(WAI)](https://www.w3.org/WAI/)
使残障人士可以访问 Web 的策略、标准和资源


- 🚩 [Web 内容可访问性指南 <mark>(WCAG)</mark>](https://www.w3.org/WAI/standards-guidelines/wcag/)
WCAG 材料包括使网站和 Web 应用程序更好地为残障人士以及因年龄增长而需要辅助功能的老年用户工作的指南和技术。

  网络“内容”一般是指网页或网络应用程序中的信息，包括：
  自然信息，例如文本、图像和声音
  定义结构、表示等的代码或标记。
  WCAG 适用于动态内容、多媒体、“移动”等。WCAG 也可应用于非网络信息和通信技术 (ICT)，如WCAG2ICT中所述。
- 🚩 [用户代理可访问性指南 <mark>(UAAG)</mark>](https://www.w3.org/WAI/standards-guidelines/uaag/)
UAAG 解释了如何使 Web 浏览器和媒体播放器可访问。浏览器功能对于具有可访问性需求的老年用户尤其重要，这些需求应该通过浏览器来满足，而不是需要额外的[辅助技术](/WAI/planning/involving-users/#at)。

  用户代理包括浏览器、浏览器扩展、媒体播放器、阅读器和其他呈现 Web 内容的应用程序。
- 🚩 [创作工具可访问性指南 <mark>(ATAG)</mark>](https://www.w3.org/WAI/standards-guidelines/atag/)
  创作工具是“作者”（Web 开发人员、设计师、作家等）用来制作 Web 内容的软件和服务。例如：HTML 编辑器、内容管理系统 (CMS) 和允许用户添加内容的网站，例如博客和社交网站。ATAG 文件解释了如何：使创作工具本身可访问，以便残障人士可以创建 Web 内容，以及帮助作者创建更易于访问的 Web 内容。

<style>
.content {
  font-size: 0.7rem;
}
</style>
---

## [Web Content Accessibility Guidelines(WCAG)](https://www.w3.org/Translations/WCAG21-zh/#sotd)

《Web内容无障碍指南》是一套国际公认的无障碍功能标准。它涵盖了使Web内容更易于访问的各种建议。遵循这些准则将使更多残疾人更容易获取网站内容，其中包括失明和弱视、耳聋和听力丧失、运动受限、言语障碍、光敏性和多种残疾组合的残疾人，以及有学习障碍和认知局限的残疾人; 但不会满足这些残疾用户的所有需求。这些准则旨在解决台式机，笔记本电脑，平板电脑和移动设备上的Web内容的无障碍问题。遵循这些准则通常也会使网站内容对用户更友好。

<p v-click >
🏀 WCAG 主要用于：

- Web 内容开发人员（页面作者、网站设计人员等）
- Web 创作工具开发人员
- Web 可访问性评估工具开发人员
- 其他想要或需要 Web 可访问性标准（包括移动可访问性）的人
</p>
<p v-click >

🏀 “POUR准则”。你的产品或服务必须:
- (P) Perceivable可感知性>以所有用户都能理解的方式介绍网站的信息和组成部分。
- (O) Operable可操作性>提供不同方式让有障碍群体可以和内容进行互动。
- (U) Understandable可理解性> 确保我们的网页内容可以被有障碍群体理解，这样他们就可以使用我们的界面。
- (R) Robust稳定性> 内容必须足够稳定，以便于可以兼容不同的设备，以便广大用户，包括使用辅具的用户能够获取内容。
</p>

---

## Accessibility(A11Y)

目前国内对这一块讨论得不是很多，有出海欧美业务的公司会比较关注，但如果未来国内把这类要求提上来，那也会是一个强需求，而现在已经初见苗头

- [A11Y（Accessibility 可访问性）的研发投入到底值不值？| GMTC](https://mp.weixin.qq.com/s/2-N-d4YIvza-OK8ApSlAGQ)
- [写前端代码时请多为残障人士思考之『Accessibility』](https://mp.weixin.qq.com/s/AzmV_aAOW42-AVM9Rj6ygQ)


除了视觉内容外，可访问性（a11y）的重要性可能还会增加。Web 越来越多地被各种各样的人所占据，为所有人提供良好的体验应该是所有设计师的主要目标。

尤其是像社交媒体和新闻杂志这样更具通用性的网站应该为不同的残疾人提供易用性。但是，a11y 的意义远不止于此，它通过响应键盘按钮、触摸手势等细微细节，甚至提高了日常用户的舒适度。网站实施的这类功能越多，用户越有可能会喜欢它。

- https://zh-hans.reactjs.org/docs/accessibility.html
- https://vuejs.org/guide/best-practices/accessibility.html
- https://semi.design/zh-CN/start/accessibility
- https://vuetifyjs.com/zh-Hans/features/accessibility/
- https://material.io/design/usability/accessibility.html#understanding-accessibility
- https://github.com/ant-design/ant-design/issues?q=accessibility+label%3A%22%E2%8C%A8%EF%B8%8F+Accessibility%22
- https://www.apple.com.cn/accessibility/hearing/
- https://support.mozilla.org/zh-CN/kb/%E6%97%A0%E9%9A%9C%E7%A2%8D%E7%8E%AF%E5%A2%83

---

## Web 开发

- https://developer.mozilla.org/zh-CN/docs/Learn/Accessibility
- https://developer.mozilla.org/zh-CN/docs/Web/Accessibility
- https://www.w3.org/WAI/design-develop/
- https://mp.weixin.qq.com/s/H4jjDbWC6DTvyDcBXZtLBQ


