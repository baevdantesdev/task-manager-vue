<template lang="pug">
  div.task-item(:style="{'background-color': getStatusColor(task)}" :title="task.title")
    div.task-item__title {{ task.title }}
    div.task-item__description {{ task.description }}
</template>

<script>
import { statuses } from "@/statuses";

export default {
  name: "task-item",
  props: ["task"],
  methods: {
    getStatusColor: task => {
      return statuses.find(status => status.id === task.status).color;
    }
  }
};
</script>

<style lang="sass" scoped>
.task-item
  padding: 20px

.task-item__title
  font-size: 20px
  font-weight: bold
  margin-bottom: 15px
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap

.task-item__description
  -webkit-line-clamp: 3
  overflow: hidden
</style>
