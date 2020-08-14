import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const Home = ()=> import('../views/home/Home.vue')
const Profile = ()=> import('views/profile/Profile.vue')
const ShopCart = ()=> import('views/shopCart/ShopCart.vue')
const Category = () => import('views/category/Category.vue')

const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    component:Home
  },
  {
    path: '/profile',
    component:Profile
  },
  {
    path: '/category',
    component:Category
  },
  {
    path: '/shopcart',
    component:ShopCart
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})
export default router