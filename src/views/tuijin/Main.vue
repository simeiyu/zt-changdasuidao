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

// 同步推拼阈值
const source = [
  {id: 'db999_648', label: '同步拼装开始最小移', value: '', unit: 'mm'},
  {id: 'db999_460', label: '同步推拼上限压力', value: '', unit: 'bar'},
  {id: 'db999_666', label: '同步推拼下限压力', value: '', unit: 'bar'},
]

// 推进油缸
const group = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28']
// 推进油缸压力
const pressure = ['0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00']
// 推进油缸状态
const status = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 推进组位移
const shifting = [0, 0, 0, 0, 0, 0]

const R = 220;

const getTransform = (i: number, len: number, offset=0) => {
  const angle = 360 / len * i - 90;
  const radius = R + offset;
  const x = Math.round(Math.cos(angle * Math.PI / 180) * radius * 100) / 100;
  const y = Math.round(Math.sin(angle * Math.PI / 180) * radius * 100) / 100;
  return `translate(${x}px, ${y}px)`
}

const pathes = new Array(6).fill(1)

const getPathTransform = (i: number) => {
  const angle = 360 / pathes.length * i;
  const radius = R + 76;
  const x = Math.round(Math.cos(angle * Math.PI / 180) * radius * 100) / 100;
  const y = Math.round(Math.sin(angle * Math.PI / 180) * radius * 100) / 100;
  return `translate(${x}px, ${y}px) rotate(${angle}deg)`
}
</script>

<template>
  <div class="wrapper" ref="wrapper">
    <div class="main" :style="{ transform: `scale(${scale})` }">
      <RunStatus />
      <div class="dunwei">
        <div class="plate">
            <div class="daopan">
              <div class="group">
                <span class="shifting" v-for="(value, j) in shifting"
                  :key="j" 
                  :style="{ transform: getTransform(j, shifting.length, 120) }">{{ value }}</span>
                <span class="led" v-for="(value, j) in status"
                  :key="j" :class="value ? 'led-green' : 'led-red'"
                  :style="{ transform: getTransform(j, group.length) }"></span>
                <span v-for="(item, i) in group"
                  class="label"
                  :key="item"
                  :style="{ transform: getTransform(i, group.length, 32) }"
                >{{ item }}</span>
                <span class="value" v-for="(value, j) in pressure"
                  :key="j"
                  :style="{ transform: getTransform(j, group.length, 80) }">{{ value }}</span>
              </div>
              <span class="path" v-for="(value, i) in pathes"
                :key="i"
                :style="{ transform: getPathTransform(i) }"></span>

              <div class="box">
                <div class="box-row" v-for="item in source">
                  <span class="box-label">{{ item.label }}</span>
                  <span class="box-value">{{ item.value }}</span>
                  <span class="box-unit">{{ item.unit }}</span>
                </div>
              </div>
            </div>
        </div>
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
  min-width: 766px;
  width: 100%;
  min-height: 872px;
  padding: 130px 24px 24px;
  transform-origin: 0 0;
}

.status {
  position: absolute;
  top: 14px;
  left: 14px;
  width: 30%;
  min-width: 380px;
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
  display: flex;
  justify-content: center;
  min-width: 518px;

  @include plate('.plate');

}

.daopan {
  position: relative;
  height: 100%;
  background-image: url('~/assets/images/dunwei.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center
}

.label {
  position: absolute;
  display: block;

  // top: -4px;
  left: -4px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #DCDEE1;
  font-size: var(--el-font-size-base);
  text-align: center;
  line-height: 28px;
  background-color: #FFF;
  transform-origin: center center;
  box-shadow: inset 0 4px 10px 0 #B6CDE1;
}

.value {
  position: absolute;
  display: block;

  // top: -2px;
  left: -16px;

  @include valueBox(52px, 24px);
}

.shifting {
  position: absolute;
  display: block;
  top: -2px;
  left: -16px;

  @include valueBox(52px, 24px);
}

.led {
  position: absolute;
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  
  &-red {
    background-image: url('~/assets/images/led_red.png');
  }
  
  &-green {
    background-image: url('~/assets/images/led_green.svg');
  }
}

.path {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 0;
  margin-left: -60px;
  width: 120px;
  height: 1px;
  background-color: #0084FF;
}

.group {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  margin-top: -10px;
  margin-left: -10px;
  width: 20px;
  height: 20px;
}

.box {
  position: absolute;
  top: 140px;
  left: 46px;
  width: 330px;
  padding: 6px;
  border-radius: 2px;
  border: 1px solid rgb(194 199 204 / 90%);
  background-color: rgb(255 255 255 / 90%);

  &-row {
    display: flex;
    align-items: center;
    margin: 16px 0;    
  }

  &-label {
    display: inline-block;
    width: 180px;
    padding: 0 16px;
    line-height: 20px;
    text-align: right;
  }

  &-unit {
    display: inline-block;
    padding: 0 8px;
    font-size: var(--el-font-size-small);
    line-height: 20px;
  }

  &-value {
    display: inline-block;

    @include valueBox(80px, 20px, #fff, #C2C7CC);
  }
}
</style>  