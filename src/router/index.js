import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import NewPost from '@/components/NewPost'
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
      path: '/new-post',
      name: 'new-post',
      component: NewPost,
    },
    {
      path: '*',
      name: 'not-found',
      component: notFound,
    },
  ],
})
