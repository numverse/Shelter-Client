import { createApp } from "vue";
import App from "./App.vue";
import "./assets/index.css";
import { router } from "./router/index";
import { isAuthed } from "./utils/auth/store";

router.beforeEach((to, from, next) => {
  if (to.path !== "/login" && !isAuthed) {
    next("/login");
  } else {
    next();
  }
});

createApp(App).use(router).mount("#app");
