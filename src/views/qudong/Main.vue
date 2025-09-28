<script setup lang="ts">
import { filter, forEach, map, toNumber } from 'lodash';
import socket, { state } from '~/socket';

const connected = ref(false)
const scale = ref(1);
const MinWidth = 768;
const wrapper = ref<HTMLDivElement | null>(null);

const UNITS: {[key: string]: string} = {
  '电流': 'A',
  '温度': '℃',
  '扭矩': 'Nm',
  '峭度': '',
  '转速': 'rpm',
  '磨损': '',
}

const updateScale = () => {
  if (wrapper.value) {
    const wrapperWidth = wrapper.value.offsetWidth;
    const _scale = wrapperWidth / MinWidth;
    scale.value = _scale > 1 ? 1 : _scale;
  }
}

useResizeObserver(wrapper, updateScale)

const updateData = (items: any[]) => {
  const statusData = map(filter(items, (item: any) => item.key.indexOf('状态指示灯') > -1), (item: any) => {
    const key = toNumber(item.key.replace('状态指示灯', '').replace('电机M', ''))
    return {
      ...item,
      key,
    }
  })
  forEach(statusData, (item: any) => {
    data[item.key].status = item.value
  })

  properties.forEach((property) => {
    const dataItems = map(filter(items, (item: any) => item.key.indexOf(property) > -1), (item: any) => {
      const key = toNumber(item.key.replace(`#电机${property}`, ''))
      return {
        ...item,
        key,
      }
    })
    console.log(property, '---> ', dataItems)
    forEach(dataItems, (item: any) => {
      data[item.key][property] = item.value
    })
  })
}

onMounted(() => {
  updateScale();
  console.log('驱动点击 Main mounted')
  
  !state.connected ? socket.on('connect', () => {
    socket.emit("type:sub", {type: "驱动电机"}, (res: any) => {
      console.log('驱动电机', res)
    })
  }) : socket.emit("type:sub", {type: "驱动电机"})
  
  socket.on("type:resp", (res: any) => {
    console.log('type:resp=驱动电机=>', res)
    const { type, items } = res
    if (type === '驱动电机' && items.length) {
      console.log('驱动电机', items)
      updateData(items)
    }
  })
})

const properties = ["电流", "温度", "扭矩", "峭度", "转速", "磨损"]

const data = reactive<{[key: number]: {[key: string]: any}}>({
  1: {
  },
  2: {
  },
  3: {
  },
  4: {
  },
  5: {
  },
  6: {
  },
  7: {
  },
  8: {
  },
  9: {
  },
  10: {
  },
  11: {
  },
  12: {
  },
  13: {
  },
  14: {
  },
})

const R = 220;

const getTransform = (i: number, offset=0) => {
  const angle = 360 / 14 * i - 90;
  const radius = R + offset;
  const x = Math.round(Math.cos(angle * Math.PI / 180) * radius * 100) / 100;
  const y = Math.round(Math.sin(angle * Math.PI / 180) * radius * 100) / 100;
  return `translate(${x}px, ${y}px)`
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
                <el-popover :width="260" popper-class="pop" :show-arrow="false" v-for="(item, key) in data" :title="key + '#电机运行参数'" :key="key">
                  <template #reference>
                    <div class="value" :class="{'red': key === 4}" :style="{ transform: getTransform(key-1, 80) }">
                      <span>{{ key }}</span>
                    </div>
                  </template>
                  <template #default>
                    <ul class="list">
                      <li v-for="(label) in properties" :key="label">
                        <span>{{ label }}</span>
                        <span>{{ item[label] }}</span>
                        <span>{{ UNITS[label] }}</span>
                      </li>
                    </ul>
                  </template>
                </el-popover>
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

.box {
  position: absolute;
  top: 60px;
  left: 49px;
  width: 322px;
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
    width: 156px;
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
    @include valueBox(80px, 20px, #fff, #C2C7CC);
  }
}

.list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;

  >li {
    padding: 4px 0;
    flex: 0 0 50%;
    white-space: nowrap;

    &:nth-child(2n) {
      padding-left: 8px;
    }

    >span {
      display: inline-block;

      &:first-child {
        margin-right: 8px;

        &::after {
          content: ':';
        }
      }

      &:nth-child(2) {
        width: 3em;
      }
    }
  }
}
</style>  