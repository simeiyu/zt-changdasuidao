<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { forEach } from 'lodash';
import AlarmPane from '~/components/AlarmPane.vue';

const active = ref<'pressure' | 'flow'>('pressure');
const type = ref('1');

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

const dimensions = ['时间', '实测', '预测'];
const group = ref('A');
// 推进组压力
const groupSource = reactive<{ [key: string]: any[] }>({
  'A': [],
  'B': [],
  'C': [],
  'D': [],
  'E': [],
  'F': [],
})
const UNITS = {
  pressure: 'bar',
  flow: 'm 3/h'
};

// 推进泵压力流量
type BengInfo = {
  pressure: any[];
  flow: any[];
};
const bengSource = reactive<Record<string, BengInfo>>({
  '1': {
    pressure: [],
    flow: []
  },
  '2': {
    pressure: [],
    flow: []
  }
})

let timer: any = null;
// 推进算法
const getPushPredict = async () => {
  if (timer) {
    clearTimeout(timer);
  }
  try {
    const res = await fetch(`/getAlgoResult?algoName=pushPredict`, {
      method: 'GET'
    });
    const {success, data} = await res.json();
    if (success) {
      console.log('pushPredict: ', data);
      const _A: any[] = [];
      const _B: any[] = [];
      const _C: any[] = [];
      const _D: any[] = [];
      const _E: any[] = [];
      const _F: any[] = [];
      const _beng1_pressure: any[] = [];
      const _beng1_flow: any[] = [];
      const _beng2_pressure: any[] = [];
      const _beng2_flow: any[] = [];
      forEach(data, item => {
        const { time, actual, predict } = item;
        _A.push([time, Math.round(actual['推进A组压力'] * 100) / 100, Math.round(predict['推进A组压力'] * 100) / 100]);
        _B.push([time, Math.round(actual['推进B组压力'] * 100) / 100, Math.round(predict['推进B组压力'] * 100) / 100]);
        _C.push([time, Math.round(actual['推进C组压力'] * 100) / 100, Math.round(predict['推进C组压力'] * 100) / 100]);
        _D.push([time, Math.round(actual['推进D组压力'] * 100) / 100, Math.round(predict['推进D组压力'] * 100) / 100]);
        _E.push([time, Math.round(actual['推进E组压力'] * 100) / 100, Math.round(predict['推进E组压力'] * 100) / 100]);
        _F.push([time, Math.round(actual['推进F组压力'] * 100) / 100, Math.round(predict['推进F组压力'] * 100) / 100]);
        _beng1_pressure.push([time, Math.round(actual['推进泵一压力'] * 100) / 100, Math.round(predict['推进泵一压力'] * 100) / 100]);
        _beng2_pressure.push([time, Math.round(actual['推进泵二压力'] * 100) / 100, Math.round(predict['推进泵二压力'] * 100) / 100]);
        _beng1_flow.push([time, Math.round(actual['推进泵1电流检测'] * 100) / 100, Math.round(predict['推进泵1电流检测'] * 100) / 100]);
        _beng2_flow.push([time, Math.round(actual['推进泵2电流检测'] * 100) / 100, Math.round(predict['推进泵2电流检测'] * 100) / 100]);
      })
      groupSource['A'] = _A;
      groupSource['B'] = _B;
      groupSource['C'] = _C;
      groupSource['D'] = _D;
      groupSource['E'] = _E;
      groupSource['F'] = _F;
      bengSource['1'].pressure = _beng1_pressure;
      bengSource['1'].flow = _beng1_flow;
      bengSource['2'].pressure = _beng2_pressure;
      bengSource['2'].flow = _beng2_flow;
    } else {
      throw new Error('Failed to fetch algo result');
    }
    timer = setTimeout(() => {
      getPushPredict();
    }, 60000); // 1 second
  } catch (error) {
    ElMessage.error('Error fetching algo result:' + error);
  }
}

onMounted(() => {
  getPushPredict();
});

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer);
  }
});
</script>

<template>  
  <Title1 class="mg-t mg-l mg-r">推进组压力</Title1>
  <div class="right-box mg-t" >
    <el-select v-model="group" placeholder="请选择" style="width: 100px;">
      <el-option v-for="(_, key) in groupSource" :key="key" :label="'推进' + key + '组'" :value="key"/>
    </el-select>
  </div>
  <ChartLines :dimensions="dimensions" :data="groupSource[group]" :height="220" unit="bar"/>  
  <div class="right-box mg-t mg-b-lg">
    <el-radio-group v-model="active" >
      <el-radio-button :value="'pressure'">推进泵压力</el-radio-button>
      <el-radio-button :value="'flow'">推进泵流量</el-radio-button>
    </el-radio-group>
    <el-select v-model="type" placeholder="请选择" style="width: 100px;">
      <el-option :key="'1'" :label="'推进泵1'" :value="'1'"/>
      <el-option :key="'2'" :label="'推进泵2'" :value="'2'"/>
    </el-select>
  </div>
  <ChartLines :dimensions="dimensions" :data="bengSource[type][active]" :height="220" :unit="UNITS[active]"/>
  <Title1 class="mg-t mg-l mg-r">预测报警</Title1>
  <AlarmPane :collects="collects" :data="tableData" :height="200" />
</template>

