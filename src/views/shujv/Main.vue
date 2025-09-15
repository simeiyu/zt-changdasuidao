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

const group = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28'],
  ['0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00'],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

const R = 220;

const getTransform = (i: number, offset=0) => {
  const angle = 360 / group[0].length * i - 90;
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
      <RunStatus class="status" :data="runStatusData" />
      <div class="dunwei">
        <div class="plate">
            <div class="daopan">
              <div class="group">
                <span class="led" v-for="(value, j) in group[2]"
                  :key="j" :class="value ? 'led-green' : 'led-red'"
                  :style="{ transform: getTransform(j) }"></span>
                <span v-for="(item, i) in group[0]"
                  class="label"
                  :key="item"
                  :style="{ transform: getTransform(i, 32) }"
                >{{ item }}</span>
                <span class="value" v-for="(value, j) in group[1]"
                  :key="j"
                  :style="{ transform: getTransform(j, 80) }">{{ value }}</span>
              </div>
              <span class="path" v-for="(value, i) in pathes"
                :key="i"
                :style="{ transform: getPathTransform(i) }"></span>
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
  width: 100%;
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
  margin: auto;
  width: 718px;
  height: 718px;

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
  top: -35px;
  left: -35px;
  width: 70px;
  height: 70px;
  padding: 5px;
  border-radius: 50%;
  border: 1px solid #ECF5FF;
  font-size: 28px;
  font-weight: 500;
  line-height: 58px;
  text-align: center;
  color: #fff;
  background: linear-gradient(180deg, #AFC3DA 0%, #DFEEFF 19%, #A9BCD6 52%, #94A4BC 76%, #7F8A9E 100%);

  &::before {
    content: '';
    position: absolute;
    top: 5px; 
    left: 5px;
    width: 58px;
    height: 58px;
    border-radius: 50%;
    background: linear-gradient(168deg, #0084FF 8%, #378DF7 24%, #67AEFA 48%, #61A9F5 71%, #1E70FF 91%);
    border-image: linear-gradient(175deg, #A8CBFF 4%, #156BC6 96%);
    box-shadow: inset 0 4px 10px 0 rgb(0 0 0 / 30%);

    .red & {
      background: linear-gradient(168deg, #F00 8%, #F73737 24%, #FA6767 51%, #F56161 71%, #FF1E1E 91%);
      border-image: linear-gradient(175deg, #FFA8A8 4%, #C61515 96%) ;
    }
  }
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
</style>  