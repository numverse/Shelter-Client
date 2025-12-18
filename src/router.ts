import { createRouter, createWebHistory } from "vue-router";
import ChatPage from "./pages/ChatPage.vue";
import AuthPage from "./pages/AuthPage.vue";
import { isAuthed } from "./utils/auth/store";

const routes = [
  {
    path: "/",
    component: ChatPage,
  },
  {
    path: "/auth",
    component: AuthPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.path !== "/auth" && !isAuthed) {
    return "/auth";
  }
});

export { router };
