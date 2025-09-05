<script setup lang="ts">
const active = ref(0)
</script>

<template>
  <el-radio-group v-model="active" size="small">
    <el-radio-button :value="0">进浆流量</el-radio-button>
    <el-radio-button :value="1">排浆流量</el-radio-button>
  </el-radio-group>
  <div class="flow-line"></div>
</template>