import Vue from 'vue'
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routerOptions = [
  { path: '/', component: 'Login' },
  { path: '/series', component: 'Series' },
  { path: '/yaml-List', component: 'YamlList' },
  { path: '/yaml-details', component: 'YamlDetail' },
  { path: '/add-yaml', component: 'AddYaml' },
  { path: '/add-step', component: 'AddStep' }
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

Vue.use(Router)

export default new Router({
  routes
  // mode: 'history'
})
