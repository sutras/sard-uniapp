<template>
  <sar-list card>
    <sar-list-item title="英文月日年" arrow hover @click="visible = true" />
  </sar-list>

  <sar-popout v-model:visible="visible" title="英文月日年">
    <template #visible="{ already }">
      <sar-datetime-picker
        v-if="already"
        v-model="date"
        type="Mdy"
        :formatter="formatter"
      />
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type DatetimeColumnOption, type DatetimeLetter } from 'sard-uniapp'

const visible = ref(false)
const date = ref<Date>()

const monthAbbreviations: Record<number, string> = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
}

function getEnglishDateRepresentation(day: number) {
  let suffix = 'th'

  if (day === 1 || day === 21 || day === 31) {
    suffix = 'st'
  } else if (day === 2 || day === 22) {
    suffix = 'nd'
  } else if (day === 3 || day === 23) {
    suffix = 'rd'
  }

  return day + suffix
}

const formatter = (letter: DatetimeLetter, option: DatetimeColumnOption) => {
  if (letter === 'M') {
    return monthAbbreviations[option.value - 1]
  }
  if (letter === 'd') {
    return getEnglishDateRepresentation(option.value)
  }
  if (letter === 'y') {
    return option.zerofill
  }
}
</script>
