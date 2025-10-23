<script setup lang="ts">
import socket, { state } from '~/socket';

type PumpType = '排浆泵轴承箱' | '排浆泵轴向' | '排浆泵垂直' | '排浆泵水平';
const active = ref(0)
const type = ref<PumpType>('排浆泵轴承箱')

const source = reactive<Record<PumpType, any[]>>({
  '排浆泵轴承箱': [],
  '排浆泵轴向': [],
  '排浆泵垂直': [],
  '排浆泵水平': [],
})

const handleEmit = (type: PumpType) => {
  socket.emit("topic:sub", { dest: `/topic/hfpumpcomponent/${type}` });
}

watch(type, (newType) => {
  if (!source[newType] || !source[newType].length) {
    handleEmit(newType);
  }
})

const updateSource = (type: PumpType, data: any[]) => {
  // const _data = source[type].concat(data)
  // const len = data.length
  // source[type] = len > 200 ? _data.slice(len - 200) : _data;
  source[type] = data;
}

onMounted(() => {  
  !state.connected ? socket.on('connect', () => {
    handleEmit(type.value)
  }) : handleEmit(type.value);

  socket.on("topic:hfpumpcomponent:排浆泵轴承箱", (res: any) => {
    const { component, const_data } = res
    updateSource(component as PumpType, const_data);
  });
  socket.on("topic:hfpumpcomponent:排浆泵轴向", (res: any) => {
    const { component, const_data } = res
    updateSource(component as PumpType, const_data);
  });
  socket.on("topic:hfpumpcomponent:排浆泵垂直", (res: any) => {
    const { component, const_data } = res
    updateSource(component as PumpType, const_data);
  });
  socket.on("topic:hfpumpcomponent:排浆泵水平", (res: any) => {
    const { component, const_data } = res
    updateSource(component as PumpType, const_data);
  });
})

onUnmounted(() => {
  for(let key in source) {
    socket.emit("topic:unsub", { dest: `/topic/hfpumpcomponent/${key}` } )
    delete source[key as PumpType];
  }
});
</script>

<template>
  <Title1 class="mg-t-sm mg-l mg-r">振动分析</Title1>
  <div class="wave-top">
    <el-radio-group v-model="active">
      <el-radio-button :value="0">时域波形</el-radio-button>
      <!-- <el-radio-button :value="1" disabled>频域波形</el-radio-button> -->
    </el-radio-group>
    <el-select v-model="type" placeholder="请选择" style="width: 132px;">
      <el-option label="排浆泵轴承箱" value="排浆泵轴承箱"></el-option>
      <el-option label="排浆泵轴向" value="排浆泵轴向"></el-option>
      <el-option label="排浆泵垂直" value="排浆泵垂直"></el-option>
      <el-option label="排浆泵水平" value="排浆泵水平"></el-option>
    </el-select>
  </div>
  <ChartWave :data="source[type]" />
</template>

<style scoped lang="scss">
.wave-top {
  margin: 12px 8px 0;
  display: flex;
  justify-content: space-between;
}
</style>