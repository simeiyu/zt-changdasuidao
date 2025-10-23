<script setup lang="ts">

const props = defineProps({
  height: {
    type: Number,
    default: 260
  },
  data: {
    type: Array<{time: string, content: string}>,
    default: () => []
  },
  collects: {
    type: Array<{label: string, value: number}>,
    default: () => []
  }
})
</script>

<template>
  <div class="alarm">
    <div class="alarm-item" v-for="item in collects" key="item.label">
      <span class="alarm-value">{{ item.value }}</span>
      <span class="alarm-label">{{ item.label }}</span>
    </div>
  </div>
  <div class="alarm-table">
    <el-table :data="data" size="small" :height="height">
      <el-table-column label="序号" type="index" width="44" />
      <el-table-column prop="time" label="时间" width="96" />
      <el-table-column prop="content" label="报警内容" />
    </el-table>
  </div>
</template>

<style scoped lang="scss">
.alarm {
  display: flex;
  justify-content: space-around;
  align-items: center;

  &-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 12px;
    font-size: 14px;
    color: #4C5A67;
  }

  &-value {
    font-size: 16px;
    font-weight: bold;
    color: #F53F3F;
    line-height: 24px;
  }

  &-table {
    padding: 0 8px;

    :deep(.el-table--small) {
      font-size: var(--el-font-size-base);
    }

    :deep(.el-table th.el-table__cell) {
      font-weight: normal;
      background-color: #F4F6F9;
    }

    :deep(.el-table__body td.el-table__cell) {
      color: var(--el-text-color-primary);
    }
  }
}
</style>
