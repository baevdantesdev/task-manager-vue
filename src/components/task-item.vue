<template lang="pug">
  div.task-item(:style="{'background-color': getStatusColor(task)}"
    :title="task.title",
    v-on:dblclick="$emit('goToTask', task.id)")
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
  height: 100%

.task-item__title
  font-size: 20px
  font-weight: bold
  margin-bottom: 15px
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap

.task-item__description
  display: -webkit-box
  -webkit-line-clamp: 2
  -webkit-box-orient: vertical
  overflow: hidden
</style>
