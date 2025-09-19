<script setup lang="ts">
import { ElMessage, type FormInstance } from 'element-plus';
import { useUserStore } from '~/store/user';

const userStore = useUserStore()
const router = useRouter()

const resetPassword = ref(false)

const userForm = ref<FormInstance>()
const passwordForm = ref<FormInstance>()

const userInfo = reactive({
  username: '',
  fullname: ''
})
const passForm = reactive({
  password: '',
  newPassword: '',
  newPasswordConfirm: ''
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

const validateNewPass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入新密码'))
  } else {
    if (passForm.newPasswordConfirm !== '') {
      if (!passwordForm.value) return
      passwordForm.value.validateField('newPasswordConfirm')
    }
    callback()
  }
}
const validateNewPass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请确认新密码'))
  } else if (value !== passForm.newPassword) {
    callback(new Error("两次输入不匹配!"))
  } else {
    callback()
  }
}

const passRules = reactive({
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' },
    { validator: validateNewPass, trigger: 'blur' }
  ],
  newPasswordConfirm: [
    { required: true, message: '请输入确认新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' },
    { validator: validateNewPass2, trigger: 'blur' }
  ]
})

const handleResetPassword = async (pwElem: FormInstance | undefined) => {
  if (!pwElem) return
  try {
    const validated = await pwElem.validate()
    if (validated) {
      await userStore.changePassword(passForm.password, passForm.newPassword)
      ElMessage.success('密码修改成功')
      resetPassword.value = false
    }
  } catch (error) {
    console.log(error)
  }
}

const handleSaveUerInfo = async (elem: FormInstance | undefined) => {
  if (!elem) return
  try {
    const validated = await elem.validate()
    if (validated) {
      await userStore.changeUserInfo(userInfo)
      ElMessage.success('密码修改成功')
      resetPassword.value = false
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="title">{{ resetPassword ? '修改密码' : '个人信息'}}</div>
    <div class="content">
      <el-form :model="userInfo" label-width="120px" label-suffix=":" :rules="rules" ref="userForm" v-if="!resetPassword">
        <el-form-item label="用户名" prop="username">
          <el-col :span="18">
            <el-input v-model="userInfo.username" />
          </el-col>
          <el-col :span="4">
            <el-button class="mg-l-lg" type="primary" link @click="resetPassword = true">修改密码</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="姓名" prop="fullname">
          <el-col :span="18">
            <el-input v-model="userInfo.fullname" />
          </el-col>
        </el-form-item>
        <el-form-item label="操作权限">
          <el-text>{{ userStore.roles }}</el-text>
        </el-form-item>
      </el-form>
      <el-form v-else :model="passForm" label-width="120px" label-suffix=":" :rules="passRules" ref="passwordForm" style="width: 90%;">
        <el-form-item label="用户名">
          <el-input v-model="userInfo.username" disabled />
        </el-form-item>
        <el-form-item label="原密码" prop="password">
          <el-input v-model="passForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passForm.newPassword" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认新密码" prop="newPasswordConfirm">
          <el-input v-model="passForm.newPasswordConfirm" autocomplete="off" />
        </el-form-item>
      </el-form>
    </div>
    <div class="footer" v-if="resetPassword"> 
      <el-button class="mg-l-lg" type="default" @click="resetPassword = false">取消</el-button>
      <el-button type="primary" v-if="resetPassword" @click="handleResetPassword(passwordForm)">提交</el-button>
    </div>
    <div class="footer" v-else>
      <el-button type="default" @click="router.go(-1)">返回</el-button>
      <el-button type="primary" @click="handleSaveUerInfo">保存</el-button>
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
