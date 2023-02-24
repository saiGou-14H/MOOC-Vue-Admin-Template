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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const teacherRoutes = [
  {
    path: '/course',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Course',
        component: () => import('@/views/Course/index'),
        meta: { title: '课程管理', icon: 'el-icon-reading' }
      }
    ]
  },
  {
    path: '/classdetail',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/Classdetail/index'),
        hidden: true,
        meta: { title: '班级详情', icon: 'el-icon-user-solid' }
      }
    ]
  },
  {
    path: '/coursedetail',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/Coursedetail/index'),
        hidden: true,
        meta: { title: '课程详情', icon: 'el-icon-user-solid' }
      }
    ]
  },
  {
    path: '/chapter',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/Chapter/index'),
        hidden: true,
        meta: { title: '章节详情' }
      }
    ]
  },

  {
    path: '/practice',
    name: '实践管理',
    component: Layout,
    meta: { title: '实践管理', icon: 'el-icon-chat-dot-square' },
    children: [
      {
        path: 'PublishingPractices',
        component: () => import('@/views/Practice/Practicedetail/index'),
        meta: { title: '发布实践', icon: 'el-icon-chat-dot-square' }
      },
      {
        path: 'practices',
        component: () => import('@/views/Practice/Practicedetail/practices'),
        meta: { title: '实践中心', icon: 'el-icon-chat-dot-square' }
      }
    ]
  },
  {
    path: '/consulting',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Consulting',
        component: () => import('@/views/Consulting/index'),
        meta: { title: '资讯管理', icon: 'el-icon-chat-dot-square' }
      }
    ]
  },
  {
    path: '/answer_question',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Answer_Question',
        component: () => import('@/views/Answer_Question/index'),
        meta: { title: '课程提问', icon: 'el-icon-question' }
      }
    ]
  },
  {
    path: '/QuestionDetial',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/QuestionDetial/index'),
        hidden: true,
        meta: { title: '问题详情', icon: 'el-icon-user-solid' }
      }
    ]
  }
]
export const adminRoutes = [
  {
    path: '/Audit',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Audit',
        component: () => import('@/views/Audit/index'),
        meta: { title: '审核', icon: 'el-icon-monitor' }
      }
    ]
  }]
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
    redirect: '/class/index',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }
    ]
  },
  {
    path: '/class',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Class',
        component: () => import('@/views/Class/index'),
        meta: { title: '班級管理', icon: 'el-icon-user-solid' }
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
