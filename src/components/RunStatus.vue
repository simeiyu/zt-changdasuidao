<script setup lang="ts">
import { find } from 'lodash';
import socket, { state } from '~/socket';

const data = reactive([{
  label: '刀盘转速',
  value: 0.00,
  unit: 'rpm'
}, {
  label: '刀盘方向',
  value: '停止',
  status: 'danger'
}, {
  label: '推进状态',
  value: '停止',
  status: 'danger'
}, {
  label: '泥浆状态',
  value: '逆洗',
  status: 'success'
}])

onMounted(() => {
  // console.log('运行状态 mounted')
  !state.connected ? socket.on('connect', () => {
    socket.emit("type:sub", {type: "推进系统"})
  }) : socket.emit("type:sub", {type: "推进系统"})
  socket.on("type:resp", (res: any) => {
    const { type, items } = res
    if (type === '推进系统' && items.length) {
      // console.log('type:resp 推进系统==>', res)
      const result1 = find(items, {key: '刀盘转速'})
      const left = find(items, {key: '刀盘右转'})
      const right = find(items, {key: '刀盘左转'})
      const result3 = find(items, {key: '推进模式'})
      const result4 = find(items, {key: '泥水仓逆冲洗按钮灯'})
      result1 && (data[0].value = Math.round(result1.value * 100) / 100)
      if (left.value || right.value) {
        data[1].status = 'success'
        data[1].value = left.value ? '左转' : '右转'
      } else {
        data[1].status = 'danger'
        data[1].value = '停止'
      }
      data[2].status = result3.value ? 'success' : 'danger'
      data[2].value = result3.value ? '推进' : '停止'
      data[3].status = result4.value ? 'success' : 'danger'
      data[3].value = result4.value ? '逆洗' : '停止'
    }
  })
})

</script>

<template>
  <div class="pane status">
    <div class="pane-header">
      <span class="pane-title">运行状态</span>
    </div>
    <div class="pane-body">
      <div v-for="item in data" :key="item.label" class="item">
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
.status {
  position: absolute;
  top: 14px;
  left: 14px;
  width: 30%;
  min-width: 380px;
}

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