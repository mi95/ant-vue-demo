import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const bassisRouter = () => new Router({
  routes: [{
    path: '/login',
    name: '登录页',
    component: () => import('@/pages/login/Login'),
    invisible: true
  }]
})
const router = bassisRouter()


const generator = (routerMap, parent) => {
  if (routerMap && parent) {
    routerMap.map(item => {
      const children = {
        path: item.path,
        name: item.name,
        meta: { title: item.name, icon: item.icon, btns: item.btns },
        children: []
      }
      if (item.component) {
        children.component = () => import(`@/${item.component}`)
      }
      if (item.children && item.children.length > 0) {
        generator(item.children, children)
      }
      parent.children.push(children)
    })
  }
}

router.beforeEach((to, from, next) => {
  var auths = store.state.user.auths
  if (auths && auths != null && auths.length > 0 && to.path !== '/' && to.path !== '/login') {
    const routerRoot = [{
      path: '/',
      name: '首页',
      component: () => import('@/layouts/MenuView'),
      redirect: '/login',
      // icon: 'none',
      invisible: true,
      children: []
    }]
    generator(auths, routerRoot[0])
    router.addRoutes(routerRoot)
    store.dispatch('LoadMenu')
    // eslint-disable-next-line no-undef
    const redirect = decodeURIComponent(from.query.redirect || to.path)
    if (to.path === redirect) {
      // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
      next({ ...to, replace: true })
      // next()
    } else {
      // 跳转到目的路由
      next({ path: redirect })
    }
  } else if (to.path === '/login' || to.path === '/') {
    const newRouter = bassisRouter()
    router.matcher = newRouter.matcher // the relevant part
    next()
  } else {
    next()
  }
})

export default router
