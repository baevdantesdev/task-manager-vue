<template lang="pug">
  .preloader
    svg.preloader__svg(xmlns='http://www.w3.org/2000/svg', width='57', height='57', viewBox='0 0 57 57')
      g#Group_1551(data-name='Group 1551', transform='translate(295 -617) rotate(90)')
        g#Ellipse_2(data-name='Ellipse 2', transform='translate(617 238)', fill='none', stroke='#000', stroke-width='8')
          circle(cx='28.5', cy='28.5', r='28.5', stroke='none')
          circle(cx='28.5', cy='28.5', r='24.5', fill='none')
        rect#Rectangle_85(data-name='Rectangle 85', width='57', height='29', transform='translate(617 238)', fill='#fff')
</template>

<script>
export default {
  name: "preloader"
};
</script>

<style scoped lang="sass">
.preloader
  width: 100%
  height: 100%
  position: fixed
  top: 0
  left: 0
  background: #fff
  display: flex
  align-items: center
  justify-content: center
  z-index: 99

@keyframes preloader_rotate
    from
        transform: rotate(0)
    to
      transform: rotate(360deg)
.preloader__svg
  animation: preloader_rotate 1s infinite linear
</style>
