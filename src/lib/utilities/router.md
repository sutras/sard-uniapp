---
nav: 工具
title: 路由
group:
  title: 工程化
version: 1.20+
---

## 介绍

uniapp 的路由接口已经十分简单了，但有时需要对路由进行统一拦截处理，例如未认证的用户访问需要认证的页面时，弹出登录窗口或跳转到登录页面。

本库实现了 `Router` 类，对 uniapp 路由接口进行简单包装，并添加了以下特性：

- 路由守卫
- 自动拼接查询参数
- 自动编码
- 避免多次跳转

## 使用

```ts
import { Router } from 'sard-uniapp'

const router = new Router()

router.navigateTo({
  url: '/pages/product-list/index?type=clothing',
  query: {
    page: 1,
    gender: 'man',
  },
})
```

Router 实现了和 uniapp 类似的接口，并添加了 `query` 选项，用于配置查询参数。所有查询参数都会使用 `encodeURIComponent` 进行编码，在 `onLoad` 中访问查询参数时，需要使用 `decodeURIComponent` 进行解码。

## 接口

和 uniapp 接口几乎一致。

```ts
/**
 * 保留当前页面，跳转到应用内的某个页面。
 */
Router#navigateTo(options)

/**
 * 关闭当前页面，跳转到应用内的某个页面。
 */
Router#redirectTo(options)

/**
 * 关闭所有页面，打开到应用内的某个页面。
 */
Router#reLaunch(options)

/**
 * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
 */
Router#switchTab(options)

/**
 * 关闭当前页面，返回上一页面或多级页面。
 */
Router#navigateBack(options)

/**
 * 路由守卫，可以阻止跳转或自定义跳转
 */
Router#beforeEach(guard: RouterGuard)
```

### RouterGuard

```ts
type RouterGuard = (
  to: Route,
  from: Route,
) =>
  | boolean
  | undefined
  | null
  | void
  | string
  | Route
  | Promise<boolean | undefined | null | void | string | Route>
```

### Route

```ts
interface Route {
  url: string
  query?: Record<string, any>
}
```

## 路由守卫

使用 `Router#beforeEach` 方法添加守卫

```ts
const authPages = ['/pages/my/profile']
const deprecatedPages = ['/pages/activity/spring']

router.beforeEach((to, from) => {
  const userStore = useUserStore()

  // 进入需要认证的页面时，如果没有认证则跳转到登录页
  if (authPages.includes(to.url) && !userStore.token) {
    // 可返回 url 字符串，或者对象
    return {
      url: '/pages/auth/login',
      query: {
        // 登录完可以重定向到之前的页面
        redirect: to.url,
        query: JSON.stringify(to.query),
      },
    }
  }

  if (deprecatedPages.includes(to.url)) {
    // 返回 false 表示阻止跳转
    return false
  }

  // 其他情况则正常跳转
})
```
