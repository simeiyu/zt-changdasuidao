<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import { useUserStore } from '~/store/user';

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const formRef = ref<FormInstance>()
const state = reactive({
  username: '',
  password: '',
  invalidateCode: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 8, message: '长度在 3 到 5 个字符', trigger: 'blur' }
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  invalidateCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
}

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  try {
    // const validated = await formEl.validate()
    // const logined = userStore.login(state)
    const redirect = (route.query.redirect as string) || '/'
    router.push(redirect)
  } catch (error) {
    console.log(error)
  }
    
}
</script>

<template>
  <div class="login-container">
    <div class="login-title">欢迎登录</div>
    <el-form ref="formRef" :model="state" :rules="rules" label-width="88px" size="large" label-suffix=":" style="width: 92%;">
      <el-form-item label="用户名" prop="username">
        <el-input size="large" v-model="state.username" placeholder="请输入用户名">
          <template #prefix>
            <el-icon class="el-input__icon"><i-ep-user /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-col :span="18">
          <el-input v-model="state.password" placeholder="请输入密码" type="password" autocomplete="off">
            <template #prefix>
              <el-icon class="el-input__icon"><i-ep-lock /></el-icon>
            </template>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="text">忘记密码</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="验证码" prop="invalidateCode">
        <el-col :span="18">
        <el-input v-model="state.invalidateCode" placeholder="请输入验证码" type="text"></el-input>
        </el-col>
        <el-col :span="6" class="flex flex-end align-center">
          <span>9225</span>
        </el-col>
      </el-form-item>
      <el-form-item style="margin-top: 40px;">
        <el-button type="primary" size="large" class="login-button" @click="onSubmit(formRef)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-container {
    margin-bottom: 10%;
    margin-left: 40%;
    width: 540px;
    padding: 52px 48px 60px;
    border-radius: 16px;
    background: rgba($color: #fff, $alpha: 80%);
  }

  &-title {
    margin-bottom: 40px;
    font-size: 36px;
    font-weight: 400;
    color: #1C2126;
    text-align: center;
  }

  &-button {
    width: 100%;
    height: 48px;
    font-size: 18px;
  }
}

:deep(.el-form-item__label) {
  font-size: 18px;
  font-weight: 400;
  color: #1C2126;
}
</style>