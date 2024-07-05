import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/components/MainPage.vue";
import LogList from "@/components/LogList.vue";
import LogDetails from "@/components/LogDetails.vue";

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
  },
  {
    path: "/log",
    name: "LogList",
    component: LogList,
  },
  {
    path: "/log/:seq",
    name: "LogDetails",
    component: LogDetails,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
