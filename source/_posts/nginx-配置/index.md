---
title: nginx-配置
date: 2022-06-28 16:01:06
tags:
---

---

<!-- more -->

# Nginx解决“no resolver defined to resolve xxx.xxx”

在nginx的配置文件中的`http{}`部分添加一行 `resolver 8.8.8.8;`


# nginx反向代理处理301、302跳转

```conf

server {
    ...

    location / {
        proxy_pass http://127.0.0.1:8081;
				# 确定代码大于或等于 300 的代理响应是否应传递给客户端或被拦截并重定向到 nginx 以使用error_page指令进行处理。
        proxy_intercept_errors on;
				#使用error_page 指令 启用或禁用执行多个重定向 。这种重定向的数量是有限的。
				recursive_error_pages on;
        error_page 301 302 307 = @handle_redirects;
    }

    location @handle_redirects {
      set $saved_redirect_location $upstream_http_location;
      proxy_pass $saved_redirect_location;
    }


```

# nginx 配置 html 不缓存

``` conf

    location ~.*\.(htm|html)$ {
      root /usr/share/nginx/html;
      index index.html index.htm;
      try_files $uri /index.html;
      add_header Cache-Control 'no-cache, no-store, must-revalidate';
    }

```