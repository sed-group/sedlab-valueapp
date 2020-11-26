import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/components/Index'),
      children: [
        {
          name: 'Project',
          path: '/project',
          component: () => import('@/components/Project'),
        },
        {
          name: 'Architectures',
          path: '/architectures',
          component: () => import('@/components/Architectures'),
        },
        {
          name: 'Stakeholders',
          path: '/stakeholders',
          component: () => import('@/components/Stakeholders'),
        },
        {
          name: 'Needs',
          path: '/needs',
          component: () => import('@/components/Needs'),
        },
        {
          name: 'ValueCreationStrategies',
          path: '/vcs',
          component: () => import('@/components/ValueCreationStrategies'),
        },
        {
          name: 'Analysis',
          path: '/analysis',
          component: () => import('@/components/Analysis'),
        },
      ],
    },
  ],
})
