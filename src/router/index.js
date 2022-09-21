import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import notFound from '@/views/notFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'posts-list',
      component: Home,
    },
    {
      path: '*',
      name: 'not-found',
      component: notFound,
    },
  ],
})
