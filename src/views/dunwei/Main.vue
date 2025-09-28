<script setup lang="ts">
import { filter, find, forEach, map, toNumber } from 'lodash';
import socket from '~/socket';

const connected = ref(false)
const scale = ref(1);
const MinWidth = 766;
const wrapper = ref<HTMLDivElement | null>(null);

const updateScale = () => {
  if (wrapper.value) {
    const wrapperWidth = wrapper.value.offsetWidth;
    const _scale = wrapperWidth / MinWidth;
    scale.value = _scale > 1 ? 1 : _scale;
  }
}

useResizeObserver(wrapper, updateScale)

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
// 盾尾油脂泵
const data = ref([{
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
}])

/**
 * 密封腔压力
 * 从内圈往外圈分别为：盾尾密封前腔、盾尾密封前中腔、盾尾密封后中腔、盾尾密封后腔、盾尾密封预留腔
 * 最大压力设定：超出最大压力，显示红色
 */
const group = ['1#', '2#', '3#', '4#', '5#', '6#', '7#', '8#', '9#', '10#', '11#', '12#', '13#', '14#', '15#', '16#']
const names = ['盾尾密封前腔', '盾尾密封前中腔', '盾尾密封后中腔', '盾尾密封后腔', '盾尾密封预留腔']
const values = reactive([
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
])
const maxLimits = reactive([
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
])

const R = 130;

const getTransform = (i: number, j=0) => {
  const angle = 360 / group.length * i - 90;
  const radius = R + j * 42;
  const x = Math.round(Math.cos(angle * Math.PI / 180) * radius * 100) / 100;
  const y = Math.round(Math.sin(angle * Math.PI / 180) * radius * 100) / 100;
  return `translate(${x}px, ${y}px)`
}

// 更新盾尾油脂泵
const updateData = (items: any[]) => {
  const dataMap: { [key: string]: any[] } = {}
  forEach(items, ({key, value}) => {
    const keyArr = key.split('#')
    const num = keyArr[0].replace('盾尾油脂泵', '')
    if (!dataMap[num]) {
      dataMap[num] = [null, null]
    }
    if (keyArr[1] === '手动冲程') {
      dataMap[num][0] = value
    } else if (keyArr[1] === '出口压力') {
      dataMap[num][1] = value
    }        
  })
  console.log('盾尾油脂泵 dataMap', dataMap)
  data.value = Object.keys(dataMap).map(key => {
    const [value1, value2] = dataMap[key]
    return {
      label: `${key}#`,
      value1,
      value2,
    }
  })
}

// 更新密封腔压力
const updateValues = (items: any[]) => {
  names.forEach((name, i) => {
    const alldata = filter(items, ({key}) => key.indexOf(name) > -1)
    let rows = filter(alldata, ({key}) => key.indexOf('#压力') > -1)
    let limits = filter(alldata, ({key}) => key.indexOf('#最大压力设定') > -1)
    rows = map(rows, (item: {key: string, value: any}) => ({ ...item, key: toNumber(item.key.replace(name, '').replace('#压力', '')) }))
    limits = map(limits, (item: {key: string, value: any}) => ({ ...item, key: toNumber(item.key.replace(name, '').replace('#最大压力设定', '')) }))
    rows = rows.sort((a, b) => a.key - b.key)
    limits = limits.sort((a, b) => a.key - b.key)
    console.log('  密封腔压力', name, rows)
    console.log('最大压力设定', name, rows)
    values[i] = rows.map(({value}) => value)
    maxLimits[i] = limits.map(({value}) => value)
  })
}

onMounted(() => {
  updateScale();
  socket.on('connect', () => {
    connected.value = true
    socket.emit("type:sub", {type: "盾尾油脂泵"}, (res: any) => {
      console.log('盾尾油脂泵', res)
    })
  })
  socket.on("type:resp", (res: any) => {
    console.log('type:resp=盾尾油脂泵=>', res)
    const { type, items } = res
    if (type === '盾尾油脂泵' && items.length) {
      console.log('盾尾油脂泵', items)
      updateData(items)
    }
    if (type === '密封腔压力' && items.length) {
      console.log('密封腔压力', items)
      updateValues(items)
    }
  })
  socket.on("disconnect", () => {
    connected.value = false
  })
})
</script>

<template>
  <div class="wrapper" ref="wrapper">
    <div class="main" :style="{ transform: `scale(${scale})` }">
      <RunStatus />
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
                        <span v-for="(item, i) in group"
                          class="label"
                          :key="item"
                          :style="{ transform: getTransform(i) }"
                        >{{ item }}</span>
                        <template v-for="(row, i) in values" :key="i">
                          <span class="value" v-for="(value, j) in row"
                            :key="j" :class="{ 'red': value > maxLimits[i][j] }"
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
  min-height: 100%;
  padding: 200px 48px 24px 24px;
  transform-origin: 0 0;
  display: flex;
  justify-content: center;
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

  &.red {
    color: var(--el-color-danger);
    border-color: var(--el-color-danger);
    background-color: var(--el-color-danger-light-9);
  }
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