<script setup lang="ts">
const scale = ref(1);
const MinWidth = 768;
const wrapper = ref<HTMLDivElement | null>(null);

const updateScale = () => {
  if (wrapper.value) {
    const wrapperWidth = wrapper.value.offsetWidth;
    const _scale = wrapperWidth / MinWidth;
    scale.value = _scale > 1 ? 1 : _scale;
  }
}

useResizeObserver(wrapper, updateScale)

onMounted(() => {
  updateScale();
})

// const group = [
//   ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28'],
//   ['0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00'],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// ]

// const R = 220;

// const getTransform = (i: number, offset=0) => {
//   const angle = 360 / group[0].length * i - 90;
//   const radius = R + offset;
//   const x = Math.round(Math.cos(angle * Math.PI / 180) * radius * 100) / 100;
//   const y = Math.round(Math.sin(angle * Math.PI / 180) * radius * 100) / 100;
//   return `translate(${x}px, ${y}px)`
// }

// const pathes = new Array(6).fill(1)

// const getPathTransform = (i: number) => {
//   const angle = 360 / pathes.length * i;
//   const radius = R + 76;
//   const x = Math.round(Math.cos(angle * Math.PI / 180) * radius * 100) / 100;
//   const y = Math.round(Math.sin(angle * Math.PI / 180) * radius * 100) / 100;
//   return `translate(${x}px, ${y}px) rotate(${angle}deg)`
// }
</script>

<template>
  <div class="wrapper" ref="wrapper">
    <div class="main" :style="{ transform: `scale(${scale})` }">
      <RunStatus />
      <div class="dunwei">
        
        
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
  padding: 130px 24px 24px;
  transform-origin: 0 0;
}

@mixin plate($el, $radius: 359px, $size: 124px, $bgColor: #ADC6E2) {
  $bd: 4px;

  #{$el} {
    position: relative;
    width: $radius * 2;
    height: $radius * 2;
    padding: $size + 21px;
    border-radius: 50%;
    border: $bd solid #9DD0FF;
    background: linear-gradient(180deg, #AFC3DA 0%, #DFEEFF 19%, #A9BCD6 52%, #94A4BC 76%, #7F8A9E 100%);

    &::before {
      content: '';
      position: absolute;
      top: $size - $bd;
      left: $size - $bd;
      width: ($radius - $size) * 2;
      height: ($radius - $size) * 2;
      border-radius: 50%;
      border: 4px solid #ADC6E2;
      background-color: #ECF5FF; 
    }
  }
}

.dunwei {
  margin: auto;
  width: 718px;
  height: 718px;

  // @include plate('.plate');

}

.daopan {
  position: relative;
  height: 100%;

  // background-image: url('~/assets/images/dunwei.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center
}
</style>  