import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/playground',
    name: 'Playground',
    component: () => import('../views/Playground.vue')
  },
  {
    path: '/lex',
    name: 'Lex',
    component: () => import('../views/Lex.vue')
  },
  {
    path: '/syntax',
    name: 'Syntax',
    component: () => import('../views/Syntax.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
