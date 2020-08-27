import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import store from './store';
//导入toast插件
import toast from 'components/common/toast';

import FastClick from 'fastclick';
//导入安装swiper插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

//安装toast插件
Vue.use(toast)

//添加事件总线
Vue.prototype.$bus = new Vue()

//解决移动端300ms延迟
FastClick.attach(document.body)

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
