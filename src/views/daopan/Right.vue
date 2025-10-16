<script setup lang="ts">
import { filter, find, forEach, map, toNumber } from 'lodash';
import AlarmPane from '~/components/AlarmPane.vue';
import socket, { state } from '~/socket';

const MAX_LEN = 80;
const active = ref('1');
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

const dimensions = ref(['time', '进排浆流量差', '上限', '下限']);
const dimensions2 = ['time', '实测', '最大设定值'];

const daopanSource = reactive<Record<string, any[]>>({
  "0": [],   // 推进泵流量差
  "1": [],   // 刀盘总推进力
  "2": [],   // 刀盘扭矩
  "3": []    // 贯入度
})

const handleChange = (value: any) => {
  console.log(value)
}

const handleEmit = () => {
  socket.emit("series:watch", { state: '推进泵流量差', minutes: 10, intervalMs: 10000 } )
  socket.emit("series:watch", { state: '刀盘总推进力', minutes: 10, intervalMs: 10000 } )
  socket.emit("series:watch", { state: '刀盘扭矩', minutes: 10, intervalMs: 10000 } )
  socket.emit("series:watch", { state: '贯入度', minutes: 10, intervalMs: 10000 } )
}

onMounted(() => {
  console.log('刀盘系统 Right mounted')  
  !state.connected ? socket.on('connect', () => {
    handleEmit()
  }) : handleEmit()
  socket.on("series:init", (res: any) => {
    const { type, const_data, states } = res
    switch (type) {
      case '刀盘总推进力':
        daopanSource["1"] = const_data;
        break;
      case '刀盘扭矩':
        daopanSource["2"] = const_data;
        break;
      case '贯入度':
        daopanSource["3"] = const_data;
        break;
      case '推进泵流量差':
        dimensions.value = ['time', ...states]
        daopanSource["0"] = const_data;
        // TODO
        break;
    }
  })
  socket.on("series:update", (res: any) => {
    const { type, const_data } = res
    console.log("update:", res)
    switch (type) {
      case '刀盘总推进力':
        daopanSource["1"] = getNewDaopanSource('1', const_data);
        break;
      case '刀盘扭矩':
        daopanSource["2"] = getNewDaopanSource('2', const_data);
        break;
      case '贯入度':
        daopanSource["3"] = getNewDaopanSource('3', const_data);
        break;
      case '推进泵流量差':
        daopanSource["0"] = getNewDaopanSource('1', const_data);
        // TODO
        break;
    }
  })
})

function getNewDaopanSource (key: string, data: any[]) {
  const newSource = daopanSource[key].concat(data);
  const len = newSource.length;
  return len > MAX_LEN ? newSource.slice(len - MAX_LEN) : newSource
}

onUnmounted(() => {
  socket.emit("series:unwatch", { type: '推进泵流量差' } )
  socket.emit("series:unwatch", { type: '刀盘总推进力' } )
  socket.emit("series:unwatch", { type: '刀盘扭矩' } )
  socket.emit("series:unwatch", { type: '贯入度' } )
})
</script>

<template>  
  <Title1 class="mg-t mg-l mg-r mg-b-lg">推进泵流量差</Title1>
  <ChartLines :dimensions="dimensions" :data="daopanSource[0]" :height="220" unit="m 3/h" :color="color" />  
  <div class="right-box mg-t mg-b-lg">
    <el-radio-group v-model="active" @change="handleChange">
      <el-radio-button :value="'1'">刀盘总推进力</el-radio-button>
      <el-radio-button :value="'2'">刀盘扭矩</el-radio-button>
      <el-radio-button :value="'3'">贯入度</el-radio-button>
    </el-radio-group>
  </div>
  <ChartLines :dimensions="dimensions2" :data="daopanSource[active]" :height="220" unit="m 3/h" :color="color" />
  <Title1 class="mg-t mg-l mg-r">预测报警</Title1>
  <AlarmPane :collects="collects" :data="tableData" :height="200" />
</template>
