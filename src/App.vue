<script setup lang="ts">
</script>

<template>
  <LHeader />
  <el-container class="container">
    <router-view></router-view>
  </el-container>
</template>

<style lang="scss" scoped>
.container {
  height: calc(100vh - 64px);
  background-color: #F0F3F8;
}
</style>
