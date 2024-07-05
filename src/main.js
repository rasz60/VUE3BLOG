import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // 추가
import vuetify from "./plugins/vuetify";

let app = createApp(App);

app
  .use(router) // 추가
  .use(vuetify)
  .mount("#app");
