<script setup lang="ts">
import * as echarts from 'echarts';
import { getLineOption } from '~/assets/constant';

const props = defineProps({
  dimensions: {
    type: Array,
    default: () => []
  },
  data: {
    type: Array, 
    default: () => []
  },
  unit: {
    type: String,
    default: ''
  }
})
const chartRef = ref<null | HTMLElement>(null);
const option = getLineOption(props.unit);

let myChart: echarts.ECharts;
function onResize() {
  myChart.resize();
}

watch(() => props.data, () => {
  myChart.setOption({
    dataset: {
      dimensions: props.dimensions,
      source: props.data
    }
  })
})

onMounted(() => {
  if (chartRef.value) {
    myChart = echarts.init(chartRef.value);
    myChart.setOption({
      ...option,
      dataset: {
        dimensions: props.dimensions,
        source: props.data
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
  <div class="chart-line" ref="chartRef"></div>
</template>

<style scoped lang="scss">
.chart-line {
  width: 344px;
  height: 160px;
  margin-top: 10px;
}
</style>