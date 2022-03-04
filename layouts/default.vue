<template>
  <div >
    <my-nav-bar/>
    <div class="p-2" id="page-wrap" style="transition: all 0.5s ease 0s;">
      <nuxt/>
    </div>
  </div>

</template>

<script>
export default {
  name: "layout",

}
</script>

<style scoped>

</style>
