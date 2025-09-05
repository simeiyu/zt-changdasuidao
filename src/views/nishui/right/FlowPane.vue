<script setup lang="ts">
import * as echarts from 'echarts';

const active = ref(0)

const chartRef = ref(null);
const option = {}

let chartline: echarts.ECharts;
function onResize() {
  chartline.resize();
}
onMounted(() => {
  if (chartRef.value) {
    chartline = echarts.init(chartRef.value);
    chartline.setOption(option);
    window.addEventListener('resize',  onResize, false);
  }
})
</script>

<template>
  <el-radio-group class="flow-radio" v-model="active" size="small">
    <el-radio-button :value="0">进浆流量</el-radio-button>
    <el-radio-button :value="1">排浆流量</el-radio-button>
  </el-radio-group>
  <div class="flow-line"></div>
</template>

<style scoped lang="scss">
.flow-radio {
  margin-top: 8px;
}

.flow-line {
  height: 182px;
  background-color: #fff;
  margin-top: 10px;
}
</style>