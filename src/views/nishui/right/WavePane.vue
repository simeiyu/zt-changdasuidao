<script setup lang="ts">
import socket, { state } from '~/socket';

type PumpType = '排浆泵轴承箱' | '排浆泵轴向' | '排浆泵垂直' | '排浆泵水平';
const active = ref(0)
const type = ref<PumpType>('排浆泵轴承箱')
const options = [
  {
    value: '排浆泵轴承箱',
    label: '排浆泵轴承箱',
  },
  {
    value: '排浆泵轴向',
    label: '排浆泵轴向',
  },
  {
    value: '排浆泵垂直',
    label: '排浆泵垂直',
  },
  {
    value: '排浆泵水平',
    label: '排浆泵水平',
  },
]

const emited: Record<PumpType, boolean> = {
  '排浆泵轴承箱': false,
  '排浆泵轴向': false,
  '排浆泵垂直': false,
  '排浆泵水平': false,
}
const source = reactive<Record<PumpType, any[]>>({
  '排浆泵轴承箱': [],
  '排浆泵轴向': [],
  '排浆泵垂直': [],
  '排浆泵水平': [],
})

const handleEmit = (type: PumpType) => {
  if (emited[type]) return;
  emited[type] = true;
  socket.emit("vibration:watch", { type });
}

watch(type, (newType, oldType) => {
  if (oldType) {
    socket.emit("vibration:unwatch", { type: oldType } )
    emited[oldType] = false;
    source[oldType] = [];
  }
  handleEmit(newType);
})

onMounted(() => {  
  !state.connected ? socket.on('connect', () => {
    handleEmit(type.value)
  }) : handleEmit(type.value);

  socket.on("vibration:update", (res: any) => {
    const { type, time, value } = res
    source[type as PumpType] = value;
  });
})

onUnmounted(() => {
  for(let key in emited) {
    if (!emited[key as PumpType]) continue;
    socket.emit("vibration:unwatch", { type: key } )
    emited[key as PumpType] = false;
    source[key as PumpType] = [];
  }
});
</script>

<template>
  <Title1 class="mg-t-sm mg-l mg-r">振动分析</Title1>
  <div class="wave-top">
    <el-radio-group v-model="active">
      <el-radio-button :value="0">时域波形</el-radio-button>
      <el-radio-button :value="1" disabled>频域波形</el-radio-button>
    </el-radio-group>
    <el-select v-model="type" placeholder="请选择" :options="options" style="width: 132px;" />
  </div>
  <ChartWave :data="data" />
</template>

<style scoped lang="scss">
.wave-top {
  margin: 12px 8px 0;
  display: flex;
  justify-content: space-between;
}
</style>