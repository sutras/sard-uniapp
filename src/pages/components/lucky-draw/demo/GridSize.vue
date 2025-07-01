<template>
  <view class="grid-box">
    <view
      v-for="item in grids"
      :key="item"
      class="grid-item"
      :style="{ width: 100 / column + '%' }"
    >
      <view
        class="grid-item-inner"
        :style="{
          width: item === -1 ? centerSize.column * 100 + '%' : '',
          height: item === -1 ? centerSize.row * 100 + '%' : '',
        }"
      >
        <view
          v-if="item > -1"
          :class="['prize-item', { active: item === activeIndex }]"
        >
          <view class="prize-icon">
            <sar-icon family="cake" :name="prizes[item]?.icon" />
          </view>
          <view class="prize-name">{{ prizes[item]?.name }}</view>
        </view>
        <view v-else-if="item === -1" class="play-btn" @click="onPlay()">
          点我抽奖
        </view>
      </view>
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
import { useLuckyGrid, getGridPrizeCount } from 'sard-uniapp'
import { computed, ref } from 'vue'
import { getPrizeApi, getPrizes, type Prize } from './utils'

const row = ref(4)
const column = ref(5)
const prizes = computed(() => {
  return getPrizes().slice(0, getGridPrizeCount(row.value, column.value))
})
const winningPrize = ref<Prize>()
const dialogVisible = ref(false)

const { grids, activeIndex, centerSize, play, stop, pause } = useLuckyGrid({
  row,
  column,
  complete: (index) => {
    winningPrize.value = prizes.value[index]
    dialogVisible.value = true
  },
})

const onPlay = () => {
  play()
  getPrizeApi(getGridPrizeCount(row.value, column.value))
    .then((prize) => {
      stop(prizes.value.findIndex((item) => item.id === prize.id))
    })
    .catch(() => pause())
}
</script>

<style lang="scss" scoped>
.grid-box {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  width: 660rpx;
  height: 600rpx;
  margin: 0 auto;
  padding: 10rpx;
  border: 10rpx solid #ffddcf;
  border-radius: 32rpx;
  background-color: #fffbef;
}
.grid-item {
  position: relative;
  box-sizing: border-box;
  width: 33.3333%;
}
.grid-item-inner {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
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
  font-size: 48rpx;
  line-height: 1;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
}
.prize-name {
  margin-top: 12rpx;
  font-weight: 500;
  font-size: 22rpx;
  color: #eb7e50;
  line-height: 32rpx;
}
.play-btn {
  position: relative;
  z-index: 1;
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
