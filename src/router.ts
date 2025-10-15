import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from './store/user'

const routes = [
  {
    path: '/',
    component: () => import('./views/index.vue'),
    children: [
      {
        name: '设备概览',
        path: '/',
        icon: 'overview',
        component: () => import('./views/Overview.vue')
      },
      {
        name: '泥水环流',
        path: '/nishui',
        icon: 'nishui',
        component: () => import('./views/nishui/index.vue')
      },
      {
        name: '盾尾密封',
        path: '/dunwei',
        icon: 'dunwei',
        component: () => import('./views/dunwei/index.vue')
      },
      {
        name: '推进系统',
        path: '/tuijin',
        icon: 'tuijin',
        component: () => import('./views/tuijin/index.vue')
      },
      {
        name: '刀盘系统',
        path: '/daopan',
        icon: 'daopan',
        component: () => import('./views/daopan/index.vue')
      },
      {
        name: '驱动电机',
        path: '/qudong',
        icon: 'qudong',
        component: () => import('./views/qudong/index.vue')
      },
      {
        name: '数据查询',
        path: '/shujv',
        icon: 'shujv',
        component: () => import('./views/shujv/index.vue')
      }, {
        path: '/admin',
        name: '用户管理',
        icon: 'admin',
        component: () => import('./views/management/index.vue'),
      }
    ]
  }, {
    path: '/user',
    component: () => import('./user/index.vue'),
    children: [{
      path: '/login',
      component: () => import('./user/Login.vue'),
    }, {
      path: '/userInfo',
      component: () => import('./user/UserInfo.vue'),
    }]
  }, {
    path: '/:pathMatch(.*)*',
    component: () => import('./views/NotFound.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
// 白名单，不需要登录就可以访问
// const whiteList = ['/login', '/403']

// router.beforeEach(async (to, from, next) => {
//   const userStore = useUserStore()
//   const hasToken = userStore.token
  
//   if (hasToken) {
//     if (to.path === '/login') {
//       // 如果已登录，重定向到首页
//       next({ path: '/' })
//     } else {
//       try {
//         // 判断用户信息是否已获取
//         if (userStore.roles.length === 0) {
//           // 获取用户信息
//           const { roles } = await userStore.getUserInfo()          
//           // 确保路由已添加完成
//           next({ ...to, replace: true })
//         } else {
//           next()
//         }
//       } catch (error) {
//         // 出错则重置token并重定向到登录页
//         await userStore.logout()
//         next(`/login?redirect=${to.path}`)
//       }
//     }
//   } else {
//     if (whiteList.includes(to.path)) {
//       // 在免登录白名单中，直接进入
//       next()
//     } else {
//       // 其他没有访问权限的页面被重定向到登录页面
//       next(`/login?redirect=${to.path}`)
//     }
//   }
// })

export default router