<script setup lang="ts">

const runStatusData = [{
  label: '刀盘转速',
  value: '0.00',
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
}]

const columns = [{
  field: 'label',
  title: ''
}, {
  field: 'value1',
  title: '磨损检测-1',
  unit: 'mm',
  output: true
},{
  field: 'value2',
  title: '磨损检测-2',
  unit: 'mm',
  output: true
}]

const data = [{
  label: '排浆斜管',
  value1: '',
  value2: '',  
}, {
  label: '排浆直管',
  value1: '',
  value2: '',  
}, {
  label: 'P2.1出口泥浆硬管',
  value1: '',
  value2: '',  
}, {
  label: '进浆管',
  value1: '',
  value2: '',  
}, {
  label: 'P0.1出口泥浆硬管',
  value1: '',
  value2: '',  
}, {
  label: 'P0.2出口泥浆硬管',
  value1: '',
  value2: '',  
}, {
  label: '',
  value1: '',
  value2: '',  
}]

</script>

<template>
  <div class="nishui">
    <RunStatus class="status" :data="runStatusData" />
    <InfoPane class="info" :columns="columns" :data="data" />
    <div class="configuration">

    </div>
  </div>
</template>

<style scoped lang="scss">
.nishui {
  position: relative;
  padding: 196px 16px 12px;
  width: 100%;
  height: 100%;
  overflow: auto;

  @include scroll;
}

.status {
  position: absolute;
  top: 14px;
  left: 14px;
  width: 30%;
  min-width: 380px;
}

.info {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 30%;
  min-width: 392px;
}

.configuration {
  position: relative;

  // width: 1156px;
  height: 726px;

  // height: 100%;
  background-image: url('~/assets/images/nishui.svg');
  background-position: 0 center;
  background-repeat: no-repeat;
  background-size: contain;

  .sup {
    position: absolute;
    top: -68px;
    left: 0;
    height: 68px;
  }
}
</style>
