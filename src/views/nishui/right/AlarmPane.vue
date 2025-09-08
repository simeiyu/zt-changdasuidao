<script setup lang="ts">

const tableData = [
  {
    time: '2022-01-01 12:00:00',
    content: '设备1报警'
  },
  {
    time: '2022-01-01 12:00:00',
    content: '设备2报警'
  },
  {
    time: '2022-01-01 12:00:00',
    content: '设备3报警'
  }
]
</script>

<template>
  <div class="alarm">
    <div class="alarm-item">
      <span class="alarm-value">2</span>
      <span class="alarm-label">今日报警</span>
    </div>
    <div class="alarm-item">
      <span class="alarm-value">3</span>
      <span class="alarm-label">本月报警</span>
    </div>
    <div class="alarm-item">
      <span class="alarm-value">5</span>
      <span class="alarm-label">累计报警</span>
    </div>
  </div>
  <div class="alarm-table">
    <el-table :data="tableData" size="small" height="128">
      <el-table-column label="序号" type="index" width="44" />
      <el-table-column prop="time" label="时间" width="146" />
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
