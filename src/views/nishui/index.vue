<script setup lang="ts">
import AlarmPane from './right/AlarmPane.vue';
import FlowPane from './right/FlowPane.vue';
import Pressure from './right/Pressure.vue';
import WavePane from './right/WavePane.vue';
import MainNishui from './Main.vue';
</script>

<template>
  <Content>
    <MainNishui />
  </Content>
  <RightPane>
    <FlowPane />
    <Pressure />
    <Title1 class="mg-t-sm mg-l mg-r">振动分析</Title1>
    <WavePane />
    <Title1 class="mg-t-sm mg-l mg-r">预测报警</Title1>
    <AlarmPane />
  </RightPane>
</template>