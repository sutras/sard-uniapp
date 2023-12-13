<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
@use '@sard/uniapp/dist/index.scss';
@use '@sard/uniapp/dist/dark.scss';
@use './iconfont.css';

::-webkit-scrollbar {
  display: none;
}

:root,
page {
  min-height: calc(100vh - var(--window-top) - var(--window-bottom));
  color: var(--sar-body-color);
  background-color: var(--sar-body-bg);
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue',
    'Noto Sans', 'Liberation Sans', Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', monospace;
  font-size: var(--sar-text-base);
  -webkit-tap-highlight-color: transparent;
}
</style>
