<script setup lang="ts">
const scale = ref(1);
const MinWidth = 564;
const wrapper = ref<HTMLDivElement | null>(null);

const updateScale = () => {
  if (wrapper.value) {
    const wrapperWidth = wrapper.value.offsetWidth;
    const _scale = wrapperWidth / MinWidth;
    // console.log(_scale)
    scale.value = _scale > 1 ? 1 : _scale;
  }
}

useResizeObserver(wrapper, updateScale)

onMounted(() => {
  updateScale();
})
</script>

<template>
  <div class="wrapper" ref="wrapper">
    <div class="main" :style="{ transform: `scale(${scale})` }">
      <!-- <RunStatus /> -->
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
  padding: 80px 24px 24px;
  transform-origin: 0 0;
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