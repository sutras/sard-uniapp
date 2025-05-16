<template>
  <div class="home-container">
    <div class="home-hero">
      <div class="home-logo">
        <div class="backlight"></div>
        <img :src="`${base}/logo.svg`" />
      </div>
      <div class="home-name">Sard Uniapp</div>
      <div class="home-title">基于 Uniapp + Vue3 兼容多端的 UI 组件库</div>
      <div class="home-subtitle">
        提供了丰富的组件，会大幅度提高您的开发速度
      </div>
      <div class="home-actions">
        <a class="home-action main" href="./guide/quickstart">快速开始</a>
        <a class="home-action" href="./guide/intro">介绍</a>
      </div>
    </div>
    <div class="features">
      <div class="feature">
        <div class="icon">💪</div>
        <div class="title">兼容多端</div>
        <div class="details">支持一套代码同时开发 H5 / 小程序 / App</div>
      </div>
      <div class="feature">
        <div class="icon">📖</div>
        <div class="title">文档和案例</div>
        <div class="details">提供详细的文档和案例展示，助你流畅使用</div>
      </div>
      <div class="feature">
        <div class="icon">ʦ</div>
        <div class="title">TypeScript</div>
        <div class="details">使用 TypeScript 编写，提供完整的类型定义</div>
      </div>
      <div class="feature">
        <div class="icon">⭐️</div>
        <div class="title">零依赖</div>
        <div class="details">零外部依赖，不依赖三方 `npm` 包，更加可控</div>
      </div>
      <div class="feature">
        <div class="icon">🌿</div>
        <div class="title">Tree Shaking</div>
        <div class="details">按需引入，用到哪个打包哪个，减少打包体积</div>
      </div>
      <div class="feature">
        <div class="icon">🌈</div>
        <div class="title">定制主题</div>
        <div class="details">
          所有组件都提供丰富的 css 变量，助你快速自由定制主题
        </div>
      </div>
      <div class="feature">
        <div class="icon">🌙</div>
        <div class="title">暗黑模式</div>
        <div class="details">仅需引入暗黑主题文件，无需额外操作</div>
      </div>
      <div class="feature">
        <div class="icon">🧪</div>
        <div class="title">单元测试</div>
        <div class="details">单元测试覆盖率超过 80%，保障稳定性</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'DocHome',
})

const base = import.meta.env.BASE_URL
</script>

<style lang="scss" scoped>
.home-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 32px;
}

.home-logo {
  position: relative;
  width: 160px;
  height: 160px;
  margin: 0 auto;

  .backlight {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      -45deg,
      rgba(var(--sc-primary-rgb), 0.3) 30%,
      rgba(var(--sc-indigo-rgb), 0.3)
    );
    filter: blur(80px);
  }

  img {
    width: 100%;
    height: 100%;
    filter: drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.15));
  }
}

.home-hero {
  margin: 0 auto;
  padding: 96px 0;
  text-align: center;
}

.home-name {
  display: inline-block;
  font-size: 76px;
  line-height: 1.25;
  font-weight: 900;
  letter-spacing: -1.5px;
  background: linear-gradient(135deg, var(--sc-cyan), var(--sc-primary));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.home-title {
  font-size: 40px;
  line-height: 1.6;
}

.home-subtitle {
  margin-top: 24px;
  line-height: 36px;
  font-size: 24px;
  color: var(--sc-secondary-color);
}

.home-actions {
  display: flex;
  justify-content: center;
  margin-top: 32px;
  gap: 12px;
}

.home-action {
  display: inline-block;
  padding: 0 20px;
  border: 1px solid var(--sc-secondary-bg);
  border-radius: 20px;
  font-size: 14px;
  line-height: 38px;
  font-weight: 600;
  color: var(--sc-body-color);
  white-space: nowrap;
  text-align: center;
  background-color: var(--sc-secondary-bg);
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }

  &:active {
    background-color: var(--sc-tertiary-bg);
  }

  &.main {
    color: #fff;
    background-color: var(--sc-primary);

    &:active {
      background-color: var(--sc-blue-600);
    }
  }
}

.features {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin: 0 auto 48px;
}

.feature {
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-radius: 12px;
  background-color: var(--sc-gray-100);
  transition: border-color 0.25s, background-color 0.25s;

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    border-radius: 6px;
    background-color: var(--sc-secondary-bg);
    width: 48px;
    height: 48px;
    font-size: 24px;
    transition: background-color 0.25s;
  }

  .title {
    line-height: 24px;
    font-size: 16px;
    font-weight: 600;
  }

  .details {
    flex-grow: 1;
    padding-top: 8px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 500;
    color: var(--sc-tertiary-color);
  }
}

@media (max-width: 940px) {
  .features {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .home-container {
    padding: 0 16px;
  }

  .home-hero {
    padding: 48px 0;
  }

  .home-logo {
    width: 80px;
    height: 80px;
  }

  .home-name {
    font-size: 38px;
  }

  .home-title {
    font-size: 24px;
    line-height: 1.4;
  }

  .home-subtitle {
    margin-top: 16px;
    font-size: 16px;
  }

  .features {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 425px) {
  .features {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
