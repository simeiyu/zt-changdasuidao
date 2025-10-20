<script setup lang="ts">
import * as echarts from 'echarts';
import { getLineOption } from '~/assets/constant';

const props = defineProps({
  dimensions: {
    type: Array as PropType<string[]>, 
    default: () => []
  },
  color: {
    type: Array as PropType<string[]>, 
    default: () => ["#0084FF", "#00B42A", "#F53F3F", "#FAAD14"]
  },
  data: {
    type: Array, 
    default: () => []
  },
  unit: {
    type: String,
    default: ''
  },
  height: {
    type: Number,
    default: 160
  }
})
const chartRef = ref<null | HTMLElement>(null);

let myChart: echarts.ECharts;
function onResize() {
  myChart.resize();
}

watch(() => props.data, (source) => {
  myChart.setOption({
    dataset: {
      dimensions: props.dimensions,
      source: source
    }
  })
})

watch(() => props.dimensions, (newDimensions) => {
  if (!myChart) return;
  myChart.clear();
  const option = getLineOption(newDimensions, props.unit);
  myChart.setOption({
    ...option,
    color: props.color,
    dataset: {
      dimensions: newDimensions,
      source: props.data
    }
  })
})

watch(() => props.unit, (newunit) => {
  if (!myChart) return;
  myChart.clear();
  const option = getLineOption(props.dimensions, newunit);
  myChart.setOption({
    ...option,
    color: props.color,
    dataset: {
      dimensions: props.dimensions,
      source: props.data
    }
  })
})

onMounted(() => {
  if (chartRef.value) {
    const option = getLineOption(props.dimensions, props.unit);
    myChart = echarts.init(chartRef.value);
    myChart.setOption({
      ...option,
      color: props.color,
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
  <div class="chart-line" ref="chartRef" :style="{height: `${height}px`}"></div>
</template>

<style scoped lang="scss">
.chart-line {
  width: 344px;
  margin-top: 10px;
}
</style>