<template>
  <div class="not-found">
    <el-empty description="没有找到页面" :image-size="200" />
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  border: solid 1px #DCDEE1;
  background-color: #fff;

  // box-shadow: 0 2px 6px 0 rgb(0 29 77 / 10%);
}
</style>