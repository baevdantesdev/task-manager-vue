<template lang="pug">
  div.task
    h1 Add new task
    div.row
      div.col-12.col-lg-5
        form.task__form(@submit.prevent="addTask", ref="form")
          input.task__field(v-model="form.title", placeholder="Title", required)
          textarea.task__field.task__field-textarea(rows="8", v-model="form.description", required,
            placeholder="Description")
          button.button(type="submit") Add
</template>

<script>
import { statuses } from "@/statuses";
import store from "@/store";
import { getStatusForRequest } from "@/utils";
import moment from "moment";

export default {
  name: "new-task",
  data: () => {
    return {
      statuses,
      form: {
        title: null,
        description: null,
        id: null,
        created_date: moment(new Date()).format("YYYY-MM-DD"),
        status: statuses.find(status => status.id === 1)
      }
    };
  },
  methods: {
    addTask() {
      store
        .dispatch("addTask", {
          ...this.form,
          status: getStatusForRequest(this.form.status.id)
        })
        .then(res => {
          this.form.id = res.data.id;
          this.$router.push("/tasks/" + res.data.id);
        });
    }
  }
};
</script>
