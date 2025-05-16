import { createRouter, createWebHistory } from 'vue-router'
import Init from '@/views/InitView.vue'
import Home1View from '@/views/Home1View.vue'
import Home2View from '@/views/Home2View.vue'
import Home3View from '@/views/Home3View.vue'
import Home4View from '@/views/Home4View.vue'

const routes = [
  {
    path: '/',
    name: 'Init',
    component: Init
  },{
    path: '/Home1View',
    name: 'Home1View',
    component: Home1View
  },{
    path: '/Home2View',
    name: 'Home2View',
    component: Home2View
  },{
    path: '/Home3View',
    name: 'Home3View',
    component: Home3View
  },{
    path: '/Home4View',
    name: 'Home4View',
    component: Home4View
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
