import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/home.vue")
    },
    {
      path: "/tasks/new",
      name: "Add task",
      component: () => import("@/views/new-task.vue")
    },
    {
      path: "/tasks/:id",
      name: "Task",
      component: () => import("@/views/task.vue")
    },
    {
      path: "*",
      name: "404",
      component: () => import("@/views/not-found.vue")
    }
  ]
});

export default router;
