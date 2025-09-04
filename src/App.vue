<script setup lang="ts">
import SideMenu from './components/SideMenu.vue';
const menuRef = ref<InstanceType<typeof SideMenu> | null>(null);

const width = computed(() => menuRef.value?.collapsed ? '60px' : '200px' )
</script>

<template>
  <Header />
  <el-container class="container">
    <el-aside :width="'auto'" class="aside">
      <SideMenu ref="menuRef" />
    </el-aside>
    <el-main>
      Main <el-icon><i-ep-refresh /></el-icon>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
.container {
  height: calc(100vh - 64px);
  background-color: #F0F3F8;
}

.aside {
  border-right: solid 1px #D8D8D8;
  background-color: #fff;
  transition: width 0.5s ease-in-out;
}
</style>
