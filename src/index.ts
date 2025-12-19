import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import { router } from "./router";
import { checkAuthed } from "./utils/auth/store";

await checkAuthed();

createApp(App).use(router).mount("#app");
