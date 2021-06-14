import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'




Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(Vuex)
Vue.config.productionTip = false
const store = new Vuex.Store({
  state: {
    count: 0,
    active: '1' // 管理后台左侧导航
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')
