<template lang="pug">
  div.task
    h1(v-if="!isNewTask") {{ task.title }}
    h1(v-else) Add task
    div.row
      div.col-12.col-lg-5
        form.task__form(@submit.prevent="submit")
          input.task__field(v-model="form.title", placeholder="Title", required)
          textarea.task__field.task__field-textarea(rows="4", v-model="form.description", required,
            placeholder="Description")
          select.task__field(v-model="form.status", v-if="!isNewTask")
            option(v-for="(status, index) in statuses", :key="index", :value="status") {{ status.title }}
          input.task__field(v-model="form.created_date", required, v-if="!isNewTask", type="date")
          button.button(v-if="isNewTask") Add
          div.flex(v-else)
            button.button.mr-2 Save
            button.button Delete
</template>

<script>
import { mapState } from "vuex";
import { statuses } from "@/statuses";

export default {
  name: "task",
  data: () => {
    return {
      statuses,
      isNewTask: true,
      form: {
        title: null,
        description: null,
        created_date: new Date().toDateString(),
        status: statuses.find(status => status.id === 1)
      }
    };
  },
  methods: {
    submit() {
      //
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.isNewTask = false;
    }
    if (this.task && !this.isNewTask) {
      this.form = {
        ...this.task,
        created_date: this.task.created_date,
        status: statuses.find(status => status.id === this.task.status)
      };
    }
  },
  computed: mapState({
    task: state => state.currentTask
  })
};
</script>

<style lang="sass" scoped>
.task__form
  width: 100%

.task__field
  width: 100%
  display: block
  height: 40px

.task__field-textarea
  resize: none
  height: auto

.task__field:not(:last-child)
  margin-bottom: 15px
</style>
