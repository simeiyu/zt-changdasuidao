<script setup lang="ts">
const scale = ref(1);
const MinWidth = 564;
const wrapper = ref<HTMLDivElement | null>(null);

const updateScale = () => {
  if (wrapper.value) {
    const wrapperWidth = wrapper.value.offsetWidth;
    const _scale = wrapperWidth / MinWidth;
    console.log(_scale)
    scale.value = _scale > 1 ? 1 : _scale;
  }
}

useResizeObserver(wrapper, updateScale)

onMounted(() => {
  updateScale();
})

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
</script>

<template>
  <div class="wrapper" ref="wrapper">
    <div class="main" :style="{ transform: `scale(${scale})` }">
      <RunStatus class="status" :data="runStatusData" />
      <div class="dunwei">
        <div class="daopan">  </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden auto;
  
  @include scroll;
}

.main {
  position: relative;
  width: 100%;
  padding: 157px 24px 24px;
  transform-origin: 0 0;
}

.status {
  position: absolute;
  top: 14px;
  left: 14px;
  width: 30%;
  min-width: 380px;
}

.dunwei {
  display: flex;
  justify-content: center;
  min-width: 516px;
}

.daopan {
  position: relative;
  width: 516px;
  height: 516px;
  background-image: url('~/assets/images/daopan.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center
}
</style>  