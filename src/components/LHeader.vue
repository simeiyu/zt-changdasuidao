<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '~/store/user'

const userStore = useUserStore()
const router = useRouter()

const handleCommand = (command: string) => {
  switch (command) {
    case 'admin':
      router.push('/admin')
      break
    case 'userInfo':
      router.push('/userInfo')
      break
    case 'logout':
      router.push('/login')
      break
  }
}
</script>

<template>
  <header class="header-container">
    <div class="logo-container">
      <a class="logo" v-on:click="router.push('/')"><img src="../assets/logo.svg" alt="中铁装备" /></a>
      <div class="title"><img src="../assets/images/title.png" alt="长大隧道同步推拼智能盾构运行状态智能检测与诊断系统边缘端(崇太隧道)" /></div>
    </div>
    <div class="header-right">
      <el-badge :value="3" class="bell">
        <i-ep-bell-filled />
      </el-badge>
      <el-dropdown class="user-profile" @command="handleCommand">
        <span class="el-dropdown-link">
          <span class="username">Admin</span>
          <el-avatar :size="32" fit="contain" src="avatar.png" />
          <el-icon class="el-icon-arrow">
            <i-ep-arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-if="userStore.roles.includes('admin')" command="admin">后台管理</el-dropdown-item>
            <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<style lang="scss" scoped>
$color-white: #fff;

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
    padding-left: 10px;
    height: 21px;
    position: relative;

    &::before {
      content: '';
      width: 1px;
      height: 20px;
      position: absolute;
      left: 0;
      top: 0;
      background-color: #fff;
    }

    img {
      max-width: 720px;
      height: 100%;
    }
  }
}

.header-right {
  display: flex;
  align-items: center;
  padding: 16px 24px;

  :deep(.el-badge__content) {
    display: inline-block;
    min-width: var(--el-badge-size);
    border: none;
    text-align: center;
    line-height: 15px;
  }

  .bell {
    line-height: 0;

    --el-badge-padding: 0;
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
