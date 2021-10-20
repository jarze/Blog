---
title: docker-1
date: 2021-07-12 11:41:34
tags:
  - docker
---

# 基本概念

`Docker` 包括三个基本概念

- 镜像（`Image`）
- 容器（`Container`）
- 仓库（`Repository`）

<!-- more -->

```bash

#使用docker ps命令获取容器的ID 。
 docker ps

# 使用docker stop命令停止容器。
# Swap out <the-container-id> with the ID from docker ps
 docker stop <the-container-id>

# 容器停止后，可以使用以下docker rm命令将其删除。
 docker rm <the-container-id>

```

Docker 镜像（Image），就相当于是一个 root 文件系统。分层存储

```
docker image
docker container
```

Docker 镜像 是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（如匿名卷、环境变量、用户等）。镜像 不包含 任何动态数据，其内容在构建之后也不会被改变。

镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的 类 和 实例 一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。

容器的实质是进程，但与直接在宿主执行的进程不同，容器进程运行于属于自己的独立的 命名空间。

数据卷的生存周期独立于容器，容器消亡，数据卷不会消亡。因此，使用数据卷后，容器删除或者重新运行之后，数据却不会丢失。

---

## 数据卷（Volume）

```
docker volume
```

数据卷 是一个可供一个或多个容器使用的特殊目录，它绕过 UFS，可以提供很多有用的特性：

- 数据卷 可以在容器之间共享和重用
- 对 数据卷 的修改会立马生效
- 对 数据卷 的更新，不会影响镜像
- 数据卷 默认会一直存在，即使容器被删除

### 挂载一个主机目录作为数据卷

使用 --mount 标记可以指定挂载一个本地主机的目录到容器中去。

```
$ docker run -d -P --name web --mount type=bind,source=/src/webapp,target=/usr/share/nginx/html nginx
```

## 使用网络

Docker 允许通过外部访问容器或容器互联的方式来提供网络服务。

容器中可以运行一些网络应用，要让外部也可以访问这些应用，可以通过 -P 或 -p 参数来指定端口映射。
当使用 -P 标记时，Docker 会随机映射一个端口到内部容器开放的网络端口。

## Docker Compose

Compose 项目是 Docker 官方的开源项目，负责实现对 Docker 容器集群的快速编排。从功能上看，跟 OpenStack 中的 Heat 十分类似。

它允许用户通过一个单独的 docker-compose.yml 模板文件（YAML 格式）来定义一组相关联的应用容器为一个项目（project）。
Compose 中有两个重要的概念：

- 服务 (service)：一个应用的容器，实际上可以包括若干运行相同镜像的容器实例。
- 项目 (project)：由一组关联的应用容器组成的一个完整业务单元，在 docker-compose.yml 文件中定义。

Compose 的默认管理对象是项目，通过子命令对项目中的一组容器进行便捷地生命周期管理。

### Compose 模板文件

```bash
version: "3"

services:
  webapp:
    image: examples/web
    ports:
      - "80:80"
    volumes:
      - "/data"

  web:
    build: .

```

- **image** 指定镜像
- **build** 指定 Dockerfile 所在文件夹的路径（可以是绝对路径，或者相对 docker-compose.yml 文件的路径）。 Compose 将会利用它自动构建这个镜像，然后使用这个镜像。在 Dockerfile 中设置的选项(例如：CMD, EXPOSE, VOLUME, ENV 等) 将会自动被获取，无需在 docker-compose.yml 中重复设置。
  - **context** 指定 Dockerfile 所在文件夹的路径
  - **dockerfile** 指令指定 Dockerfile 文件名。
  - **arg** 指令指定构建镜像时的变量。
  - **cache_from** 指定构建镜像的缓存

## swarm

| Command                 | Description                           |
| ----------------------- | ------------------------------------- |
| docker swarm ca         | Display and rotate the root CA        |
| docker swarm init       | Initialize a swarm                    |
| docker swarm join       | Join a swarm as a node and/or manager |
| docker swarm join-token | Manage join tokens                    |
| docker swarm leave      | Leave the swarm                       |
| docker swarm unlock     | Unlock swarm                          |
| docker swarm unlock-key | Manage the unlock key                 |
| docker swarm update     | Update the swarm                      |

运行 Docker 的主机可以主动初始化一个 Swarm 集群或者加入一个已存在的 Swarm 集群，这样这个运行 Docker 的主机就成为一个 Swarm 集群的节点 (node) 。

节点分为管理 (manager) 节点和工作 (worker) 节点。

管理节点用于 Swarm 集群的管理，docker swarm 命令基本只能在管理节点执行（节点退出集群命令 docker swarm leave 可以在工作节点执行）。一个 Swarm 集群可以有多个管理节点，但只有一个管理节点可以成为 leader，leader 通过 raft 协议实现。

工作节点是任务执行节点，管理节点将服务 (service) 下发至工作节点执行。管理节点默认也作为工作节点。你也可以通过配置让服务只运行在管理节点。

来自 Docker 官网的这张图片形象的展示了集群中管理节点与工作节点的关系。

{% asset_img swarm-diagram.png swarm-diagram %}

### 服务和任务

任务 （Task）是 Swarm 中的最小的调度单位，目前来说就是一个单一的容器。

服务 （Services） 是指一组任务的集合，服务定义了任务的属性。服务有两种模式：

- replicated services 按照一定规则在各个工作节点上运行指定个数的任务。
- global services 每个工作节点上运行一个任务

两种模式通过 docker service create 的 --mode 参数指定。
来自 Docker 官网的这张图片形象的展示了容器、任务、服务的关系。

{% asset_img services-diagram.png services-diagram %}
