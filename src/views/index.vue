<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <el-aside :width="'auto'" class="aside">
    <SideMenu ref="menuRef" />
  </el-aside>
  <el-container>
    <el-header class="breadcrumb">{{ route.name }}</el-header>
    <el-main class="main-wrapper">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
.aside {
  border-right: solid 1px #D8D8D8;
  background-color: #fff;
  transition: width 0.5s ease-in-out;
}

.breadcrumb {
  height: 48px;
  padding: 8px 16px;
  font-size: var(--el-font-size-base);
  line-height: 32px;
  background-color: #fff;
}

.main-wrapper {
  display: flex;
  height: calc(100vh - 112px);
  padding: 16px;
  overflow: visible;
}
</style>
