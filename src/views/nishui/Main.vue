<script setup lang="ts">
const scale = ref(1);
const MinWidth = 1204;
const wrapper = ref<HTMLDivElement | null>(null);

const updateScale = () => {
  if (wrapper.value) {
    const wrapperWidth = wrapper.value.offsetWidth;
    scale.value = wrapperWidth / MinWidth;
  }
}

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
  title: '磨损检测-1',
  unit: 'mm',
  output: true
},{
  field: 'value2',
  title: '磨损检测-2',
  unit: 'mm',
  output: true
}]

const data = [{
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
}]

</script>

<template>
  <div class="wrapper" ref="wrapper">
    <div class="nishui" :style="{ transform: `scale(${scale})` }">
      <RunStatus class="status" :data="runStatusData" />
      <InfoPane class="info" :columns="columns" :data="data" />
      <div class="configuration">
        <!-- 测点 -->
        <div class="points">
          <span class="C8">C8</span>
          <span class="C9">C9</span>
          <span class="V32">V32</span>
          <span class="V55">V55</span>
          <span class="V61">V61</span>
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
          <div class="tap-col_1">
            <span>P1</span>
            <span>P2</span>
            <span>F11</span>
            <span>F12</span>
            <span>F1</span>
            <span>F17</span>
            <span>F18</span>
            <span>F6</span>
            <span>F3</span>
            <span>F4</span>
            <span>F7</span>
          </div>
          <div class="tap-col_2">
            <span>F8</span>
            <span>F30</span>
            <span>F31</span>
            <span>F32</span>
            <span>F37</span>
            <span>F38</span>
          </div>
          <div class="tap-col_3">
            <span>F51</span>
            <span>F50</span>
          </div>
          <span class="P0_1">P0.1</span>
          <span class="P0_2">P0.2</span>
          <span class="P1_1">P1.1</span>
          <span class="P2_1">P2.1</span>
        </div>
        <div class="sup">
          <div class="sup-item">
            <div class="sup-title">泥水仓压力</div>
            <div class="sup-row">
              <div class="sup-label">顶左</div>
              <div class="sup-value">0.0</div>
              <div class="sup-unit">bar</div>
            </div>
            <div class="sup-row">
              <div class="sup-label">顶右</div>
              <div class="sup-value">0.0</div>
              <div class="sup-unit">bar</div>
            </div>
          </div>
          <div class="sup-item">
            <div class="sup-title"></div>
            <div class="sup-row">
              <div class="sup-label">气垫仓压力</div>
              <div class="sup-value">0.0</div>
              <div class="sup-unit">bar</div>
            </div>
            <div class="sup-row">
              <div class="sup-label">中心仓压力</div>
              <div class="sup-value">0.0</div>
              <div class="sup-unit">bar</div>
            </div>
          </div>
          <div class="sup-item">
            <div class="sup-title">保压管线压力</div>
            <div class="sup-row">
              <div class="sup-label">1#</div>
              <div class="sup-value">0.0</div>
              <div class="sup-unit">bar</div>
            </div>
            <div class="sup-row">
              <div class="sup-label">2#</div>
              <div class="sup-value">0.0</div>
              <div class="sup-unit">bar</div>
            </div>
            <div class="sup-row">
              <div class="sup-label">保压主管路</div>
              <div class="sup-value">0.0</div>
              <div class="sup-unit">bar</div>
            </div>
          </div>
          <div class="sup-item">
            <div class="sup-title"></div>
            <div class="sup-row">
              <div class="sup-label">雷达液位</div>
              <div class="sup-value">0.0</div>
              <div class="sup-unit">m</div>
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

.nishui {
  position: relative;
  min-width: 1204px;
  min-height: 100%;
  padding: 196px 16px 12px;
  transform-origin: 0 0;
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
  width: 30%;
  min-width: 392px;
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
        margin-right: 12px;
      }

      &:nth-child(3) {
        margin-left: 16px;
        margin-right: 32px;
      }
    }

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
    }

    &-value {
      width: 50px;
      height: 20px;
      padding: 0 5px;
      border: 1px solid #C2C7CC;
      line-height: 18px;
      text-align: center;
      background-color: #EFF7FF;
    }

    &-unit {
      padding: 0 5px;
      line-height: 20px;
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
          top: 14px;
        }

        &:nth-child(2) {
          top: 46px;
        }

        &:nth-child(3) {
          top: 122px;
        }

        &:nth-child(4) {
          top: 170px;
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
          top: 464px;
        }

        &:nth-child(9) {
          top: 506px;
        }

        &:nth-child(10) {
          top: 546px;
        }

        &:nth-child(11) {
          top: 580px;
        }
      }
    }

    &-col_2 {
      position: absolute;
      top: 85px;
      left: 520px;
      height: 642px;
      width: 32px;

      >span {
        position: absolute;

        &:nth-child(2) {
          top: 40px;
        }

        &:nth-child(3) {
          top: 420px;
          left: 102px;
        }

        &:nth-child(4) {
          top: 574px;
          left: -32px;
        }

        &:nth-child(5) {
          top: 400px;
          left: 312px;
        }

        &:nth-child(6) {
          top: 576px;
          left: 176px;
        }
      }
    }

    &-col_3 {
      position: absolute;
      top: 160px;
      left: 1112px;
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

      &.P0_1 {
        top: 224px;
        left: 506px;
      }

      &.P0_2 {
        top: 374px;
        left: 506px;
      }

      &.P1_1 {
        top: 288px;
        left: 1054px;
      }

      &.P2_1 {
        top: 696px;
        left: 990px;
      }
    }
  }

  .points {
    >span {
      position: absolute;
    }

    .C8 {
      top: 294px;
      left: 38px;
    }

    .C9 {
      top: 323px;
      left: 38px;
    }

    .V32 {
      top: 675px;
      left: 350px;
    }

    .V55 {
      top: 613px;
      left: 350px;
    }

    .V61 {
      top: 186px;
      left: 618px;
    }

    .V62 {
      top: 245px;
      left: 794px;
    }

    .V63 {
      top: 402px; 
      left: 854px;
    }

    .V64 {
      top: 474px;
      left: 471px;
    }

    .V66 {
      top: 645px;
      left: 350px;
    }

    .V67 {
      top: 51px;
      left: 52px;
    }

    .V68 {
      top: 87px;
      left: 52px;
    }

    .V69 {
      top: 654px;
      left: 843px;
    }

    .V70  {
      top: 621px;      
      left: 1097px;
    }

    .V71 {
      top: 583px;      
      left: 1110px;
    }

    .V72 {
      top: 494px;
      left:773px;
    }

    .V73 {
      top: 494px;
      left: 704px;
    }

    .V74 {
      top: 126px;
      left:745px;
    }
  }
}
</style>
