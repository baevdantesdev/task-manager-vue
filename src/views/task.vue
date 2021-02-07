<template lang="pug">
  div.task(v-if="task")
    h1.task__title {{ task.title }}
    div.row
      div.col-12.col-lg-5
        form.task__form(@submit.prevent="submit")
          input.task__field(v-model="form.title", placeholder="Title", required)
          textarea.task__field.task__field-textarea(rows="8", v-model="form.description", required,
            placeholder="Description")
          select.task__field(v-model="form.status")
            option(v-for="(status, index) in statuses", :key="index", :value="status") {{ status.title }}
          input.task__field(v-model="form.created_date", required, type="date")
          div.flex
            button.button.mr-2 Save
            button.button(@click.prevent="deleteTask") Delete
  div(v-else).text-center
    h1 404
    p Not found task
</template>

<script>
import { mapState } from "vuex";
import { statuses } from "@/statuses";
import moment from "moment";
import store from "@/store";
import { getStatusForRequest } from "@/utils";

export default {
  name: "task",
  data: () => {
    return {
      statuses,
      prevRoute: null,
      isErrorTaskResponse: false,
      form: {
        title: null,
        description: null,
        id: null,
        created_date: moment(new Date()).format("YYYY-MM-DD"),
        status: statuses.find(status => status.id === 1)
      }
    };
  },
  beforeDestroy() {
    store.commit("clearCurrentTask");
    if (this.prevRoute.fullPath === "/tasks/new") {
      this.$router.push("/");
    }
  },
  beforeRouteEnter(to, from, next) {
    store
      .dispatch("getTaskById", to.params.id)
      .then(() => {
        next(vm => {
          vm.prevRoute = from;
        });
      })
      .catch(() => {
        next();
      });
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
      store.dispatch("updateTask", {
        ...this.form,
        status: getStatusForRequest(this.form.status.id),
        created_date: moment(new Date(this.form.created_date)).format(
          "YYYY-MM-DD"
        )
      });
    },
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
    },
    deleteTask() {
      store.dispatch("deleteTask", this.task.id).then(() => {
        this.$router.push("/");
      });
    }
  },
  mounted() {
    if (this.task) {
      this.setForm();
    }
  },
  computed: mapState({
    task: state => state.currentTask
  })
};
</script>
