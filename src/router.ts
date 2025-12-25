import { createRouter, createWebHistory } from "vue-router";
import ChatPage from "./pages/ChatPage.vue";
import AuthPage from "./pages/AuthPage.vue";
import VerifyPage from "./pages/VerifyPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";
import { isAuthed } from "./client/auth";

const routes = [
  {
    path: "/",
    redirect: "/auth",
  },
  {
    path: "/channels/:channelId?",
    component: ChatPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/auth",
    component: AuthPage,
  },
  {
    path: "/verify",
    component: VerifyPage,
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach(async (to) => {
  if (to.matched.length === 0) return;
  const needsAuth = to.matched.some((r) => (r.meta).requiresAuth);
  if (!needsAuth || isAuthed) return;
});

export { router };
