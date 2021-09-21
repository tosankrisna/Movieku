import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'
import Pages from '../views/Pages.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/detail/:movieId',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/popular',
    name: 'Popular',
    component: Pages
  },
  {
    path: '/nowplaying',
    name: 'Now_Playing',
    component: Pages
  },
  {
    path: '/toprated',
    name: 'Top_Rated',
    component: Pages
  },
  {
    path: '/upcoming',
    name: 'Upcoming',
    component: Pages
  },
  {
    path: '/similar/:movieId',
    name: 'Similar',
    component: Pages
  },
  {
    path: '/recommendations/:movieId',
    name: 'Recommendations',
    component: Pages
  },
  {
    path: '/credits/:movieId',
    name: 'Actors',
    component: Pages
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
