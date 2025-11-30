<template>
  <sar-card title="Trumpet to the Son of Heaven" :collapsed="collapsed">
    <template #extra>
      <sar-button
        type="pale-text"
        class="h-auto"
        @click="collapsed = !collapsed"
      >
        <sar-icon size="32rpx" :name="collapsed ? 'down' : 'up'" />
      </sar-button>
    </template>
    Trumpet, suona, small song, large cavity. The official ships are in chaos,
    all because of your bid. The army listened to the army, and the people
    listened to the people. Where to tell what is true and what is false? The
    sight blows over this house, blows the other one, only blows the water all
    the geese fly!
  </sar-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const collapsed = ref(true)
</script>
