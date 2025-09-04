<script setup lang="ts">
</script>

<template>
  <Header />
  <el-container class="container">
    <el-aside :width="'auto'" class="aside">
      <SideMenu ref="menuRef" />
    </el-aside>
    <el-container>
      <el-header class="breadcrumb">Header</el-header>
      <el-main class="main-wrapper">
        <div class="main">
          <div class="main-content">Main <el-icon><i-ep-refresh /></el-icon></div>
        </div>
        <div class="right"></div>
      </el-main>
    </el-container>
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
}

.main {
  position: relative;
  height: 100%;
  flex: 1;
  border-radius: 2px;
  border: solid 1px #DCDEE1;
  background: repeating-linear-gradient(180deg, transparent 0, transparent 63px, rgb(220 222 225 / 20%), rgb(220 222 225 / 20%) 64px);
  background-color: #fff;
  box-shadow: 0 2px 6px 0 rgb(0 29 77 / 10%);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(90deg, transparent 0, transparent 63px, rgb(220 222 225 / 20%), rgb(220 222 225 / 20%) 64px);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(90deg, transparent 0, transparent 15px, rgb(220 222 225 / 30%), rgb(220 222 225 / 30%) 16px);
  }

  &-content {
    position: relative;
    z-index: 5;
    height: 100%;
    background: repeating-linear-gradient(180deg, transparent 0, transparent 15px, rgb(220 222 225 / 30%), rgb(220 222 225 / 30%) 16px);
  }
}

.right {
  margin-left: 16px;
  width: 200px;
  height: 100%;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 2px 6px 0 rgb(0 29 77 / 10%);
}
</style>
