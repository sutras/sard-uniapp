# 快速上手

## 安装

### 通过 npm 安装

```bash
npm install sard
```

### 通过 yarn 安装

```bash
yarn add sard
```

## 配置

### 多平台配置

在 `config/index.ts` 添加以下配置：

```ts
{
  mini: {
    webpackChain(chain) {
      chain.resolve.plugin('MultiPlatformPlugin').tap((args) => {
        args[2]['include'] = ['sard/']
        return args
      })
    }
  },
  h5: {
    webpackChain(chain) {
      chain.resolve.plugin('MultiPlatformPlugin').tap((args) => {
        args[2]['include'] = ['sard/']
        return args
      })
    }
  },
  rn: {
    resolve: {
      include: ['sard'],
    },
  }
}
```

### pxtransform 配置

如果启动了单位转换，需要添加选择器黑名单：

```ts
  ...
  pxtransform: {
    enable: false,
    config: {
      selectorBlackList: ['.sar-'],
    },
  },
  ...
```

## 引入

### 全局样式引入

```scss
@import 'sard/dist/index.scss';
```

## 使用组件

### Button 组件示例

```tsx
import { Button } from 'sard'

export default () => {
  return <Button>按钮</Button>
}
```
