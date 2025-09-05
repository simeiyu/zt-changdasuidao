<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <header class="header-container">
    <div class="logo-container">
      <a class="logo" v-on:click="router.push('/')"><img src="@/assets/logo.svg" alt="中铁装备" /></a>
      <h1 class="title">长大隧道同步推拼智能盾构运行状态智能检测与诊断系统边缘端(崇太隧道)</h1>
    </div>
    <div class="header-right">
      <el-badge :value="3" class="bell">
        <i-ep-bell-filled />
      </el-badge>
      <el-dropdown class="user-profile">
        <span class="el-dropdown-link">
          <span class="username">Admin</span>
          <el-avatar :size="32" fit="contain" src="avatar.png" />
          <el-icon class="el-icon-arrow">
            <i-ep-arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--el-color-primary);
  color: $color-white;
}

.logo-container {
  display: flex;
  align-items: center;
  padding: 16px 24px;

  .logo {
    display: inline-block;

  }

  .title {
    font-size: 16px;
  }
}

.header-right {
  padding: 16px 24px;

  :deep(.el-badge__content) {
    border: none;
  }

  .user-profile {
    margin-left: 32px;
    position: relative;

    &::before {
      content: '';
      width: 1px;
      height: 16px;
      position: absolute;
      left: -16px;
      top: 50%;
      margin-top: -8px;
      background-color: var(--el-border-color-lighter);
    }
  }

  .username {
    margin-right: 8px;
    color: $color-white;
  }

  .el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .el-icon-arrow {
    margin-left: 16px;
    color: $color-white;
  }

  :deep(.el-avatar) {
    --el-avatar-bg-color: #61B3FF;

    border: solid 1px #8BD3FF;
  }
}
</style>
