import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '管理员首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/userset',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '用户信息设置', icon: 'example' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/pages/userset/UserManage'),
        meta: { title: '个人信息管理', icon: 'table' }
      },
      {
        path: 'kehu',
        name: 'Kehu',
        component: () => import('@/pages/userset/KehuManage'),
        meta: { title: '客户信息管理', icon: 'table'}
      }     
    ]
  },
  {
    path: '/songset',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '客户收藏设置', icon: 'example' },
    children: [
      {
        path: 'song',
        name: 'Song',
        component: () => import('@/pages/songset/SongManage'),
        meta: { title: '歌曲信息管理', icon: 'table' }
      },
      {
        path: 'collectiom',
        name: 'Collectiom',
        component: () => import('@/pages/songset/CollectManage'),
        meta: { title: '收藏信息管理', icon: 'table'}
      }     
    ]
  },
  {
    path: '/singerset',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '歌手演唱设置', icon: 'example' },
    children: [
      {
        path: 'singer',
        name: 'Singer',
        component: () => import('@/pages/singerset/SingerManage'),
        meta: { title: '歌手信息管理', icon: 'table' }
      },
      {
        path: 'linkman',
        name: 'Linkman',
        component: () => import('@/pages/singerset/LinkManage'),
        meta: { title: '演唱信息管理', icon: 'table'}
      }     
    ]
  },
  {
    path: '/albumset',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '专辑发行设置', icon: 'example' },
    children: [
      {
        path: 'album',
        name: 'Album',
        component: () => import('@/pages/albumset/AlbumManage'),
        meta: { title: '专辑信息管理', icon: 'table' }
      },
      {
        path: 'create',
        name: 'Create',
        component: () => import('@/pages/albumset/CreateManage'),
        meta: { title: '发行信息管理', icon: 'table'}
      }     
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
