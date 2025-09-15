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

const values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']

const R = 220;

const getTransform = (i: number, offset=0) => {
  const angle = 360 / values.length * i - 90;
  const radius = R + offset;
  const x = Math.round(Math.cos(angle * Math.PI / 180) * radius * 100) / 100;
  const y = Math.round(Math.sin(angle * Math.PI / 180) * radius * 100) / 100;
  return `translate(${x}px, ${y}px)`
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
                <div class="value" v-for="(value, j) in values" :class="{'red': value === '4'}"
                  :key="j"
                  :style="{ transform: getTransform(j, 80) }"><span>{{ value }}</span></div>
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

.group {
  position: absolute;
  top: 50%;
  left: 50%;
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
  }

  &.red::before{
    background: linear-gradient(168deg, #F00 8%, #F73737 24%, #FA6767 51%, #F56161 71%, #FF1E1E 91%);
    border-image: linear-gradient(175deg, #FFA8A8 4%, #C61515 96%) ;
  }

  > span {
    position: relative;
    z-index: 3;
  }
}
</style>  