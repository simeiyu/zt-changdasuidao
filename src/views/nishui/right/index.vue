<script setup lang="ts">
import AlarmPane from '~/components/AlarmPane.vue';
import FlowPane from './FlowPane.vue';
import Pressure from './Pressure.vue';
import WavePane from './WavePane.vue';

const collects = [
  {label: '今日报警', value: 2 },
  {label: '本月报警', value: 3 },
  {label: '累计报警', value: 5 },
]
const data = [
  {
    time: '2022-01-01 12:00:00',
    content: '设备1报警'
  },
  {
    time: '2022-01-01 12:00:00',
    content: '设备2报警'
  },
  {
    time: '2022-01-01 12:00:00',
    content: '设备3报警'
  }
]
</script>

<template>  
  <FlowPane />
  <Pressure />
  <WavePane />
  <Title1 class="mg-t-sm mg-l mg-r">预测报警</Title1>
  <AlarmPane :collects="collects" :data="data" />
</template>
