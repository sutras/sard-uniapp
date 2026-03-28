<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
onLaunch(() => {
  // console.log('App Launch')
})
onShow(() => {
  // console.log('App Show')
})
onHide(() => {
  // console.log('App Hide')
})
</script>

<style lang="scss">
@import 'sard-uniapp/index.scss';
@import 'sard-uniapp/dark.scss';
@import '@/style/demo-icons.css';
@import '@/style/cake.css';
@tailwind utilities;

::-webkit-scrollbar {
  display: none;
}

page {
  min-height: calc(100vh - var(--window-top) - var(--window-bottom));
  background-color: var(--sar-body-bg);
}

page,
.sar-portal {
  font-family:
    system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    'Noto Sans',
    'Liberation Sans',
    Arial,
    sans-serif,
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'Noto Color Emoji',
    monospace;
  font-size: var(--sar-text-base);
  line-height: 1.5;
  color: var(--sar-body-color);
  -webkit-tap-highlight-color: transparent;
}
</style>
