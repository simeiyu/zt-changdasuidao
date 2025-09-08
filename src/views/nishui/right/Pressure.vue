<script setup lang="ts">
import * as echarts from 'echarts';
import { getLineOption } from '~/assets/constant';

const active = ref(0)

const chartRef = ref(null);
const dimensions = ['时间', '实测', '预测', '上限', '下限'];
const option = getLineOption('bar', dimensions);

const data = [
  ['12:00', 120, 130, 170, 20],
  ['12:01', 80, 80, 180, 30],
  ['12:02', 150, 130, 170, 20],
  ['12:03', 120, 130, 170, 20],
  ['12:04', 100, 130, 170, 20],
  ['12:05', 110, 130, 170, 20],
  ['12:06', 120, 130, 170, 20],
  ['12:07', 150, 130, 170, 20],
]

let myChart: echarts.ECharts;
function onResize() {
  myChart.resize();
}

const handleChange = (value: any) => {
  console.log(value)
}

onMounted(() => {
  if (chartRef.value) {
    myChart = echarts.init(chartRef.value);
    // myChart.setOption(option);
    myChart.setOption({
      ...option,
      dataset: {
        dimensions,
        source: data
      }
    })
    window.addEventListener('resize',  onResize, false);
  }
})

onUnmounted(() => {
  window.removeEventListener('resize',  onResize, false);
  myChart.dispose();
});
</script>

<template>
  <el-radio-group class="flow-radio" v-model="active" @change="handleChange">
    <el-radio-button :value="0">进浆压力</el-radio-button>
    <el-radio-button :value="1">排浆压力</el-radio-button>
  </el-radio-group>
  <div class="flow-line" ref="chartRef"></div>
</template>

<style scoped lang="scss">
.flow-radio {
  margin: 8px;
}

.flow-line {
  height: 160px;
  margin-top: 10px;
}
</style>