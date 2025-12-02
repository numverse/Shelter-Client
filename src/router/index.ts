import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Auth from "../pages/Auth.vue";

const routes = [
  { path: "/", component: Auth },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
