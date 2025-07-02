<template>
  <view class="grid-box">
    <view v-for="item in grids" :key="item" class="grid-item">
      <view
        v-if="item > -1"
        :class="['prize-item', { active: item === activeIndex }]"
      >
        <view class="prize-icon">
          <sar-icon family="cake" :name="prizes[item]?.icon" />
        </view>
        <view class="prize-name">{{ prizes[item]?.name }}</view>
      </view>
      <view v-else class="play-btn" @click="onPlay()">点我抽奖</view>
    </view>
  </view>

  <sar-dialog
    v-model:visible="dialogVisible"
    :show-cancel="false"
    confirm-text="收下"
  >
    <view v-if="winningPrize" class="dialog-prize">
      <view class="dialog-prize-icon">
        <sar-icon family="cake" :name="winningPrize.icon" />
      </view>
      <view class="dialog-prize-title">
        <text>恭喜你抽中</text>
        <text class="dialog-prize-name">“{{ winningPrize.name }}”</text>
      </view>
    </view>
  </sar-dialog>
</template>

<script setup lang="ts">
import { useLuckyGrid } from 'sard-uniapp'
import { onMounted, ref } from 'vue'
import { getPrizesApi, getPrizeApi, type Prize } from './utils'

const prizes = ref<Prize[]>([])
const winningPrize = ref<Prize>()
const dialogVisible = ref(false)

const { grids, activeIndex, play, stop, pause } = useLuckyGrid({
  complete: (index) => {
    winningPrize.value = prizes.value[index]
    dialogVisible.value = true
  },
})

const onPlay = () => {
  play()
  getPrizeApi(8)
    .then((prize) => {
      stop(prizes.value.findIndex((item) => item.id === prize.id))
    })
    .catch(() => pause())
}

onMounted(() => {
  getPrizesApi(8).then((res) => {
    prizes.value = res
  })
})
</script>

<style lang="scss" scoped>
.grid-box {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  width: 660rpx;
  height: 660rpx;
  margin: 0 auto;
  padding: 10rpx;
  border: 10rpx solid #ffddcf;
  border-radius: 32rpx;
  background-color: #fffbef;
}
.grid-item {
  box-sizing: border-box;
  width: 33.3333%;
  padding: 10rpx;
}
.prize-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 24rpx;
  background-color: #fff0cb;
  border: 2rpx solid rgba(0, 0, 0, 0.02);
  box-shadow: inset 0 -6rpx 0 rgba(0, 0, 0, 0.1);

  &.active {
    background-color: #ffd166;
  }
}
.prize-icon {
  font-size: 72rpx;
  line-height: 1;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
}
.prize-name {
  margin-top: 20rpx;
  font-weight: 500;
  font-size: 22rpx;
  color: #eb7e50;
  line-height: 32rpx;
}
.play-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 24rpx;
  font-weight: 500;
  color: #fff;
  background-color: #f02020;
  box-shadow: inset 0 -6rpx 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.dialog-prize {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 60rpx 0;
}
.dialog-prize-icon {
  font-size: 160rpx;
  text-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.2);
}
.dialog-prize-title {
  margin-top: 32rpx;
  font-size: 32rpx;
  line-height: 32rpx;
}
.dialog-prize-name {
  color: #eb7e50;
  font-weight: 600;
}
</style>
