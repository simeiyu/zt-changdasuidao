<script setup lang="ts">
import * as echarts from 'echarts';
import { ElMessage } from 'element-plus';
import { map } from 'lodash';
import AlarmPane from '~/components/AlarmPane.vue';

const chartRef1 = ref<null | HTMLElement>(null);
const chartRef2 = ref<null | HTMLElement>(null);
const active = ref('1');
const source = ref<{
  [key: string]: {
    chart_type: string;
    data_list: Array<any[]>;
    data_type_name: string;
    historical_data: Array<any>;
    name_list: Array<string>;
  }
}>({
  1: {
    chart_type: 'line',
    data_list: [[]],
    data_type_name: '',
    historical_data: [],
    name_list: [],    
  }
})
const dianwei = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'];
const option = {
  grid: {
    top: 24,
    left: 16,
    right: 16,
    bottom: 16,
    containLabel: true,
  },
  legend: {
    top: 0,
    right: 16,
    itemWidth: 8,
    itemHeight: 4,
    itemGap: 12,
    padding: 0,
    icon: "rect",
    textStyle: {
      fontSize: 11,
      color: "#3D3D3D",
    },
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      lineStyle: {
        color: "#ABABAB",
        type: "dashed",
        width: 1,
        opacity: 1,
      },
    },
    appendToBody: true,
  },
  xAxis: {
    type: "value",
    boundaryGap: false,
    axisLine: {
      show: true,
      lineStyle: {
        color: "#E5E6EB",
        width: 0.6,
        type: "solid",
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      margin: 6,
      color: "#4E5969",
      fontSize: 10,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "#E5E6EB",
        width: 0.6,
        opacity: 1,
        type: "dashed",
      },
    },
  },
  yAxis: {
    type: "value",
    scale: true,
    name: name,
    nameTextStyle: {
      fontSize: 10,
      color: "#828D99",
      align: "right",
      verticalAlign: "middle",
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "#E5E6EB",
        width: 0.6,
      },
    },
    axisLabel: {
      color: "#4E5969",
      fontSize: 10,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "#E5E6EB",
        width: 0.6,
        opacity: 1,
        type: "dashed",
      },
    },
  }
}
let myChart1: echarts.ECharts;
let myChart2: echarts.ECharts;
function onResize() {
  myChart1.resize();
  myChart2.resize();
}


const collects = [
  { label: '今日报警', value: 2 },
  { label: '本月报警', value: 3 },
  { label: '累计报警', value: 5 },
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

let timer: any = null;
// 盾尾密封
const getTailShield = async () => {
  if (timer) {
    clearTimeout(timer);
  }
  try {
    const res = await fetch(`/getAlgoResult?algoName=tailShield`, {
      method: 'GET'
    });
    const { success, data } = await res.json();
    if (success) {
      source.value = data;
      updateCharts()
    } else {
      throw new Error('Failed to fetch algo result');
    }
    // timer = setTimeout(() => {
    //   getTailShield();
    // }, 60000); // 1 second
  } catch (error: Error | any) {
    ElMessage.error('Error fetching algo result:' + error.message);
  }
}

const getChartHistoricalOption = (data: Array<number[]>) => {
  return {
    ...option,    
    grid: {
      top: 8,
      left: 16,
      right: 16,
      bottom: 16,
      containLabel: true,
    },
    legend: {
      show: false,
    },
    color: ["#0084FF", "#00B42A", "#F53F3F", "#FAAD14"],
    dataset: {
      dimensions: ['index', 'value'],
      source: map(data, (item, index) => [index, item])
    },
    series: {
      type: "line",
      name: "历史数据",
      symbol: "circle",
      symbolSize: 1,
      showSymbol: false,
      smooth: true,
    }
  }
}

const getChartLineOption = (dimensions: string[], data: Array<number[]>) => {
  return {
    ...option,
    legend: {
      ...option.legend,
      left: 16,
      type: 'scroll',
    },
    color: dimensions.length > 4 ? dimensions.map((_, index: number) => dimensions.length - 1 === index ? '#FF7D00' : `rgba(0, 132, 255, ${1 - index * 0.08})`) : ["#0084FF", "#00B42A", "#FAAD14", "#F53F3F"],
    dataset: {
      dimensions: ['index'].concat(dimensions),
      source: [map(data[0], (_, index) => index)].concat(data)
    },
    series: dimensions.map((item: string, index: number) => ({
      type: "line",
      name: item,
      symbol: "circle",
      symbolSize: 1,
      showSymbol: false,
      smooth: false,
      seriesLayoutBy: 'row',
      encode: {
        x: 0,
        y: index + 1,
        seriesName: index + 1,
      },
    }))
  }
}
const getChartScatterOption = (dimensions=['散点', '上限', '当前与右侧点位差值', '下限'], data: Array<number[]>) => {
  return {
    ...option,
    color: ["#0084FF", "#00B42A", "#F53F3F", "#FAAD14"],
    dataset: {
      dimensions: ['index'].concat(dimensions),
      source: data.length > 0 ? [map(data[0], (_, index) => index)].concat(data) : []
    },
    series: map(dimensions, (item: string, index: number) => ({
      type: index === 0 ? 'scatter' : 'line',
      name: item,
      symbol: "circle",
      symbolSize: index === 0 ? 12 : 1,
      showSymbol: index === 0,
      seriesLayoutBy: 'row',
      encode: {
        x: 0,
        y: index + 1,
        seriesName: index + 1,
      },
    }))
  }
}

const updateCharts = () => {
  if (chartRef1.value) {
    if (!myChart1) {
      myChart1 = echarts.init(chartRef1.value);
    } else {
      myChart1.clear();
    }
    const option1 = getChartHistoricalOption(source.value[active.value].historical_data);
    myChart1.setOption(option1)
  }
  if (chartRef2.value) {
    if (!myChart2) {
      myChart2 = echarts.init(chartRef2.value);
    } else {
      myChart2.clear();
    }
    const option2 = source.value[active.value].chart_type === 'line' ? getChartLineOption(source.value[active.value].name_list, source.value[active.value].data_list) : getChartScatterOption(source.value[active.value].name_list, source.value[active.value].data_list);
    myChart2.setOption(option2)
  }
}

watch(active, () => {
  updateCharts();
})

onMounted(() => {
  getTailShield()
  updateCharts();
  window.addEventListener('resize', onResize, false);
})

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer);
  }
})
</script>

<template>
  <Title1 class="mg-t mg-l mg-r">{{ source[active].data_type_name }}</Title1>
  <div class="flex flex-end mg-t-lg mg-l mg-r mg-b-lg">
    <el-select v-model="active" placeholder="请选择" style="width: 140px;">
      <el-option v-for="item in dianwei" :key="item" :label="`${item}#`" :value="`${item}`"></el-option>
    </el-select>
  </div>
  <div class="chart-line" ref="chartRef1"></div>
  <div class="chart-line" ref="chartRef2"></div>
  <Title1 class="mg-t mg-l mg-r">预测报警</Title1>
  <AlarmPane :collects="collects" :data="tableData" :height="200" />
</template>

<style scoped lang="scss">
.chart-line {
  width: 344px;
  height: 200px;
  margin-top: 10px;
}
</style>
