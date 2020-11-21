import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Hall from '../views/Hall.vue'
import List from '../views/List.vue'
import Proposal from '../views/proposal/Proposal.vue'
import ProposalCreate from '../views/proposal/Create.vue'
import ProposalDetail from '../views/proposal/Detail.vue'
import Nft from '../views/nft/Nft.vue'
import NftManage from '../views/nft/Manage.vue'
import NftDetail from '../views/nft/Detail.vue'
import User from '../views/User.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/proposal',
    name: 'Proposal',
    component: Proposal
  },
  {
    path: '/proposal/create',
    name: 'ProposalCreate',
    component: ProposalCreate
  },
  {
    path: '/proposal/:id',
    name: 'ProposalDetail',
    component: ProposalDetail
  },
  {
    path: '/nft',
    name: 'Nft',
    component: Nft
  },
  {
    path: '/nft/manage',
    name: 'NftManage',
    component: NftManage
  },
  {
    path: '/nft/:id',
    name: 'NftDetail',
    component: NftDetail
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
    path: '/collect',
    name: 'Collect',
    component: () => import('../views/Collect.vue')
  },
  {
    path: '/hall',
    name: 'Hall',
    component: Hall
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User
  },
  {
    path: '/',
    redirect: '/hall'
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  }
})

export default router
