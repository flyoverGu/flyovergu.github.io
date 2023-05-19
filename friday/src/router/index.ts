import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import hotTop from '@/views/hotTop.vue';
import ocrPic from '@/views/ocrPic.vue';
import tool from '@/views/tool.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/hotTop'
  },
  {
    path: '/hotTop',
    name: '热搜',
    component: hotTop
  },
  {
    path: '/ocrPic',
    name: '图片识别',
    component: ocrPic
  },
  {
    path: '/tool',
    name: '小工具',
    component: tool
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes
})

export default router
