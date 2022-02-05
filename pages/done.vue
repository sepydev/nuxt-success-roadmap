<template>
  <div class="col-sm-4 offset-4">
    <h2>{{ this.$route.query.msg }}</h2>
    <nuxt-link :to="`${this.$route.query.url}`">{{ this.$route.query.button }}</nuxt-link>
  </div>
</template>

<script>
export default {
  name: "done_operation"
}
</script>

<style scoped>

</style>
