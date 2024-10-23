import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Blog from '../views/Blog.vue'
import Post from '../views/Post.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/post-:id',
    name: 'Post',
    component: Post,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router
