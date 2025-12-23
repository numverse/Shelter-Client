import { createRouter, createWebHistory } from "vue-router";
import ChatPage from "./pages/ChatPage.vue";
import AuthPage from "./pages/AuthPage.vue";
// import { isAuthed } from "./utils/auth/store";
import VerifyPage from "./pages/VerifyPage.vue";

const routes = [
  {
    path: "/",
    redirect: "/chat",
  },
  {
    path: "/chat",
    component: ChatPage,
  },
  {
    path: "/auth",
    component: AuthPage,
  },
  {
    path: "/verify",
    component: VerifyPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.matched.length === 0) return;
  // if (to.path !== "/auth" && !isAuthed) {
  //   return "/auth";
  // }
});

export { router };
