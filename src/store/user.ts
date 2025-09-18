import { defineStore } from "pinia";

interface UserInfo {
  username?: string; // 用户名
  password?: string; // 密码
}

// 用户状态管理
export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '' as string,
    userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}') as UserInfo,
    roles: [] as string[]
  }),
  actions: {
    // 登录
    async login(userInfo: UserInfo) {
      // 这里应该是实际的登录API调用
      // 模拟登录成功
      const { username, password } = userInfo
      if (username === 'admin' && password === '123456') {
        this.token = 'admin-token'
        this.userInfo = { username: 'admin' }
        this.roles = ['admin']
        localStorage.setItem('token', this.token)
        localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
        return true
      } else if (username === 'user' && password === '123456') {
        this.token = 'user-token'
        this.userInfo = { username: 'user' }
        this.roles = ['user']
        localStorage.setItem('token', this.token)
        localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
        return true
      }
      return false
    },
    
    // 登出
    logout() {
      this.token = ''
      this.userInfo = {}
      this.roles = []
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
    },
    
    // 获取用户信息
    async getUserInfo() {
      // 这里应该是实际的获取用户信息API调用
      // 模拟获取用户信息
      if (this.token === 'admin-token') {
        this.roles = ['admin']
      } else if (this.token === 'user-token') {
        this.roles = ['user']
      }
      return { roles: this.roles }
    }
  }
})

