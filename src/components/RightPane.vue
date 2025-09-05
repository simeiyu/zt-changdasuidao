<template>
  <div class="right">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.right {
  margin-left: 16px;
  width: 360px;
  height: 100%;
  padding: 8px 12px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 2px 6px 0 rgb(0 29 77 / 10%);
}
</style>