<template>
  <view class="reels">
    <view v-for="(translateY, index) in offset" :key="index" class="reel-box">
      <view class="reel" :style="{ transform: `translateY(${translateY}%)` }">
        <view
          v-for="prize in renderedPrizes"
          :key="prize.id"
          class="prize-item"
        >
          <view class="prize-icon">
            <sar-icon family="cake" :name="prize.icon" />
          </view>
          <view class="prize-name">{{ prize.name }}</view>
        </view>
      </view>
    </view>
  </view>
  <view class="play-btn" @click="onPlay()">点我抽奖</view>

  <sar-dialog
    v-model:visible="dialogVisible"
    :show-cancel="false"
    confirm-text="收下"
  >
    <view v-if="winningPrize.length > 0" class="dialog-prize">
      <view class="dialog-prize-icon">
        <sar-icon
          v-for="(prize, index) in winningPrize"
          :key="index"
          family="cake"
          :name="prize.icon"
        />
      </view>
      <view class="dialog-prize-title">
        <text>恭喜你抽中</text>
        <text class="dialog-prize-name">
          “{{ winningPrize.map((prize) => prize.name).join('、') }}”
        </text>
      </view>
    </view>
  </sar-dialog>
</template>

<script setup lang="ts">
import { useSlotMachine } from 'sard-uniapp'
import { computed, onMounted, ref } from 'vue'
import { getPrizesApi, getMultiPrizeApi, type Prize } from './utils'

const prizes = ref<Prize[]>([])
const renderedPrizes = computed(() => {
  return prizes.value.length === 0 ? [] : [...prizes.value, prizes.value[0]]
})
const winningPrize = ref<Prize[]>([])
const dialogVisible = ref(false)
const columns = ref<number[]>([])

const { play, stop, pause, offset } = useSlotMachine({
  columns,
  complete: (indexes) => {
    winningPrize.value = indexes.map((index) => prizes.value[index])
    dialogVisible.value = true
  },
})

const onPlay = () => {
  play()
  getMultiPrizeApi([8, 8, 8])
    .then((multiPrizes) => {
      stop(
        multiPrizes.map((prize) =>
          prizes.value.findIndex((item) => item.id === prize.id),
        ),
      )
    })
    .catch(() => pause())
}

onMounted(() => {
  getPrizesApi(8).then((res) => {
    columns.value = [8, 8, 8]
    prizes.value = res
  })
})
</script>

<style scoped lang="scss">
.reels {
  box-sizing: border-box;
  display: flex;
  height: 240rpx;
  gap: 20rpx;
  padding: 0 20rpx;
  border: 10rpx solid #ffddcf;
  border-radius: 32rpx;
  background-color: #fffbef;
}

.reel-box {
  flex: 1;
  height: 100%;
  overflow: hidden;
  background-color: #fff0cb;
}
.reel {
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
}

.prize-item {
  flex: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.prize-icon {
  font-size: 72rpx;
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
  height: 100rpx;
  margin-top: 20rpx;
  border-radius: 24rpx;
  font-weight: 500;
  color: #fff;
  background-color: #f02020;
  box-shadow: inset 0 -8rpx 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.dialog-prize {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 60rpx 32rpx;
}
.dialog-prize-icon {
  display: flex;
  gap: 32rpx;
  font-size: 96rpx;
  text-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.2);
}
.dialog-prize-title {
  margin-top: 32rpx;
  font-size: 32rpx;
  text-align: center;
}
.dialog-prize-name {
  color: #eb7e50;
  font-weight: 600;
}
</style>
