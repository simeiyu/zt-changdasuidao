<script setup lang="ts">
import { filter, forEach, keys } from 'lodash';
import socket, { state } from '~/socket';

const scale = ref(1);
const MinWidth = 1204;
const wrapper = ref<HTMLDivElement | null>(null);

interface Item {key: string, value: string | number};

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
  handleSocket()
})

const columns = [{
  field: 'label',
  title: ''
}, {
  field: 'value1',
  title: '磨损检测-1',
  unit: 'mm',
  output: true
},{
  field: 'value2',
  title: '磨损检测-2',
  unit: 'mm',
  output: true
}]

const data = ref<Array<{label: string, [key:string]: string | number}>>([{
  label: '排浆斜管',
  value1: '',
  value2: '',  
}, {
  label: '排浆直管',
  value1: '',
  value2: '',  
}, {
  label: 'P2.1出口泥浆硬管',
  value1: '',
  value2: '',  
}, {
  label: '进浆管',
  value1: '',
  value2: '',  
}, {
  label: 'P0.1出口泥浆硬管',
  value1: '',
  value2: '',  
}, {
  label: 'P0.2出口泥浆硬管',
  value1: '',
  value2: '',  
}, {
  label: '',
  value1: '',
  value2: '',  
}])

const P0_X = reactive<{ [key:string]: string | number }>({})
const P1_X = reactive<{ [key:string]: string | number }>({})
const washFlow = reactive<{ [key:string]: string | number }>({})
const nishuiCang = reactive<{ [key:string]: string | number }>({})
const zhongxin = reactive<{ [key:string]: string | number }>({})
const baoyagx = reactive<{ [key:string]: string | number }>({})
const jinPaiJiang = reactive<{ [key:string]: string | number }>({})
const V6x = reactive<{ [key:string]: string | number }>({})
const Fx = reactive<{ [key:string]: string | number }>({})
const yeweiLed = reactive<{ [key:string]: string | number }>({})

const handleEmit = () => {
  socket.emit("type:sub", { type: '磨损检测' })
  socket.emit("type:sub", { type: 'P0.1/P0.2' })
  socket.emit("type:sub", { type: 'P1.1/P2.1' })
  socket.emit("type:sub", { type: '冲刷流量' })
  socket.emit("type:sub", { type: '泥水仓压力' })
  socket.emit("type:sub", { type: '中心冲刷支路' })
  socket.emit("type:sub", { type: '保压管线' })
  socket.emit("type:sub", { type: '进浆/排浆' })
  socket.emit("type:sub", { type: 'V61 - V68' })
  socket.emit("type:sub", { type: 'F1 - F50' })
  socket.emit("type:sub", { type: '泥水仓液位指示灯' })
}

function updateItems(items: Array<Item>, refObj: {[key:string]: string | number}) {
  forEach(items, (item: Item) => {
    refObj[item.key] = item.value
  })
}

function updateData(items: Array<Item>) {
  const _data: {[key:string]: {[key:string]: string | number}} = {}
  forEach(items, (item) => {
    const { key, value } = item
    const keys = key.split('磨损检测-')
    if (!_data[keys[0]]) _data[keys[0]] = {}
    _data[keys[0]][`value${keys[1]}`] = value
  })
  data.value = keys(_data).map((key) => {
    return {
      label: key,
      ..._data[key]
    }
  })
}

function handleSocket() {
  !state.connected ? socket.on('connect', () => {
    handleEmit()
  }) : handleEmit();

  socket.on("type:resp", (res: any) => {
    const { type, items } = res
    if (!items.length) return
    console.log('=== 泥水环流 ===>', res)
    switch (type) {
      case '磨损检测':
        updateData(items)
        break
      case 'P0.1/P0.2':
        updateItems(items, P0_X)
        break
      case 'P1.1/P2.1':
        updateItems(items, P1_X)
        break
      case '冲刷流量':
        updateItems(items, washFlow)
        break
      case '泥水仓压力':
        updateItems(items, nishuiCang)
        break
      case '中心冲刷支路':
        updateItems(items, zhongxin)
        break
      case '保压管线':
        updateItems(items, baoyagx)
        break
      case '进浆/排浆':
        updateItems(items, jinPaiJiang)
        break
      case 'V61 - V68':
        updateItems(items, V6x)
        break
      case 'F1 - F50':
        updateItems(items, Fx)
        break
      case '泥水仓液位指示灯':
        updateItems(items, yeweiLed)
        break
    }
  })
}

</script>

<template>
  <div class="wrapper" ref="wrapper">
    <div class="nishui" :style="{ transform: `scale(${scale})` }">
      <RunStatus />
      <InfoPane class="info" :columns="columns" :data="data" />
      <div class="configuration">
        <!-- 测点 -->
        <div class="points">
          <span class="C8">C8</span>
          <span class="C9">C9</span>
          <span class="V32">V32</span>
          <span class="V55">V55</span>
          <span class="V61" :class="{'red': V6x['V61'] === '1'}">V61</span>
          <span class="V62">V62</span>
          <span class="V63">V63</span> 
          <span class="V64">V64</span>
          <span class="V66">V66</span>
          <span class="V67">V67</span>
          <span class="V68">V68</span>
          <span class="V69">V69</span>
          <span class="V70">V70</span>
          <span class="V71">V71</span>
          <span class="V72">V72</span>
          <span class="V73">V73</span>
          <span class="V74">V74</span>
        </div>
        <!-- 阀门 -->
        <div class="tap">
          <div class="tap-col tap-col_1">
            <span>P1</span>
            <span>P2</span>
            <span :class="{'red': Fx['F11'] === '1'}">F11</span>
            <span>F12</span>
            <span>F1</span>
            <span>F17</span>
            <span>F18</span>
            <span>F6</span>
            <span>F3</span>
            <span>F4</span>
            <span>F7</span>
          </div>
          <div class="tap-col tap-col_2">
            <span>F8</span>
            <span>F30</span>
            <span>F31</span>
            <span>F32</span>
            <span>F37</span>
            <span>F38</span>
          </div>
          <div class="tap-col tap-col_3">
            <span>F51</span>
            <span>F50</span>
          </div>
          <span class="P0_1" :class="{'red': P0_X['P0.1泵启动按钮灯'] === '1'}">P0.1</span>
          <span class="P0_2" :class="{'red': P0_X['P0.2泵启动按钮灯'] === '1'}">P0.2</span>
          <span class="P1_1" :class="{'red': P1_X['P1.1泵启动按钮灯'] === '1'}">P1.1</span>
          <span class="P2_1" :class="{'red': P1_X['P2.1泵启动按钮灯'] === '1'}">P2.1</span>
        </div>
        <div class="tag" style="top: 684px; left: 554px;">采石箱</div>
        <!-- 信号灯 -->
        <div class="state-group">
          <div class="state"><span class="led led-red"></span>5.6m</div>
          <div class="state" style="margin-top: 22px;"><span class="led led-red"></span>4.8m</div>
          <div class="state" style="margin-top: 18px;"><span class="led led-red"></span>4.0m</div>
          <div class="state" style="margin-top: 50px;"><span class="led led-red"></span>3.2m</div>
          <div class="state" style="margin-top: 60px;"><span class="led led-green"></span>2.4m</div>
          <div class="state" style="margin-top: 40px;"><span class="led led-red"></span>1.6m</div>
          <div class="state" style="margin-top: 18px;"><span class="led led-yellow"></span>0.8m</div>
          <div class="state" style="margin-top: 22px;"><span class="led led-red"></span>0m</div>
          <div class="state" style="margin-top: 26px;"><span class="led led-red"></span>-0.7m</div>
          <div class="state" style="margin-top: 20px;"><span class="led led-red"></span>-1.4m</div>
          <div class="state" style="margin-top: 24px;"><span class="led led-red"></span>-2.1m</div>
          <div class="state" style="margin-top: 18px;"><span class="led led-red"></span>-2.8m</div>
          <div class="state" style="margin-top: 18px;"><span class="led led-red"></span>-3.5m</div>
          <div class="state" style="margin-top: 18px;"><span class="led led-red"></span>-4.2m</div>
          <div class="state" style="margin-top: 14px;"><span class="led led-red"></span>-4.2m</div>
          <div class="state" style="margin-top: 12px;"><span class="led led-red"></span>-5.6m</div>
        </div>
        <!-- 顶部 -->
        <div class="sup">
          <div class="sup-item">
            <div class="out-title">泥水仓压力</div>
            <div class="out-row">
              <div class="out-label">顶左</div>
              <div class="out-value">{{ nishuiCang['泥水仓压力6-顶左'] }}</div>
              <div class="out-unit">bar</div>
            </div>
            <div class="out-row">
              <div class="out-label">顶右</div>
              <div class="out-value">{{ nishuiCang['泥水仓压力1-顶右'] }}</div>
              <div class="out-unit">bar</div>
            </div>
          </div>
          <div class="sup-item">
            <div class="out-title"></div>
            <div class="out-row">
              <div class="out-label">气垫仓压力</div>
              <div class="out-value">{{ nishuiCang['气垫仓压力'] }}</div>
              <div class="out-unit">bar</div>
            </div>
            <div class="out-row">
              <div class="out-label">中心仓压力</div>
              <div class="out-value">{{ nishuiCang['中心仓压力'] }}</div>
              <div class="out-unit">bar</div>
            </div>
          </div>
          <div class="sup-item">
            <div class="out-title">保压管线压力</div>
            <div class="out-row">
              <div class="out-label">1#</div>
              <div class="out-value">{{ baoyagx['保压管线1#压力'] }}</div>
              <div class="out-unit">bar</div>
            </div>
            <div class="out-row">
              <div class="out-label">2#</div>
              <div class="out-value">{{ baoyagx['保压管线2#压力'] }}</div>
              <div class="out-unit">bar</div>
            </div>
            <div class="out-row">
              <div class="out-label">保压主管路</div>
              <div class="out-value">{{ baoyagx['保压主管线压力'] }}</div>
              <div class="out-unit">bar</div>
            </div>
          </div>
          <div class="sup-item">
            <div class="out-title"></div>
            <div class="out-row">
              <div class="out-label">雷达液位</div>
              <div class="out-value">{{ baoyagx['雷达液位'] }}</div>
              <div class="out-unit">m</div>
            </div>
          </div>
        </div>
        <div class="out-group" style="top: 40px; left: 488px;">
          <div class="out-row">
            <div class="out-label">双仓压差</div>
            <div class="out-value">{{ baoyagx['双仓压差'] }}</div>
            <div class="out-unit">bar</div>
          </div>
          <div class="out-row">
            <div class="out-label">泥仓压差</div>
            <div class="out-value">{{ baoyagx['泥仓压差'] }}</div>
            <div class="out-unit">bar</div>
          </div>
        </div>
        <!-- 进浆 排浆 -->
        <div class="out-group" style="top: 70px; left: 880px;">
          <div class="out-row">
            <div class="out-label"> </div>
            <div class="out-value">{{ jinPaiJiang['进浆压力'] }}</div>
            <div class="out-unit">bar</div>
          </div>
          <div class="out-row">
            <div class="out-label">进浆</div>
            <div class="out-value">{{ jinPaiJiang['主进浆温度'] }}</div>
            <div class="out-unit">℃ </div>
          </div>
          <div class="out-row">
            <div class="out-label"> </div>
            <div class="out-value">{{ jinPaiJiang['主进浆流量'] }}</div>
            <div class="out-unit">m 3/h</div>
          </div>
        </div>
        <div class="out-group" style="top: 98px; left: 1030px;">
          <div class="out-title text-left">进浆密度</div>
          <div class="out-row">
            <div class="out-value">{{ jinPaiJiang['进浆密度'] }}</div>
            <div class="out-unit">T/m 3</div>
          </div>
        </div>
        <div class="out-group" style="top: 222px; left: 980px;">
          <div class="out-row">
            <div class="out-label">进</div>
            <div class="out-value">{{ P1_X['P1.1泵进口压力'] }}</div>
            <div class="out-unit">bar</div>
          </div>
          <div class="out-row"> 
            <div class="out-label">出</div>
            <div class="out-value">{{ P1_X['P1.1泵出口压力'] }}</div>
            <div class="out-unit">bar</div>
          </div>
        </div>
        <div class="out-group" style="top: 222px; left: 1090px;">
          <div class="out-row">
            <div class="out-value">{{ P1_X['P1.1泵转速'] }}</div>
            <div class="out-unit">rpm</div>
          </div>
          <div class="out-row">
            <div class="out-value">{{ P1_X['P1.1泵电流'] }}</div>
            <div class="out-unit">A</div>
          </div>
        </div>
        <div class="out-group" style="top: 308px; left: 1038px;">
          <div class="out-row">
            <div class="out-label">给定</div>
            <div class="out-value">{{ P1_X['P1.1泵速度给定'] }}</div>
            <div class="out-unit">%</div>
          </div>
        </div>
        <div class="out-group" style="top: 360px; left: 880px;">
          <div class="out-row">
            <div class="out-label"> </div>
            <div class="out-value">{{ jinPaiJiang['主排浆压力'] }}</div>
            <div class="out-unit">bar</div>
          </div>
          <div class="out-row">
            <div class="out-label">排浆</div>
            <div class="out-value">{{ jinPaiJiang['主排浆温度'] }}</div>
            <div class="out-unit">℃ </div>
          </div>
          <div class="out-row">
            <div class="out-label"> </div>
            <div class="out-value">{{ jinPaiJiang['主排浆流量'] }}</div>
            <div class="out-unit">m 3/h</div>
          </div>
        </div>
        <div class="out-group" style="top: 374px; left: 1008px;">
          <div class="out-row">
            <div class="out-label">排浆密度</div>
            <div class="out-value">{{ jinPaiJiang['排浆密度'] }}</div>
            <div class="out-unit">T/m 3</div>
          </div>
          <div class="out-row">
            <div class="out-label">排浆SY</div>
            <div class="out-value">{{ jinPaiJiang['主排浆流量SY'] }}</div>
            <div class="out-unit">m 3/h</div>
          </div>
        </div>
        <div class="out-group small" style="top: 620px; left: 866px;">
          <div class="out-row">
            <div class="out-label">转速</div>
            <div class="out-value">{{ P1_X['P2.1泵转速'] }}</div>
            <div class="out-unit">rpm</div>
          </div>
        </div>
        <div class="out-group small" style="top: 656px; left: 866px;">
          <div class="out-row">
            <div class="out-label">电流</div>
            <div class="out-value">{{ P1_X['P2.1泵电流'] }}</div>
            <div class="out-unit">A密封 </div>
          </div>
        </div>
        <div class="out-group small" style="top: 620px; left: 990px;">
          <div class="out-row">
            <div class="out-label">给定</div>
            <div class="out-value">{{ P1_X['P2.1泵速度设定'] }}</div>
            <div class="out-unit">%</div>
          </div>
        </div>
        <div class="out-group small" style="top: 656px; left: 990px;">
          <div class="out-row">
            <div class="out-label">冲洗</div>
            <div class="out-value">{{ P1_X['P2.1密封冲洗流量'] }}</div>
            <div class="out-unit">m 3/h</div>
          </div>
        </div>
        <div class="out-group" style="top: 708px; left: 866px;">          
          <div class="out-row">
            <div class="out-label">压力</div>
            <div class="out-value">{{ P1_X['P2.1泵进口压力'] }}</div>
            <div class="out-unit">bar</div>
          </div>
        </div>
        <!-- 左侧第1列 -->
        <div class="out-group small" style="top: 108px; left: 5px;">
          <div class="out-title">右中上</div>          
          <div class="out-row">
            <div class="out-value">{{ nishuiCang['泥水仓压力2-右中上'] }}</div>
            <div class="out-unit">bar</div>
          </div>
        </div>
        <div class="out-group small" style="top: 194px; left: 5px;">
          <div class="out-title">左中上</div>          
          <div class="out-row">
            <div class="out-value">{{ nishuiCang['泥水仓压力5-左中上'] }}</div>
            <div class="out-unit">bar</div>
          </div>
        </div>
        <div class="out-group small" style="top: 250px; left: 5px;">
          <div class="out-title">中心冲刷支路</div>          
          <div class="out-row">
            <div class="out-value">{{ zhongxin['刀盘中心冲刷流量3'] }}</div>
            <div class="out-unit">m 3/h</div>
          </div>
        </div>
        <!-- 左侧第2列 -->
        <div class="out-group small" style="top: 110px; left: 220px;">          
          <div class="out-row">
            <div class="out-label">上部冲刷（左）</div>
            <div class="out-value">{{ washFlow['上部冲刷（左）流量'] }}</div>
            <div class="out-unit">m 3/h</div>
          </div>
        </div>
        <div class="out-group small" style="top: 204px; left: 220px;">          
          <div class="out-row">
            <div class="out-label">上部冲刷（右）</div>
            <div class="out-value">{{ washFlow['上部冲刷（右）流量'] }}</div>
            <div class="out-unit">m 3/h</div>
          </div>
        </div>
        <div class="out-group" style="top: 336px; left: 247px;">          
          <div class="out-row">
            <div class="out-label">泥浆门冲刷</div>
            <div class="out-value">{{ washFlow['泥浆门冲刷流量'] }}</div>
            <div class="out-unit">m 3/h</div>
          </div>
        </div>
        <div class="out-group" style="top: 457px; left: 247px;">          
          <div class="out-row">
            <div class="out-label">格栅后冲刷</div>
            <div class="out-value">{{ washFlow['格栅后冲刷流量'] }}</div>
            <div class="out-unit">m 3/h</div>
          </div>
        </div>
        <div class="out-group" style="top: 498px; left: 247px;">          
          <div class="out-row">
            <div class="out-label">搅拌器冲刷</div>
            <div class="out-value">{{ washFlow['搅拌器冲刷流量'] }}</div>
            <div class="out-unit">m 3/h</div>
          </div>
        </div>
        <div class="out-group" style="top: 574px; left: 235px;">          
          <div class="out-row">
            <div class="out-label">泥浆门后冲刷</div>
            <div class="out-value">{{ washFlow['泥浆门后冲刷'] }}</div>
            <div class="out-unit">m 3/h</div>
          </div>
        </div>
        <div class="out-group" style="top: 428px; left: 228px;">逆冲洗管</div>      
        <!-- 左侧第3列 -->
        <div class="out-group" style="top: 166px; left: 442px;">          
          <div class="out-row">
            <div class="out-label">流量</div>
            <div class="out-value">{{ P0_X['P0.1出口流量'] }}</div>
            <div class="out-unit">m 3/h</div>
          </div>
          <div class="out-row">
            <div class="out-label">压力</div>
            <div class="out-value">{{ P0_X['P0.1泵出口压力'] }}</div>
            <div class="out-unit">bar</div>
          </div>
        </div>
        <div class="out-group" style="top: 245px; left: 442px;">          
          <div class="out-row">
            <div class="out-label">转速</div>
            <div class="out-value">{{ P0_X['P0.1泵转速'] }}</div>
            <div class="out-unit">rpm</div>
          </div>
          <div class="out-row">
            <div class="out-label">电流</div>
            <div class="out-value">{{ P0_X['P0.1泵电流'] }}</div>
            <div class="out-unit">A密封</div>
          </div>
        </div>
        <div class="out-group" style="top: 245px; left: 564px;">
          <div class="out-row">
            <div class="out-label">给定</div>
            <div class="out-value">{{ P0_X['P0.1泵速度给定'] }}</div>
            <div class="out-unit">%</div>
          </div>
          <div class="out-row">
            <div class="out-label">冲洗</div>
            <div class="out-value">{{ P0_X['P0.1密封冲洗流量'] }}</div>
            <div class="out-unit">m 3/h</div>
          </div>
        </div>
        <div class="out-group" style="top: 338px; left: 442px;">          
          <div class="out-row">
            <div class="out-label">压力</div>
            <div class="out-value">{{ P0_X['P0.2泵出口压力'] }}</div>
            <div class="out-unit">bar</div>
          </div>
        </div>
        <div class="out-group" style="top: 394px; left: 442px;">          
          <div class="out-row">
            <div class="out-label">转速</div>
            <div class="out-value">{{ P0_X['P0.2泵转速'] }}</div>
            <div class="out-unit">rpm</div>
          </div>
          <div class="out-row">
            <div class="out-label">电流</div>
            <div class="out-value">{{ P0_X['P0.2泵电流'] }}</div>
            <div class="out-unit">A密封</div>
          </div>
        </div>
        <div class="out-group" style="top: 368px; left: 564px;">          
          <div class="out-row mg-b">
            <div class="out-value">过滤器</div>
            <div class="out-unit"></div>
          </div>
          <div class="out-row">
            <div class="out-label">给定</div>
            <div class="out-value">{{ P0_X['P0.2泵速度给定'] }}</div>
            <div class="out-unit">%</div>
          </div>
          <div class="out-row">
            <div class="out-label">冲洗</div>
            <div class="out-value">{{ P0_X['P0.2密封冲洗流量'] }}</div>
            <div class="out-unit">m 3/h</div>
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

.nishui {
  position: relative;
  min-width: 1204px;

  // min-height: 100%;
  padding: 196px 16px 12px;
  transform-origin: 0 0;
}

.info {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 30%;
  min-width: 392px;
}

.out {
    &-title {
      height: 18px;
      line-height: 18px;
      white-space: nowrap;
      text-align: center;
    }

    &-row {
      margin: 3px 0;
      display: flex;
      justify-content: flex-end;
      align-items: center;      
    }

    &-label {
      padding: 0 8px;
      line-height: 20px;
      white-space: nowrap;
    }

    &-value {
      @include valueBox;

      white-space: nowrap;
    }

    &-unit {
      width: 3.2em;
      padding: 0 5px;
      line-height: 20px;
      white-space: nowrap;
    }

    &-group {
      position: absolute;
      z-index: 3;

      .out-label, .out-unit {
        padding: 0 4px;
      }
    }
}

.tag {
  position: absolute;

  @include valueBox(52px, 28px);
}

.state {
  display: flex;
  align-items: center;
  height: 18px;
  font-size: var(--el-font-size-small);
  line-height: 1;

  &-group {
    position: absolute;
    top: 26px;
    left: 124px;
  }
}

.led {
  display: inline-block;
  margin-right: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #fff;
  background-position: center 33%;
  background-repeat: no-repeat;
  background-size: 120% 120%;
  
  &-red {
    background-image: url('~/assets/images/led_red@4x.png');
  }
  
  &-green {
    background-image: url('~/assets/images/led_green@4x.png');
  }
  
  &-yellow {
    background-image: url('~/assets/images/led_yellow@4x.png');
  }
}

.configuration {
  position: relative;
  width: 100%;
  max-width: 1156px;
  padding-bottom: 62.8%;
  font-size: var(--el-font-size-small);
  background-image: url('~/assets/images/nishui@1.5x.png');
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: contain;

  .sup {
    position: absolute;
    top: -68px;
    left: 0;
    height: 68px;
    display: flex;


    &-item {
      &:first-child {
        margin-left: 40px;
        margin-right: 0;
      }

      &:nth-child(3) {
        margin-right: 16px;
      }
    }
  }

  .tap {
    &-col_1 {
      position: absolute;
      top: 0;
      left: 212px;
      height: 100%;
      width: 32px;

      >span {
        position: absolute;

        &:nth-child(1) {
          top: 10px;
        }

        &:nth-child(2) {
          top: 46px;
        }

        &:nth-child(3) {
          top: 125px;
        }

        &:nth-child(4) {
          top: 172px;
        }

        &:nth-child(5) {
          top: 306px;
        }

        &:nth-child(6) {
          top: 342px;
        }

        &:nth-child(7) {
          top: 380px;
        }

        &:nth-child(8) {
          top: 462px;
        }

        &:nth-child(9) {
          top: 504px;
        }

        &:nth-child(10) {
          top: 544px;
        }

        &:nth-child(11) {
          top: 581px;
        }
      }
    }

    &-col_2 {
      position: absolute;
      top: 87px;
      left: 518px;
      height: 642px;
      width: 32px;

      >span {
        position: absolute;

        &:nth-child(2) {
          top: 36px;
        }

        &:nth-child(3) {
          top: 420px;
          left: 102px;

          &::after {
            top: -5px;
            transform: rotate(90deg);
          }
        }

        &:nth-child(4) {
          top: 585px;
          left: -57px;
        }

        &:nth-child(5) {
          top: 396px;
          left: 318px;

          &::after {
            top: 18px;
            left: -29px;
            transform: rotate(90deg); 
          }
        }

        &:nth-child(6) {
          top: 584px;
          left: 152px;
        }
      }
    }

    &-col_3 {
      position: absolute;
      top: 172px;
      left: 1088px;
      height: 360px;
      width: 32px;

      >span {
        position: absolute;

        &:nth-child(2) {
          top: 362px;
        }
      }
    }

    >span {
      position: absolute;

      &.red::after {
        content: '';
        display: block;
        position: absolute;
        top: -14px;
        left: 28px;
        width: 40px;
        height: 31px;
        background: url('~/assets/images/Beng.png') no-repeat center center;
        background-size: contain;
      }

      &.P0_1 {
        top: 223px;
        left: 508px;
      }

      &.P0_2 {
        top: 374px;
        left: 508px;
      }

      &.P1_1 {
        top: 286px;
        left: 1052px;
      }

      &.P2_1 {
        top: 694px;
        left: 990px;

        &::after {
          top: -16px;
          left: -36px;
          transform: rotateY(180deg);
        }
      }


    }

    &-col {
      .red::after {
        content: '';
        display: block;
        position: absolute;
        width: 42px;
        height: 26px;
        top: 8px;
        left: 1.26em;
        background: url('~/assets/images/F.png') no-repeat center center;
        background-size: contain;
      }
    }
  }

  .points {
    >span {
      position: absolute;

      &.red::after {
        content: '';
        display: block;
        position: absolute;
        width: 15px;
        height: 24px;
        background: url('~/assets/images/V.png') no-repeat center center;
        background-size: 100% 100%;
      }
    }

    .C8 {
      top: 294px;
      left: 38px;

      &::after {
        left: 1.4em;
        top: 0;
      }
    }

    .C9 {
      top: 323px;
      left: 38px;

      &::after {
        left: 1.4em;
        top: 0;
      }
    }

    .V32 {
      top: 675px;
      left: 350px;

      &::after {
        right: 2.3em;
        bottom: -1px;
      }
    }

    .V55 {
      top: 613px;
      left: 350px;

      &::after {
        right: 2.3em;
        bottom: -1px;
      }
    }

    .V61 {
      top: 186px;
      left: 618px;

      &::after {
        right: 3px;
        top: 1.3em;
      }
    }

    .V62 {
      top: 245px;
      left: 794px;

      &::after {
        left: 2.86em;
        top: -2px;
        transform: rotate(90deg);
      }
    }

    .V63 {
      top: 402px; 
      left: 854px;

      &::after {
        right: 2.3em;
        top: -2px;
        transform: rotate(90deg);
      }
    }

    .V64 {
      top: 474px;
      left: 471px;

      &::after {
        right: 2.2em;
        top: -2px;
        transform: rotate(90deg);
      }
    }

    .V66 {
      top: 645px;
      left: 350px;

      &::after {
        right: 2.3em;
        bottom: -3px;
      }
    }

    .V67 {
      top: 51px;
      left: 52px;

      &::after {
        left: 4.16em;
        top: -18px;
      }
    }

    .V68 {
      top: 87px;
      left: 52px;

      &::after {
        left: 4.16em;
        top: -18px;
      }
    }

    .V69 {
      top: 654px;
      left: 843px;

      &::after {
        left: 4px;
        top: 1.24em;
      }
    }

    .V70  {
      top: 621px;      
      left: 1097px;

      &::after {
        left: 2.3em;
        top: -3px;
        transform: rotate(-90deg);
      }
    }

    .V71 {
      top: 583px;      
      left: 1110px;

      &::after {
        left: -20px;
        top: -2px;
      }
    }

    .V72 {
      top: 494px;
      left:773px;

      &::after {
        left: -3px;
        top: 1.1em;
        transform: rotate(90deg);
      }
    }

    .V73 {
      top: 494px;
      left: 704px;

      &::after {
        left: -1px;
        top: 1.1em;
        transform: rotate(90deg);
      }
    }

    .V74 {
      top: 126px;
      left:745px;

      &::after {
        left: -18px;
        top: -2px;
      }
    }
  }

}
</style>
