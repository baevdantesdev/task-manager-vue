<template lang="pug">
  div.tasks
    h1 Tasks
    button.button(v-on:click="addTask") Add task
    p(v-if="!tasks.length") No tasks
    div.row
      div.col-12.col-md-4(v-for="(task, index) in tasks", :key="index")
        task-item(:task="task" @goToTask="goToTask($event)")
</template>

<script>
import { mapState } from "vuex";
import TaskItem from "@/components/task-item";
import store from "@/store";

export default {
  name: "home",
  components: { TaskItem },
  computed: mapState({
    tasks: state => state.tasks
  }),
  beforeRouteEnter: (to, from, next) => {
    store.dispatch("getTasks").then(() => {
      next();
    });
  },
  methods: {
    addTask() {
      this.$router.push("tasks/new");
    },
    goToTask(id) {
      this.$router.push("/tasks/" + id);
    }
  }
};
</script>
