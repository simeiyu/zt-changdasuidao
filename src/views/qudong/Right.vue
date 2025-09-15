<script setup lang="ts">
import AlarmPane from '~/components/AlarmPane.vue';

const active = ref(0);
const type = ref('1#电机');
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

const list = [{label: '1#', status: 1}, {label: '2#', status: 1}, {label: '3#', status: 1}, {label: '4#', status: 0}, {label: '5#', status: 1}, {label: '6#', status: 1}, {label: '7#', status: 1}, {label: '8#', status: 1}, {label: '9#', status: 1}, {label: '10#', status: 1}, {label: '11#', status: 1}, {label: '12#', status: 1}, {label: '13#', status: 1}, {label: '14#', status: 1}]
</script>

<template>  
  <Title1 class="mg-t mg-l mg-r">电机健康状态</Title1>
  <ul class="list">
    <li v-for="item in list" :key="item.label" class="list-item" :class="{'warn': item.status === 0}">{{ item.label }}</li>
  </ul>
  <ChartRadar />
  <Title1 class="mg-t mg-l mg-r mg-b-lg">振动分析</Title1>
  <div class="right-box">
    <el-radio-group v-model="active" @change="handleChange">
      <el-radio-button :value="0">时域波形</el-radio-button>
      <el-radio-button :value="1">频域波形</el-radio-button>
    </el-radio-group>
    <el-select v-model="type" placeholder="请选择" :options="options" style="width: 100px;" />
  </div>
  <ChartWave :data="source1" unit="m 3/h"/>
  <Title1 class="mg-t mg-l mg-r">预测报警</Title1>
  <AlarmPane :collects="collects" :data="tableData" />
</template>

<style lang="scss" scoped>
.list {
  margin: 12px 0;
  padding: 0 4px;
  list-style: none;

  &-item {
    display: inline-block;
    width: 58px;
    height: 49px;
    padding: 24px 4px 4px;
    margin: 0 4px 4px;
    text-align: center;
    color: var(--el-text-color-secondary);
    background: #F4F6F9 url('~/assets/images/dianji@2x.png') no-repeat center 8px;
    background-size: 16.5px 12px;

    &.warn {
      background-image: url('~/assets/images/dianji_warn@2x.png');
    }
  }
}
</style>