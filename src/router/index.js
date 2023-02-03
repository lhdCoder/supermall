import Vue from 'vue'
import VueRouter from 'vue-router'
const Home =() => import('@/views/home/Home.vue')
const Category =() => import('@/views/category/Category.vue')
const Cat =() => import('@/views/cat/Cat.vue')
const Profile =() => import('@/views/profile/Profile.vue')
const Detail =() => import('@/views/detail/Detail.vue')
//安装插件
Vue.use(VueRouter)
//创建router
const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/cat',
    component:Cat
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/detail/:iid',
    component:Detail
  },

]
const router = new VueRouter({
  routes,
  model:history,

})

export default router