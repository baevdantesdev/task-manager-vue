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
            button.button(@click.prevent="deleteTask") Delete
</template>

<script>
import { mapState } from "vuex";
import { statuses } from "@/statuses";
import moment from "moment";
import store from "@/store";

export default {
  name: "task",
  data: () => {
    return {
      statuses,
      isNewTask: true,
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
    setForm() {
      this.form = {
        ...this.task,
        created_date: moment(new Date(this.task.created_date)).format(
          "YYYY-MM-DD"
        ),
        status: statuses.find(status => status.id === this.task.status)
      };
    },
    submit() {
      if (this.isNewTask) {
        this.addTask();
      } else {
        store.dispatch("updateTask", {
          ...this.form,
          status: this.getStatusForServer(),
          created_date: moment(new Date(this.form.created_date)).format(
            "YYYY-MM-DD"
          )
        });
      }
    },
    getStatusForServer() {
      return statuses.find(status => status.id === this.form.status.id).id;
    },
    addTask() {
      store
        .dispatch("addTask", {
          ...this.form,
          status: this.getStatusForServer()
        })
        .then(res => {
          this.isNewTask = false;
          this.$router.push("/tasks/" + res.data.id);
        });
    },
    deleteTask() {
      store.dispatch("deleteTask", this.task.id).then(() => {
        this.$router.push("/");
      });
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.isNewTask = false;
    }
    if (this.task && !this.isNewTask) {
      this.setForm();
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
