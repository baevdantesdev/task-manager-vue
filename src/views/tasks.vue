<template lang="pug">
  div.tasks
    h1 Tasks
    button.button(v-on:click="addTask") Add task
    div.row
      div.col-12.col-md-4(v-for="(task, index) in tasks", :key="index")
        task-item(:task="task" @goToTask="goToTask($event)")
</template>

<script>
import { mapState } from "vuex";
import TaskItem from "@/components/task-item";

export default {
  name: "tasks",
  components: { TaskItem },
  computed: mapState({
    tasks: state => state.tasks
  }),
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
