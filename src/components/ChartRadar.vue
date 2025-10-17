<script setup lang="ts">
import * as echarts from 'echarts';
import { map } from 'lodash';
import { radarOption } from '~/assets/constant';

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})
const colors = ["#0084FF", "#00B42A", "#F53F3F", "#FAAD14"]
const chartRef = ref(null);

let myChart: echarts.ECharts;
function onResize() {
  myChart.resize();
}

const RadarBg = {
  name: 'xxx',
  type: 'radar',
  symbolSize: 0,
  lineStyle: {
    color: '#C2C7CC',
    width: 2,
  },
  data: [
    {
      value: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      name: 'A'
    },
  ]
}

watch(() => props.data, (newData) => {
  myChart.setOption({
    // legend: {
    //   orient: 'vertical',
    //   left: 6,
    //   top: 'center',
    //   itemWidth: 8,
    //   itemHeight: 8,
    //   data: map(props.data, ({name},i) => ({name, itemStyle: {color: colors[i]}}))
    // },
    series: [RadarBg, {
      type: 'radar',
      symbolSize: 0,
      data: map(newData, (item: {name: string; value: number[]}, index: number) => {
        return {
          value: item.value,
          name: item.name,            
          lineStyle: {
            color: colors[index],
            width: 2,
          },
          areaStyle: {
            color: colors[index],
            opacity: index ? 0 : 0.1,
          },
        }
      })
    }],
  })
})

onMounted(() => {
  if (chartRef.value) {
    myChart = echarts.init(chartRef.value);
    myChart.setOption({
      ...radarOption,
      // legend: {
      //   orient: 'vertical',
      //   left: 6,
      //   top: 'center',
      //   itemWidth: 8,
      //   itemHeight: 8,
      //   data: map(props.data, ({name},i) => ({name, itemStyle: {color: colors[i]}}))
      // },
      series: [RadarBg, {
        type: 'radar',
        symbolSize: 0,
        data: map(props.data, (item: {name: string; value: number[]}, index: number) => {
          return {
            value: item.value,
            name: item.name,            
            lineStyle: {
              color: colors[index],
              width: 2,
            },
            areaStyle: {
              color: colors[index],
              opacity: index ? 0 : 0.1,
            },
          }
        })
      }],
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
  <div class="chart-radar" ref="chartRef"></div>
</template>

<style scoped lang="scss">
.chart-radar {
  width: 344px;
  height: 220px;
}
</style>