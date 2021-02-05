import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Tasks",
      beforeEnter: (to, from, next) => {
        store.dispatch("getTasks").then(() => {
          next();
        });
      },
      component: () => import("@/views/tasks.vue")
    },
    {
      path: "/tasks/:id",
      name: "Task",
      component: () => import("@/views/task.vue"),
      beforeEnter: (to, from, next) => {
        store.dispatch("getTaskById", to.params.id).then(() => {
          next();
        });
      }
    },
    {
      path: "/tasks/new",
      name: "Add task",
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
