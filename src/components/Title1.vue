<template>
  <div class="title1">
    <SvgIcon class="title1-icon" icon-name="title1" />
    <span class="title1-text"><slot></slot></span>
  </div>
</template>

<style lang="scss" scoped>
.title1 {
  position: relative;
  height: 28px;
  padding: 4px 10px;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(105deg, transparent, transparent 8px, rgb(0 132 255) 8px, rgb(216 216 216 / 12%) 100%);
    opacity: .3;
  }
  
  &-icon {
    margin-right: 8px;
    font-size: 15px;
  }

  &-text {
    font-size: var(--el-font-size-base);
    line-height: 1.5;
  }
}
</style>