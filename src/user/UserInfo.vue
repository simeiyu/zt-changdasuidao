<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import { useUserStore } from '~/store/user';

const userStore = useUserStore()

const resetPassword = ref(false)

const userForm = ref<FormInstance>()
const passwordForm = ref<FormInstance>()

const userInfo = reactive({
  username: '',
  fullname: ''
})

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 15, message: '用户名长度在 3 到 15 个字符', trigger: 'blur' }
  ],
  fullname: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 3, max: 15, message: '用户名长度在 3 到 15 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' }
  ]
})

const handleResetPassword = () => {
  // resetPassword.value = true
}

const handleSaveUerInfo = () => {
  // userStore.updateUserInfo()
}
</script>

<template>
  <div class="wrapper">
    <div class="title">{{ resetPassword ? '修改密码' : '个人信息'}}</div>
    <div class="content">
      <el-form :model="userInfo" label-width="100px" label-suffix=":" :rules="rules" ref="userForm" v-if="!resetPassword">
        <el-form-item label="用户名" prop="username">
          <el-col :span="16">
            <el-input v-model="userInfo.username" />
          </el-col>
        </el-form-item>
        <el-form-item label="姓名" prop="fullname">
          <el-col :span="16">
            <el-input v-model="userInfo.fullname" />
          </el-col>
        </el-form-item>
        <el-form-item label="操作权限">
          <el-text>{{ userStore.roles }}</el-text>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <el-button type="primary" v-if="resetPassword" @click="handleResetPassword">提交</el-button>
      <el-button type="primary" v-else @click="handleSaveUerInfo">保存</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  margin-bottom: 10%;
  width: 618px;
  background-color: #fff;

  .title {
     height: 52px;
     padding: 12px 16px;
     font-size: 16px;
     color: var(--el-text-color-primary);
     background-color: #F4F6F9;
  }

  .content {
    padding: 32px 16px 14px;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    padding: 12px 24px;
    border-top: 1px solid var(--el-border-color);
  }
}
</style>
