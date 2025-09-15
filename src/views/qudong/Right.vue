<script setup lang="ts">
import AlarmPane from '~/components/AlarmPane.vue';

const active = ref(0);
const type = ref('前腔-1#压力测');
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
const tableData = [
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

const dimensions = ['时间', '实测', '预测', '上限', '下限'];

const source1 = [
  ['12:00', 120, 130],
  ['12:01', 80, 80],
  ['12:02', 150, 130],
  ['12:03', 120, 130],
  ['12:04', 100, 130],
  ['12:05', 110, 130],
  ['12:06', 120, 130],
  ['12:07', 150, 130],
]

const handleChange = (value: any) => {
  console.log(value)
}
</script>

<template>  
  <Title1 class="mg-t mg-l mg-r mg-b-lg">推进组压力</Title1>
  <ChartLines :dimensions="dimensions" :data="source1" :height="220" unit="m 3/h"/>  
  <div class="right-box mg-t mg-b-lg">
    <el-radio-group v-model="active" @change="handleChange">
      <el-radio-button :value="0">进浆流量</el-radio-button>
      <el-radio-button :value="1">排浆流量</el-radio-button>
    </el-radio-group>
    <el-select v-model="type" placeholder="请选择" :options="options" style="width: 114px;" />
  </div>
  <ChartLines :dimensions="dimensions" :data="source1" :height="220" unit="m 3/h"/>
  <Title1 class="mg-t mg-l mg-r">预测报警</Title1>
  <AlarmPane :collects="collects" :data="tableData" :height="200" />
</template>
