import Toast from './Toast.vue';
const obj = {}

obj.install = function (Vue) {
  //1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  //根据组件构造器，创建组件对象
  const toast = new toastContrustor()
  //将组件对象，手动的挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  //将组件对象挂载的元素添加到body中
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast=toast
 }

export default obj