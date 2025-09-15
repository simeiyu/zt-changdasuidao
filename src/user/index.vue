<template>
  <div class="user">
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.user {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff url('~/assets/images/bg.png') no-repeat center center / cover;
}
</style>