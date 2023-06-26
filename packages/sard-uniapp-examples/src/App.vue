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
@import 'sard-uniapp/components/index.scss';

// #ifdef H5
:root {
  &::-webkit-scrollbar {
    display: none;
  }
}
// #endif

page {
  min-height: calc(100vh - var(--window-top) - var(--window-bottom));
  color: var(--sar-body-color);
  background-color: var(--sar-body-bg);
}
</style>
