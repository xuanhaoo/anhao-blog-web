import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '控制面板', icon: 'home' }
    }]
  },

  {
    path: '/person',
    component: Layout,
    redirect: '/person/info',
    name: 'Person',
    meta: { title: '个人中心', icon: 'person' },
    children: [
      {
        path: 'info',
        name: 'Info',
        component: () => import('@/views/person/updateOwn'),
        meta: { title: '个人信息', icon: 'person' }

      },
      {
        path: 'modifyPs',
        name: 'ModifyPs',
        component: () => import('@/views/person/modifyPs'),
        meta: { title: '修改密码', icon: 'password' }

      }
    ]
  },

  {
    path: '/users',
    component: Layout,
    redirect: '/users/index',
    name: 'Example',
    meta: { title: '用户管理', icon: 'groups' },
    children: [
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/users/index'),
        meta: { title: '用户管理', icon: 'groups' }
      }
    
    ]
  },
  {
    path: '/typeAndTags',
    component: Layout,
    // redirect: '/typeAndTags/index',
    // name: 'typeAndTags',
    // meta: { title: '标签&类别', icon: 'example' },
    children: [
      {
        path: 'type_tags',
        name: 'TypeAndTags',
        component: () => import('@/views/typeAndTags/type_tags'),
        meta: { title: '类别&标签', icon: 'tags' }
      }
      // {
      //   path: 'tags',
      //   name: 'Tags',
      //   component: () => import('@/views/typeAndTags/tags'),
      //   meta: { title: '标签', icon: 'table' }
      // }
    ]
  },

  {
    path: '/article',
    component: Layout,
    children: [
      {
        path: 'pubArt',
        name: 'PubArticle', 
        component: () => import('@/views/article/pubArt'),
        meta: { title: '发布文章', icon: 'form' }
      }
    ]
  },

  {
    path: '/article',
    component: Layout,
    name: 'blog',
    meta: { title: '博客管理', icon: 'article' },
    children: [
      {
          path: 'articleList',
          name: 'ArticleList',
          component: () => import('@/views/article/articleList'),
          meta: {title: '文章列表', icon: 'article'}
      },
      {
          path: 'commentList',
          name: 'CommentList',
          component: () => import('@/views/article/commentList'),
          meta: {title: '评论列表', icon: 'comment'}
      }
    ]
  },
  {
    path:'/linkAbout',
    component: Layout,
    name: 'LinkAbout',
    meta: {title: '友链 | 关于', icon: 'linksAndAbout'},
    children: [
      {
        path: 'links',
        name: 'Links',
        component: () => import('@/views/linksAndAbout/links'),
        meta: {title: '友链', icon: 'links'}
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/linksAndAbout/about'),
        meta: {title: '关于', icon: 'about'}
      }
    ]
  },
  

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

