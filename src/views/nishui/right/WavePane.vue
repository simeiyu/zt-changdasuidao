<script setup lang="ts">
import * as echarts from 'echarts';
import { waveOption } from '~/assets/constant';

const active = ref(0)
const type = ref('排浆泵振动')

const chartRef = ref(null);

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
    // myChart.setOption(waveOption);
    myChart.setOption({
      ...waveOption,
      dataset: {
        dimensions: ['时间', '实测', '预测', '上限', '下限'],
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
  <div class="wave-top">
    <el-radio-group v-model="active" @change="handleChange">
      <el-radio-button :value="0">时域波形</el-radio-button>
      <el-radio-button :value="1">频域波形</el-radio-button>
    </el-radio-group>
    <el-select v-model="type" placeholder="请选择" :options="options" style="width: 114px;" />
  </div>
  <div class="flow-line" ref="chartRef"></div>
</template>

<style scoped lang="scss">
.wave-top {
  margin: 12px 8px 0;
  display: flex;
  justify-content: space-between;
}

.flow-line {
  height: 160px;
  margin-top: 10px;
}
</style>