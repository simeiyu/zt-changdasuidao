<script setup lang="ts">
import * as echarts from 'echarts';
import { waveOption } from '~/assets/constant';

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

const chartRef = ref(null);

let myChart: echarts.ECharts;
function onResize() {
  myChart.resize();
}

watch(() => props.data, () => {
  myChart.setOption({
    dataset: {
      source: props.data
    }
  })
})

onMounted(() => {
  if (chartRef.value) {
    myChart = echarts.init(chartRef.value);
    myChart.setOption({
      ...waveOption,
      dataset: {
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
  <div class="chart-wave" ref="chartRef"></div>
</template>

<style scoped lang="scss">
.chart-wave {
  width: 344px;
  height: 160px;
  margin-top: 8px;
}
</style>