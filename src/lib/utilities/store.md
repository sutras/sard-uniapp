---
nav: 工具
title: 全局状态
group:
  title: 工程化
---

## 介绍

全局状态存储库允许你跨页面、跨组件共享状态。

下面演示如何使用 `pinia` 以及编写持久化全局状态插件。

## 安装 pinia

```bash
npm install pinia@2
```

必须安装 `pinia@2` 版本，更高版本不支持。

## 创建 pinia 实例并注册

```ts
import { createPinia } from 'pinia'
import { createSSRApp } from 'vue'

const pinia = createPinia()

const app = createSSRApp(App)

app.use(pinia)
```

## 创建 store

```ts
// stores/user.ts

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const token = ref('')

  return {
    token,
  }
})
```

## 使用

```html
<script setup lang="ts">
  import { useUserStore } from '@/stores/user'

  const userStore = useUserStore()

  userStore.token = 'QWERTYUIOP'

  console.log(userStore.token)
</script>
```

## 持久化全局状态

在 `pinia` 中使用 `Persist` 将需要的全局状态进行持久化处理。

### 定义 pinia 插件

```ts
// stores/plugin.ts

import persist from '@/utils/persist'
import { type PiniaPluginContext } from 'pinia'
import { watch } from 'vue'

declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface DefineStoreOptionsBase<S, Store> {
    persist?: {
      pick: (keyof S)[]
    }
  }
}

export function piniaPluginPersist(context: PiniaPluginContext) {
  const {
    store,
    options: { persist: storePersist },
  } = context

  const pickKeys = storePersist?.pick || []

  const persistKey = `pinia:${store.$id}`

  const localData = persist.get(persistKey) || {}

  store.$patch(localData)

  watch(
    pickKeys.map((key) => () => store[key]),
    () => {
      persist.set(
        persistKey,
        Object.fromEntries(pickKeys.map((key) => [key, store[key]])),
      )
    },
  )
}
```

### 注册插件

```ts
// stores/index.ts

import { createPinia } from 'pinia'
import { piniaPluginPersist } from './plugin'

const pinia = createPinia()

pinia.use(piniaPluginPersist)
```

### 声明需要持久化的全局状态

```ts
// stores/user.ts

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')

    return {
      token,
    }
  },
  {
    persist: {
      pick: ['token'],
    },
  },
)
```

如上，在 `defineStore` 第三个参数的选项对象中，`persist.pick` 数组中声明的状态就是要持久化处理的。

在应用启动阶段，会读取硬盘中的状态并初始化；状态值改变时，会保存到硬盘中。
