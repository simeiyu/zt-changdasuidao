<template>
  <div class="main">
    <div class="main-content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  position: relative;
  width: calc(100% - 382px);
  height: 100%;
  flex: 1;
  border-radius: 2px;
  border: solid 1px #DCDEE1;
  background: repeating-linear-gradient(180deg, transparent 0, transparent 63px, rgb(220 222 225 / 20%), rgb(220 222 225 / 20%) 64px);
  background-color: #fff;
  box-shadow: 0 2px 6px 0 rgb(0 29 77 / 10%);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(90deg, transparent 0, transparent 63px, rgb(220 222 225 / 20%), rgb(220 222 225 / 20%) 64px);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(90deg, transparent 0, transparent 15px, rgb(220 222 225 / 30%), rgb(220 222 225 / 30%) 16px);
  }

  &-content {
    position: relative;
    z-index: 5;
    height: 100%;
    padding: 2px;
    overflow: hidden;
    background: repeating-linear-gradient(180deg, transparent 0, transparent 15px, rgb(220 222 225 / 30%), rgb(220 222 225 / 30%) 16px);
  }
}
</style>