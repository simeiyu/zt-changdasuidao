<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { forEach, isEmpty, keys, map, filter } from 'lodash';
import AlarmPane from '~/components/AlarmPane.vue';
import socket, { state } from '~/socket';
import { algoPrefix } from '~/utils';

const active = ref(0);
const type = ref('1');

const dianji = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]
const dianjiStatus = reactive<{[key: string]: 0 | 1}>({
  "1": 1,
  "2": 1,
  "3": 1,
  "4": 1,
  "5": 1,
  "6": 1,
  "7": 1,
  "8": 1,
  "9": 1,
  "10": 1,
  "11": 1,
  "12": 1,
  "13": 1,
  "14": 1
})

const collects = [
  {label: '本周报警', value: 1 },
  {label: '本月报警', value: 1 },
  {label: '累计报警', value: 13 },
]
const tableData = [
  {
    time: '2025-10-21 14:37:54',
    content: '1#电机过载，建议降低负载，进行排查'
  },
  {
    time: '2025-09-25 16:46:22',
    content: '6#电机可能轴承损坏，建议进行排查'
  },
  {
    time: '2025-09-02 10:27:23',
    content: '12#电机过载，建议降低负载，进行排查'
  }
]

const waveSource = reactive<Record<string, any[]>>({});
const radarData = ref<{name: string, value: number[]}[]>([]);

const handleChange = (value: any) => {
  console.log(value)
}
const RADAR_LABEL: {[key:string]: string} = {
  "electricCurrent": "电流",
  "frequency": "频率",
  "power": "功率",
  "torque": "扭矩"
}
const getRadarData = (data: Record<string, Record<string, number>>) => {
  return map(filter(keys(data), (item: string) => item ==='torque'), (name) => {
    const value: number[] = [];
    forEach(keys(data[name]), (key) => {
      const index = parseInt(key.replace('#电机', '')) - 1;
      value[index] = Math.round(data[name][key] * 100) / 100;
    })
    return {name: RADAR_LABEL[name], value};
  })
}

let timer: any = null;
// 电机算法
const getElectricMachine = async () => {
  if (timer) {
    clearTimeout(timer);
  }
  try {
    const res = await fetch(`${algoPrefix}/getAlgoResult?algoName=electricMachine`, {
      method: 'GET'
    });
    const {success, data} = await res.json();
    if (success) {
      /**
       * "abnormalInfo": {
            "electricCurrent": [], #返回异常电机电流的编号，空则无异常
            "frequency": [], # 返回异常电机频率的编号，空则无异常
            "power": [], # 返回异常电机功率的编号，空则无异常
            "torque": [] # 返回异常电机扭矩的编号，空则无异常
        },
        "data": { #雷达图数据
            "electricCurrent": {}, # 返回各电机电流的健康度，空则暂无数据
            "frequency": {},# 返回各电机频率的健康度，空则暂无数据
            "power": {},# 返回各电机功率的健康度，空则暂无数据
            "torque": {}# 返回各电机扭矩的健康度，空则暂无数据
        }
       */
      keys(data.abnormalInfo).forEach((key: string) => {
        if (!isEmpty(data.abnormalInfo[key])) {
          data.abnormalInfo[key].forEach((item: string) => {
            dianjiStatus[`${item.replace('#电机', '')}`] = 0;
          })
        }
      });
      radarData.value = getRadarData(data.data);
    } else {
      throw new Error('Failed to fetch algo result');
    }
    timer = setTimeout(() => {
      getElectricMachine();
    }, 60000); // 1 second
  } catch (error: Error | any) {
    ElMessage.error('Error fetching algo result:' + error.message);
  }
}

const handleEmit = (type: string) => {
  waveSource[type] = [];
  socket.emit("topic:sub", { dest: `/topic/hfcomponent/${type}号电机` });
  socket.emit("topic:history", { dest: `/topic/hfcomponent/${type}号电机`, limit: 200 }, (res: any) => {
    waveSource[type] = res.items;
  });
}

watch(type, (newType) => {
  if (!waveSource[newType]) {
    handleEmit(newType);
  }
})

const updateWaveSource = (type: string, data: any[]) => {
  const len = data.length
  waveSource[type] = len ? waveSource[type].slice(len).concat(data) : waveSource[type].concat(data);
}

onMounted(() => {
  getElectricMachine()

  !state.connected ? socket.on('connect', () => {
    handleEmit(type.value)
  }) : handleEmit(type.value);

  socket.on("topic:hfcomponent:1号电机", (res: any) => {
    console.log('topic:hfcomponent:1号电机=>', res);
    updateWaveSource('1', res.const_data);
  });

  socket.on("topic:hfcomponent:2号电机", (res: any) => {
    console.log('topic:hfcomponent:2号电机=>', res);
    updateWaveSource('2', res.const_data);
  });

  socket.on("topic:hfcomponent:3号电机", (res: any) => {
    console.log('topic:hfcomponent:3号电机=>', res);
    updateWaveSource('3', res.const_data);
  });

  socket.on("topic:hfcomponent:4号电机", (res: any) => {
    console.log('topic:hfcomponent:4号电机=>', res);
    updateWaveSource('4', res.const_data);
  });

  socket.on("topic:hfcomponent:5号电机", (res: any) => {
    console.log('topic:hfcomponent:5号电机=>', res);
    updateWaveSource('5', res.const_data);
  });

  socket.on("topic:hfcomponent:6号电机", (res: any) => {
    console.log('topic:hfcomponent:6号电机=>', res);
    updateWaveSource('6', res.const_data);
  });

  socket.on("topic:hfcomponent:7号电机", (res: any) => {
    console.log('topic:hfcomponent:7号电机=>', res);
    updateWaveSource('7', res.const_data);
  });

  socket.on("topic:hfcomponent:8号电机", (res: any) => {
    console.log('topic:hfcomponent:8号电机=>', res);
    updateWaveSource('8', res.const_data);
  });

  socket.on("topic:hfcomponent:9号电机", (res: any) => {
    console.log('topic:hfcomponent:9号电机=>', res);
    updateWaveSource('9', res.const_data);
  });

  socket.on("topic:hfcomponent:10号电机", (res: any) => {
    console.log('topic:hfcomponent:10号电机=>', res);
    updateWaveSource('10', res.const_data);
  });

  socket.on("topic:hfcomponent:11号电机", (res: any) => {
    console.log('topic:hfcomponent:11号电机=>', res);
    updateWaveSource('11', res.const_data);
  });

  socket.on("topic:hfcomponent:12号电机", (res: any) => {
    console.log('topic:hfcomponent:12号电机=>', res);
    updateWaveSource('12', res.const_data);
  });

  socket.on("topic:hfcomponent:13号电机", (res: any) => {
    console.log('topic:hfcomponent:13号电机=>', res);
    updateWaveSource('13', res.const_data);
  });

  socket.on("topic:hfcomponent:14号电机", (res: any) => {
    console.log('topic:hfcomponent:14号电机=>', res);
    updateWaveSource('14', res.const_data);
  });
})

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer);
  }
  for(let key in waveSource) {
    socket.emit("topic:unsub", { dest: `/topic/hfcomponent/${key}号电机` } )
    delete waveSource[key];
  }
});

</script>

<template>  
  <Title1 class="mg-t mg-l mg-r">电机健康状态</Title1>
  <ul class="list">
    <li v-for="(value, key) in dianjiStatus" :key="key" class="list-item" :class="{'warn': value === 0}">{{ key + "#" }}</li>
  </ul>
  <ChartRadar :data="radarData" />
  <Title1 class="mg-t mg-l mg-r mg-b-lg">振动分析</Title1>
  <div class="right-box">
    <el-radio-group v-model="active" @change="handleChange">
      <el-radio-button :value="0">时域波形</el-radio-button>
      <!-- <el-radio-button :value="1" disabled>频域波形</el-radio-button> -->
    </el-radio-group>
    <el-select v-model="type" placeholder="请选择" style="width: 100px;">
      <el-option
        v-for="item in dianji"
        :key="item"
        :label="item + '#电机'"
        :value="item"
      />
    </el-select>
  </div>
  <ChartWave :data="waveSource[type]" unit="m 3/h"/>
  <Title1 class="mg-t mg-l mg-r">预测报警</Title1>
  <AlarmPane :collects="collects" :data="tableData" :height="196" />
</template>

<style lang="scss" scoped>
.list {
  margin: 12px 0;
  padding: 0 4px;
  list-style: none;

  &-item {
    display: inline-block;
    width: 58px;
    height: 49px;
    padding: 24px 4px 4px;
    margin: 0 4px 4px;
    text-align: center;
    color: var(--el-text-color-secondary);
    background: #F4F6F9 url('~/assets/images/dianji@2x.png') no-repeat center 8px;
    background-size: 16.5px 12px;

    &.warn {
      background-image: url('~/assets/images/dianji_warn@2x.png');
      background-color: #FFECE8;
    }
  }
}
</style>