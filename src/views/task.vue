<template lang="pug">
  div.task
    h1 {{ task.title }}
    div.row
      div.col-12.col-lg-5
        form.task__form
          input.task__field(v-model="form.title", placeholder="Title")
          textarea.task__field.task__field-textarea(rows="4", v-model="form.description", placeholder="Description")
          select.task__field(v-model="form.status")
            option(v-for="(status, index) in statuses", :key="index", :value="status") {{ status.title }}
          input.task__field(v-model="form.created_date", type="date")
</template>

<script>
import { mapState } from "vuex";
import { statuses } from "@/statuses";

export default {
  name: "task",
  data: () => {
    return {
      statuses,
      form: {
        title: null,
        description: null,
        created_date: new Date().toDateString(),
        status: statuses.find(status => status.id === 1)
      }
    };
  },
  mounted() {
    if (this.task) {
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
