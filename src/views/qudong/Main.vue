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

const source: Array<{label: string, value: string, unit?: string}> = [
  {label: '刀盘转速', value: '', unit: 'rpm'},
  {label: '给定频率', value: '', unit: 'Hz'},
  {label: '主驱动冷却流量', value: '', unit: 'm 3/h'},
  {label: '当前阶段', value: ''},
  {label: '当前堵转次数', value: ''},
  {label: '总堵转次数', value: ''},
  {label: '当前堵转次数', value: '', unit: 'rpm'},
]

const data: Array<{id: string, title: string, details: Array<{label: string, value: number, unit?: string}>}> = [
  {
    id: '1',
    title: '1#电机运行参数',
    details: [
      {label: '电流', value: 202, unit: 'A'},
      {label: '温度', value: 54, unit: '℃'},
      {label: '扭矩', value: 1045, unit: 'Nm'},
      {label: '峭度:', value: 5.2 },
      {label: '转速', value: 1280, unit: 'rpm'},
      {label: '磨损', value: 3.5}
    ]
  }, {
    id: '2',
    title: '2#电机运行参数',
    details: [
      {label: '电流', value: 202, unit: 'A'},
      {label: '温度', value: 54, unit: '℃'},
      {label: '扭矩', value: 1045, unit: 'Nm'},
      {label: '峭度:', value: 5.2 },
      {label: '转速', value: 1280, unit: 'rpm'},
      {label: '磨损', value: 3.5}
    ]
  }, {
    id: '3',
    title: '4#电机运行参数',
    details: [
      {label: '电流', value: 202, unit: 'A'},
      {label: '温度', value: 54, unit: '℃'},
      {label: '扭矩', value: 1045, unit: 'Nm'},
      {label: '峭度:', value: 5.2 },
      {label: '转速', value: 1280, unit: 'rpm'},
      {label: '磨损', value: 3.5}
    ]
  }, {
    id: '4',
    title: '4#电机运行参数',
    details: [
      {label: '电流', value: 202, unit: 'A'},
      {label: '温度', value: 54, unit: '℃'},
      {label: '扭矩', value: 1045, unit: 'Nm'},
      {label: '峭度:', value: 5.2 },
      {label: '转速', value: 1280, unit: 'rpm'},
      {label: '磨损', value: 3.5}
    ]
  }, {
    id: '5',
    title: '5#电机运行参数',
    details: [
      {label: '电流', value: 202, unit: 'A'},
      {label: '温度', value: 54, unit: '℃'},
      {label: '扭矩', value: 1045, unit: 'Nm'},
      {label: '峭度:', value: 5.2 },
      {label: '转速', value: 1280, unit: 'rpm'},
      {label: '磨损', value: 3.5}
    ]
  }
]

const R = 220;

const getTransform = (i: number, offset=0) => {
  const angle = 360 / data.length * i - 90;
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
                <el-popover :width="260" popper-class="pop" :show-arrow="false" v-for="(item, index) in data" :title="item.title" :key="item.id">
                  <template #reference>
                    <div class="value" :class="{'red': item.id === '4'}"
                      :key="index"
                      :style="{ transform: getTransform(index, 80) }"
                    ><span>{{ item.id }}</span></div>
                  </template>
                  <template #default>
                    <ul class="list">
                      <li v-for="(d, i) in item.details" :key="i">
                        <span>{{ d.label }}</span>
                        <span>{{ d.value }}</span>
                        <span>{{ d.unit }}</span>
                      </li>
                    </ul>
                  </template>
                </el-popover>
              </div>
              <!-- <div class="box">
                <div class="box-row" v-for="item in source" :key="item.label">
                  <label class="box-label">{{ item.label }}</label>
                  <span class="box-value">{{ item.value }}</span>
                  <span class="box-unit" v-if="item.unit">{{ item.unit }}</span>
                </div>
              </div> -->
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