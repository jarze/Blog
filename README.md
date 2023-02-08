# [`Hexo`](https://hexo.io/zh-cn/) Blog

- 启动服务

`hexo server`

- 生成静态文件

`hexo generate`

- 新建文章

`hexo new [layout] <title>`

- 清除缓存文件(db.json) 和已生成的静态文件 (public)。

`hexo clean`

- 列出网站资料。

`hexo list <type>`


# 使用

- 列表页显示简介
 `<!-- more -->`
- 目录
  `<!-- toc -->`
- 不显示评论
  `<style id='none-comment'></style>`
- 链接
  `{% asset_link 1.pdf %}`
- 图片
  `{% asset_img 1.png PNG %}`

