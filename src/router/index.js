/**
 * router/index.ts
 *
 * Automatic routes for `./src/views/*.vue`
 */

import {createWebHistory, createRouter} from 'vue-router'

import AuthView from "@/views/AuthView.vue";
import ShopView from "@/views/ShopView.vue";
import AdminView from "@/views/AdminView.vue";
import BasketView from "@/views/BasketView.vue";
import DeviceView from "@/views/DeviceView.vue";

import {useUserStore} from "@/stores/UserStore.js";


const routes = [
  {name: 'admin', path: '/admin', component: AdminView, meta: {requiresAuth: true}},
  {name: 'basket', path: '/basket', component: BasketView, meta: {requiresAuth: true}},

  {name: 'home', path: '/', component: ShopView},
  {name: 'login', path: '/login', component: AuthView},
  {name: 'registration', path: '/registration', component: AuthView},
  {name: 'deviceId', path: '/device/:id', component: DeviceView},
  {name: 'not-found', path: '/:path(.*)', component: ShopView},
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

// Навигационный охранник
router.beforeEach((to, from, next) => {

  const user = useUserStore()

  if (to.matched.some(record => record.meta.requiresAuth) && !user.isAuth) {
    next({name: 'login'});
  } else {
    // Иначе продолжаем навигацию
    next();
  }
});


export default router;
