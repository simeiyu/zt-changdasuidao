import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
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
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})