<script setup lang="ts">
import AlarmPane from '~/components/AlarmPane.vue';
import WavePane from './WavePane.vue';
import { ElMessage } from 'element-plus';
import { forEach } from 'lodash';
import { algoPrefix } from '~/utils';

const collects = [
  {label: '本周报警', value: 0 },
  {label: '本月报警', value: 0 },
  {label: '累计报警', value: 3 },
]

const data = [
  {
    time: '2025-09-14 09:46',
    content: 'P2.1可能异常磨损，建议关闭故障泵的进浆阀、排浆阀，检查关键部位磨损量'
  },
  {
    time: '2025-07-12 15:54',
    content: 'P0.4可能异常磨损，建议关闭故障泵的进浆阀、排浆阀，检查关键部位磨损量'
  },
  {
    time: '2025-05-18 16:37',
    content: 'P1.1可能出现密封失效，建议关闭故障泵的进浆阀、排浆阀，进行排查'
  }
]
const flowRate = ref('inFlowRate')
const flowPressure = ref('inFlowPressure')

const dimensions = ['时间', '预测', '上限', '下限'];

const source = reactive<{ [key: string]: any[] }>({
  'inFlowRate': [],      // 进浆流量
  'outFlowRate': [],     // 排浆流量
  'inFlowPressure': [],  // 进浆压力
  'outFlowPressure': [], // 排浆压力
})

let timer: any = null;
// 泥水环流预测算法
const getMudWaterPredict = async () => {
  if (timer) {
    clearTimeout(timer);
  }
  try {
    const res = await fetch(`${algoPrefix}/getAlgoResult?algoName=mudWaterPredict`, {
      method: 'GET',
      mode: 'cors',
    });
    const {success, data} = await res.json();
    if (success) {
      // console.log('mudWaterPredict: ', data);
      const keys = Object.keys(source);
      const sourceData: { [key: string]: any[] } = {
        inFlowRate: [],
        outFlowRate: [],
        inFlowPressure: [],
        outFlowPressure: []
      }
      forEach(data, (item) => {
        const time = item['time'];
        forEach(keys, (key) => {
          const values = []
          values.push(Math.round(item.data[key] * 100) / 100);
          values.push(Math.round(item.data[`${key}Max`] * 100) / 100);
          values.push(Math.round(item.data[`${key}Min`] * 100) / 100);
          sourceData[key].push([time, ...values]);
        })
      })
      source['inFlowRate'] = sourceData['inFlowRate'];
      source['outFlowRate'] = sourceData['outFlowRate'];
      source['inFlowPressure'] = sourceData['inFlowPressure'];
      source['outFlowPressure'] = sourceData['outFlowPressure'];
    } else {
      throw new Error('Failed to fetch algo result');
    }
    timer = setTimeout(() => {
      getMudWaterPredict();
    }, 60000); // 1 second
  } catch (error) {
    ElMessage.error('Error fetching algo result:' + error);
  }
}

onMounted(() => {
  getMudWaterPredict();
});

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer);
  }
});
</script>

<template>  
  <el-radio-group class="flow-radio" v-model="flowRate">
    <el-radio-button :value="'inFlowRate'">进浆流量</el-radio-button>
    <el-radio-button :value="'outFlowRate'">排浆流量</el-radio-button>
  </el-radio-group>
  <ChartLines :dimensions="dimensions" :data="source[flowRate]" unit="m 3/h"/>
  
  <el-radio-group class="flow-radio" v-model="flowPressure">
    <el-radio-button :value="'inFlowPressure'">进浆压力</el-radio-button>
    <el-radio-button :value="'outFlowPressure'">排浆压力</el-radio-button>
  </el-radio-group>
  <ChartLines :dimensions="dimensions" :data="source[flowPressure]" unit="bar"/>
  <WavePane />
  <AlarmPane :collects="collects" :data="data" />
</template>

<style scoped lang="scss">
.flow-radio {
  margin: 8px;
}

</style>