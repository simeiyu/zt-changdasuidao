<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<template>
  <el-config-provider :locale="zhCn">
  <LHeader />
  <el-container class="container">
    <router-view></router-view>
  </el-container>
  </el-config-provider>
</template>

<style lang="scss" scoped>
.container {
  height: calc(100vh - 64px);
  background-color: #F0F3F8;
}
</style>
