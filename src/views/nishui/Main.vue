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
        <div class="points"></div>
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
}
</style>
