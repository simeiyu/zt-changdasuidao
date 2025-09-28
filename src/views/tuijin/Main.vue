<script setup lang="ts">
import { filter, map, toNumber } from 'lodash';
import socket from '~/socket';

const connected = ref(false)
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
  socket.on('connect', () => {
    connected.value = true
    socket.emit("type:sub", {type: "同步推拼阈值"}, (res: any) => {
      console.log('同步推拼阈值', res)
    })
  })
  socket.on("type:resp", (res: any) => {
    console.log('type:resp=同步推拼阈值=>', res)
    const { type, items } = res
    if (type === '同步推拼阈值' && items.length) {
      comments.forEach((comment, i) => {
        const item = items.find((item: any) => item.key === comment)
        if (item) {
          source[i].value = item.value
        }
      });
    }
    if (type === '推进油缸压力' && items.length) {
      // 压力
      const yali = map(filter(items, (item) => item.key.indexOf('推进油缸') > -1), (item) => {
        const key = toNumber(item.key.replace('推进油缸', '').replace('压力', ''))
        return { ...item, key }
      })
      const yali_data = yali.sort((a, b) => a.key - b.key)
      pressure.value = map(yali_data, (item) => item.value)
      // 状态
      const zhuangtai = map(filter(items, (item) => item.key.indexOf('油缸状态') > -1), (item) => {
        const key = toNumber(item.key.replace('#油缸状态', ''))
        return { ...item, key }
      })
      const zhuangtai_data = zhuangtai.sort((a, b) => a.key - b.key)
      status.value = map(zhuangtai_data, (item) => item.value)
      // 位移
      const weiyi = map(filter(items, (item) => item.key.indexOf('组位移') > -1), (item) => {
        const key = toNumber(item.key.replace('组位移', ''))
        return { ...item, key }
      })
      shifting.value = weiyi
    }
  })
  socket.on("disconnect", () => {
    connected.value = false
  })
})

// 同步推拼阈值
const comments = ['同拼模式开始最小位移', '推进分区允许最大压力设置值', '同拼推进压力下限']
const source = reactive([
  {id: 'db999_648', label: '同步拼装开始最小移', value: '', unit: 'mm'},
  {id: 'db999_460', label: '同步推拼上限压力', value: '', unit: 'bar'},
  {id: 'db999_666', label: '同步推拼下限压力', value: '', unit: 'bar'},
])

// 推进油缸
const group = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28']
// 推进油缸压力
const pressure = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
// 推进油缸状态
const status = ref([true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true])
// 推进组位移
const shifting = ref<Array<any>>([])

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
                <span class="shifting" v-for="(item, j) in shifting"
                  :key="item.key" 
                  :style="{ transform: getTransform(j, shifting.length, 120) }">{{ item.value }}</span>
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