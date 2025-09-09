<script setup lang="ts">

const props = defineProps<{
  data: Array<{ label: string, value: string, status?: string, unit?: string}>;
}>()

</script>

<template>
  <div class="pane">
    <div class="pane-header">
      <span class="pane-title">运行状态</span>
    </div>
    <div class="pane-body">
      <div v-for="item in props.data" :key="item.label" class="item">
        <div class="item-info">
          <span class="item-value" :class="item.status ? item.status : ''">{{ item.value }}</span>
          <span class="item-unit" v-if="item.unit">{{ item.unit }}</span>
        </div>
        <div class="item-label">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pane {
  padding: 8px 16px;
  width: 450px;
  border: solid 1px #C2C7CC;
  background-color: #fff;
  box-shadow: 0 2px 6px 0 rgb(0 0 0 / 10%);

  &-header {
    position: relative;
    height: 36px;
    padding: 8px 22px;
    line-height: 19px;

    &::before, &::after {
      content: '';
      position: absolute;
      display: block;
      border-style: solid;
    }

    &::before {
      top: 9px;
      left: 0;
      border-width: 9px 0 9px 10px;
      border-color: transparent transparent transparent #236EF9;
    }

    &::after {
      top: 12px;
      left: 6px;
      border-width: 6px 0 6px 8px;
      border-color: transparent transparent transparent #07EDFD;
    }
  }

  &-body {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.item {
  text-align: center;

  &-unit {
    margin-left: 8px;
    font-size: var(--el-font-size-small);
    color: var(--el-text-color-secondary);
  }

  &-value {
    font-size: 16px;
    font-weight: 500;
    color: #3D3D3D;

    &.danger {
      color: var(--el-color-danger);
    }

    &.success {
      color: var(--el-color-success);
    }

    &.warning {
      color: var(--el-color-warning);
    }
  }

  &-label {
    font-size: 14px;
    color: var(--el-text-color-primary);
  }
}
</style>