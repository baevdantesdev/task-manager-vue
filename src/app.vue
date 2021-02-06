<template lang="pug">
  div#app
    preloader(v-if="isLoading")
    main.main
      router-view
</template>

<script>
import preloader from "@/components/preloader";
import { mapState } from "vuex";

export default {
  name: "app",
  components: { preloader },
  computed: mapState({
    isLoading: state => state.isLoading
  })
};
</script>

<style lang="sass">
#app
  min-height: 100vh
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

.button
  margin-bottom: 20px
  padding: 15px 30px

h1
  margin-top: 0
  margin-bottom: 25px

.main
  padding: 20px

body
  padding: 0
  margin: 0

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
</style>
