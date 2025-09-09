<template>
  <div class="right">
    <div class="right-pane">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.right {
  margin-left: 16px;
  flex: 0 0 360px;
  width: 360px;
  height: 100%;
  padding: 2px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 2px 6px 0 rgb(0 29 77 / 10%);

  &-pane {
    height: 100%;
    padding: 6px 2px;
    overflow: auto;

    @include scroll;
  }
  
  :deep(.el-radio-button__inner) {
    padding-top: 6px;
    padding-bottom: 6px;
  }

  :deep(.el-select__wrapper) {
    padding-top: 2px;
    padding-bottom: 2px;
    min-height: 28px;
    line-height: 20px;
  }
}
</style>