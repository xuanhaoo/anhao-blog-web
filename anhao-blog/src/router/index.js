import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/view/Home'

Vue.use(Router)

const router = new Router({
  // base: 'front',  //基础路径
  //mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/blog'
    },
    {
    	path: '',
    	name: 'Home',
    	component: Home,
    	children: [
    		{
    			path: '/blog',
		    	name: 'Blog',
		    	component: () => import('@/view/blog_index')
		    	// component: r => require.ensure([], () => r(require('@/view/blog_index')), 'index')
    		},
        {
          path: '/article/:id',
          name: 'Article',
          component: () => import('@/components/Article/articleInfoItem')
          // props: { default: true, sidebar: false }
        },
        {
          path: '/archiving',
          name: 'Archiving',
          component: () => import('@/view/archiving')
        },
        {
          path: '/links',
          name: 'Links',
          component: () => import('@/view/friend_link')
        },
        {
          path: '/about',
          name: '/About',
          component: () => import('@/view/about')
        },
        {
          path: '/resume',
          name: 'Name',
          component: () => import('@/view/resume')
        }
    	]
    }
  ],

})




export default router
