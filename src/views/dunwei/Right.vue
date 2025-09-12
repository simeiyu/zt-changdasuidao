<script setup lang="ts">
import AlarmPane from '~/components/AlarmPane.vue';

const active = ref('前腔-1#压力测');
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

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
  <Title1 class="mg-t mg-l mg-r">压力高位阶段/注脂阶段</Title1>
  <div class="flex flex-end mg-t-lg mg-l mg-r">
    <el-select v-model="active" placeholder="请选择" :options="options" style="width: 140px;" />
  </div>
  <Title1 class="mg-t mg-l mg-r">预测报警</Title1>
  <AlarmPane :collects="collects" :data="data" :height="200" />
</template>
