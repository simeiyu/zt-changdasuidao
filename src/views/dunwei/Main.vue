<script setup lang="ts">
const scale = ref(1);
const MinWidth = 720;
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

const columns = [{
  field: 'label',
  title: ''
}, {
  field: 'value1',
  title: '冲程',
  unit: '次',
  output: true
},{
  field: 'value2',
  title: '出口压力',
  unit: 'bar',
  output: true
}]

const data = [{
  label: '1#',
  value1: '',
  value2: '',  
}, {
  label: '2#',
  value1: '',
  value2: '',  
}, {
  label: '3#',
  value1: '',
  value2: '',  
}, {
  label: '4#',
  value1: '',
  value2: '',  
}, {
  label: '5#',
  value1: '',
  value2: '', 
}]

const group = [
  ['1#', '2#', '3#', '4#', '5#', '6#', '7#', '8#', '9#', '10#', '11#', '12#', '13#', '14#', '15#', '16#'],
  ['0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00'],
  ['0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00'],
  ['0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00'],
  ['0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00'],
  ['0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00'],
]

const R = 130;

const getTransform = (i: number, j=0) => {
  const angle = 360 / group[0].length * i - 90;
  const radius = R + j * 42;
  const x = Math.round(Math.cos(angle * Math.PI / 180) * radius * 100) / 100;
  const y = Math.round(Math.sin(angle * Math.PI / 180) * radius * 100) / 100;
  return `translate(${x}px, ${y}px)`
}
</script>

<template>
  <div class="wrapper" ref="wrapper">
    <div class="main" :style="{ transform: `scale(${scale})` }">
      <RunStatus class="status" :data="runStatusData" />
      <InfoPane class="info" :title="'盾尾油脂泵'" :columns="columns" :data="data" />
      <div class="dunwei">
        <div class="plate_1">
          <div class="plate_inner">
            <div class="plate_2">
              <div class="plate_inner">
                <div class="plate_3">
                  <div class="plate_inner" style="padding: 4px;">
                    <div class="daopan">
                      <div class="group">
                        <span v-for="(item, i) in group[0]"
                          class="label"
                          :key="item"
                          :style="{ transform: getTransform(i) }"
                        >{{ item }}</span>
                        <template v-for="(row, i) in group.slice(1)" :key="i">
                          <span class="value" v-for="(value, j) in row"
                            :key="j"
                            :style="{ transform: getTransform(j, i+1) }">{{ value }}</span>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="configuration"></div>
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
  min-width: 720px;
  width: 100%;
  min-height: 100%;
  padding: 162px 24px 24px;
  transform-origin: 0 0;
  display: flex;
  justify-content: center;
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
  width: 302px;
}

@mixin plate($el, $radius: 359px, $size: 35px, $space: 7px, $bgColor: #ADC6E2) {
  #{$el} {
    position: relative;
    width: $radius * 2;
    height: $radius * 2;
    padding: $size * 2 + $space;
    border-radius: 50%;
    border: 1px solid #9DD0FF;
    background: linear-gradient(180deg, #AFC3DA 0%, #DFEEFF 19%, #A9BCD6 52%, #94A4BC 76%, #7F8A9E 100%);

    &::before {
      content: '';
      position: absolute;
      top: $size - 1px;
      left: $size - 1px;
      width: ($radius - $size) * 2;
      height: ($radius - $size) * 2;
      border-radius: 50%;
      border: 1px solid #9DD0FF;
      background-color: #ECF5FF; 
    }

    &::after {
      content: '';
      position: absolute;
      top: $size + $space - 1px;
      left: $size + $space - 1px;
      width: ($radius - $size - $space) * 2;
      height: ($radius - $size - $space) * 2;
      border-radius: 50%;
      border: 1px solid #9DD0FF;
      background-color: $bgColor; 
    }
  }
}

$radius: 359px;
$size: 35px;
$space: 7px;

.dunwei {
  margin-right: 10%;

  @include plate('.plate_1');
  @include plate('.plate_2', $radius - ($size + $space) * 2);
  @include plate('.plate_3', $radius - ($size + $space) * 4, $size, $space, #B6CDE1);
  
  .plate_3 {
    padding: $size * 2 + $space * 2;
  }
}

.plate_inner {
  position: relative;
  height: 100%;
  z-index: 2;
  padding: 6px;
  border-radius: 50%;
  border: 1px solid #9DD0FF;
  background-color: #ECF5FF;
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
  transform-origin: center center;

  @include valueBox(32px, 20px, #0084FF, #fff);

  color: #fff;
}

.value {
  position: absolute;
  display: block;

  @include valueBox(32px, 20px);
}

.group {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -10px;
  margin-left: -16px;
  width: 32px;
  height: 20px;
}
</style>  