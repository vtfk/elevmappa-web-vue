import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import View from './views/View.vue'
import Help from './views/Help.vue'
import Settings from './views/Settings.vue'
import OidcCallback from './views/OidcCallback.vue'
import OidcCallbackError from './views/OidcCallbackError.vue'
import pageNotFound from './views/404.vue'
import { vuexOidcCreateRouterMiddleware } from 'vuex-oidc'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/view/:id',
      name: 'view',
      component: View
    },
    {
      path: '/help',
      name: 'help',
      component: Help,
      meta: {
        isPublic: true
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/oidc-callback', // Needs to match redirect_uri in you oidcSettings
      name: 'oidcCallback',
      component: OidcCallback
    },
    {
      path: '/oidc-callback-error', // Needs to match redirect_uri in you oidcSettings
      name: 'oidcCallbackError',
      component: OidcCallbackError,
      meta: {
        isPublic: true
      }
    },
    {
      path: '*',
      name: 'pageNotFound',
      component: pageNotFound,
      meta: {
        isPublic: true
      }
    }
  ]
})

router.beforeEach(vuexOidcCreateRouterMiddleware(store, 'oidcStore'))

export default router
