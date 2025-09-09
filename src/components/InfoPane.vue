<script setup lang="ts">

const props = defineProps<{
  title?: string;
  columns: {field: string; title: string; unit?: string; output?: boolean; }[];
  data: Array<{ id?: string | number; [key: string]: any; }>;
}>()
</script>

<template>
  <div class="pane">
    <div v-if="title" class="pane-header">
      <span class="pane-title">{{ title }}</span>
    </div>
    <div class="thead">
      <div v-for="item in columns" :key="item.field" class="col">
        {{ item.title }}
      </div>
    </div>
    <div class="tbody">
      <div v-for="(item, index) in data" :key="item?.id || index" class="row">
        <div v-for="col in columns" :key="col.field" class="col">
          <span :class="{'output': col.output}">{{ item[col.field] }}</span>
          <span class="unit" v-if="col.unit">{{ col.unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pane {
  padding: 2px;
  width: 450px;
  border: solid 1px #C2C7CC;
  background-color: #fff;
  box-shadow: 0 2px 6px 0 rgb(0 0 0 / 10%);

  &-header {
    position: relative;
    height: 36px;
    margin: 6px 14px;
    padding: 8px 22px;
    line-height: 19px;

    &::before, &::after {
      content: '';
      position: absolute;
      display: block;
      border-style: solid;
    }

    &::before {
      top: 9px;
      left: 0;
      border-width: 9px 0 9px 10px;
      border-color: transparent transparent transparent #236EF9;
    }

    &::after {
      top: 12px;
      left: 6px;
      border-width: 6px 0 6px 8px;
      border-color: transparent transparent transparent #07EDFD;
    }
  }
}

.thead {
  display: flex;
  margin-top: 8px;
  padding: 0 6px;
}

.tbody {
  padding: 4px 6px;
  max-height: 180px;
  overflow-y: auto;

  @include scroll;
}

.row {
  display: flex;
  margin: 8px 0;
}

.col {
  display: flex;
  align-items: center;
  padding: 0 8px;
  flex: 1;
  font-size: 12px;
  line-height: 20px;
  white-space: nowrap;
}

.unit {
  margin-left: 8px;
}

.output {
  display: inline-block;
  width: 80px;
  height: 20px;
  padding: 0 8px;
  line-height: 18px;
  text-align: center;
  border: 1px solid #C2C7CC;
  background-color: #EFF7FF;
}
</style>
