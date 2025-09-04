<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const menu = [
  {
    title: '设备概览',
    icon: 'overview',
    path: '/'
  },
  {
    title: '泥水环流',
    icon: 'nishui',
    path: '/nishui'
  },
  {
    title: '盾尾密封',
    icon: 'dunwei',
    path: '/dunwei'
  },
  {
    title: '推进系统',
    icon: 'tuijin',
    path: '/tuijin'
  },
  {
    title: '刀盘系统',
    icon: 'daopan',
    path: '/daopan'
  },
  {
    title: '驱动电机',
    icon: 'qudong',
    path: '/qudong'
  },
  {
    title: '数据查询',
    icon: 'shujv',
    path: '/shujv'
  },
]

const collapsed = ref(false)
const active = ref('1')

defineExpose({
  collapsed
})

</script>

<template>
  <div class="side-toggle" @click="collapsed = !collapsed">
    <el-icon class="side-toggle-icon"><SvgIcon icon-name="toggle" /></el-icon>
  </div>
  <el-menu class="side-menu" :default-active="active" :collapse="collapsed">
    <el-menu-item v-for="(item, index) in menu" :key="item.icon" :index="`${index + 1}`" :route="item.path">
      <el-icon class="side-icon"><SvgIcon :icon-name="item.icon" /></el-icon>
      <template #title>{{ item.title }}</template>
    </el-menu-item>
  </el-menu>
</template>

<style lang="scss" scoped>
.side-toggle {
  padding: 12px;
  height: 48px;
  font-size: 14px;
  line-height: 24px;
  vertical-align: middle;
  text-align: center;
  color: #B8B8B8;
  border-bottom: solid 1px #DCDEE1;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: var(--el-color-primary);
  }
}

.side-menu {
  border-right: none;

  &:not(.el-menu--collapse) {
    width: 200px;
  }
}

.side-icon {
  margin-right: 12px;
  font-size: 14px;
}

:deep(.el-menu-item.is-active) {
  background-color: var(--el-color-primary-light-9);
}

:deep(.el-menu-item:hover) {
  color: var(--el-color-primary);
}


// :deep(.el-menu--collapse) {
//   width: 60px !important;
// }

// :deep(.el-menu-item .el-menu-tooltip__trigger) {
//   transition: all 0.3s;
// }

// :deep(.el-menu--collapse .el-menu-item .el-menu-tooltip__trigger) {
//   justify-content: center;
// }

</style>
