<script setup lang="ts">
import { filter, find, forEach, map, toNumber } from 'lodash';
import AlarmPane from '~/components/AlarmPane.vue';
import socket, { state } from '~/socket';

const active = ref('0');
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
const color = ["#0084FF", "#F53F3F", "#FAAD14", "#00B42A"]
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

const dimensions = ['time', '进排浆流量差', '上限', '下限'];
const dimensions2 = ['time', '实测', '最大设定值'];

const source1 = [
  ['12:00', 120, 120, 130],
  ['12:01', 80, 120, 80],
  ['12:02', 150, 120, 130],
  ['12:03', 120, 120, 130],
  ['12:04', 100, 120, 130],
  ['12:05', 110, 120, 130],
  ['12:06', 120, 120, 130],
  ['12:07', 150, 120, 130],
]

const daopanSource = reactive<Record<string, any[]>>({
  "0": [],
  "1": [],
  "2": []
})

const handleChange = (value: any) => {
  console.log(value)
}

const handleEmit = () => {
  socket.emit("series:watch", { state: '刀盘总推进力', minutes: 10, intervalMs: 10000 } )
  socket.emit("series:watch", { state: '刀盘扭矩', minutes: 10, intervalMs: 10000 } )
  socket.emit("series:watch", { state: '贯入度', minutes: 10, intervalMs: 10000 } )
  socket.emit("series:watch", { type: '刀盘系统', minutes: 10, intervalMs: 10000 } )
}

onMounted(() => {
  console.log('刀盘系统 Right mounted')  
  !state.connected ? socket.on('connect', () => {
    handleEmit()
  }) : handleEmit()
  socket.on("series:init", (res: any) => {
    console.log('--- series:  init: ', res)
    const { type, const_data } = res
    switch (type) {
      case '刀盘总推进力':
        daopanSource["0"] = const_data;
        break;
      case '刀盘总推进力':
        daopanSource["1"] = const_data;
        break;
      case '贯入度':
        daopanSource["2"] = const_data;
        break;
      case '刀盘系统':
        // TODO
        break;
    }
  })
  socket.on("series:update", (res: any) => {
   console.log('--- series:update: ', res)
  })
})

onUnmounted(() => {
  socket.emit("series:unwatch", { state: '刀盘总推进力', minutes: 10, intervalMs: 10000 } )
  socket.emit("series:unwatch", { type: '刀盘系统', minutes: 10, intervalMs: 10000 } )
})
</script>

<template>  
  <Title1 class="mg-t mg-l mg-r mg-b-lg">推进泵流量差</Title1>
  <ChartLines :dimensions="dimensions" :data="source1" :height="220" unit="m 3/h" :color="color" />  
  <div class="right-box mg-t mg-b-lg">
    <el-radio-group v-model="active" @change="handleChange">
      <el-radio-button :value="'0'">刀盘总推进力</el-radio-button>
      <el-radio-button :value="'1'">刀盘扭矩</el-radio-button>
      <el-radio-button :value="'2'">贯入度</el-radio-button>
    </el-radio-group>
  </div>
  <ChartLines :dimensions="dimensions2" :data="daopanSource[active]" :height="220" unit="m 3/h" :color="color" />
  <Title1 class="mg-t mg-l mg-r">预测报警</Title1>
  <AlarmPane :collects="collects" :data="tableData" :height="200" />
</template>
