<script setup lang="ts">

const active = ref(0)

const dimensions = ['时间', '实测', '预测', '上限', '下限'];

const data = [
  ['12:00', 120, 130, 170, 20],
  ['12:01', 80, 80, 180, 30],
  ['12:02', 150, 130, 170, 20],
  ['12:03', 120, 130, 170, 20],
  ['12:04', 100, 130, 170, 20],
  ['12:05', 110, 130, 170, 20],
  ['12:06', 120, 130, 170, 20],
  ['12:07', 150, 130, 170, 20],
]

const handleChange = (value: any) => {
  console.log(value)
}
</script>

<template>
  <el-radio-group class="flow-radio" v-model="active" @change="handleChange">
    <el-radio-button :value="0">进浆流量</el-radio-button>
    <el-radio-button :value="1">排浆流量</el-radio-button>
  </el-radio-group>
  <ChartLines :dimensions="dimensions" :data="data" unit="m 3/h"/>
</template>

<style scoped lang="scss">
.flow-radio {
  margin: 8px;
}
</style>