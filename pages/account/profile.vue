<template>
<div class="col-sm-4 p-3">
  <label class="my-2">Email:</label>
  <b-form-input type="text"  :value="this.$auth.user.email"  readonly  />
  <label class="my-2">First Name:</label>
  <b-form-input type="text"  :value="this.$auth.user.first_name"  readonly  />
  <label class="my-2">Last Name:</label>
  <b-form-input type="text"  :value="this.$auth.user.last_name"  readonly  />
</div>
</template>

<script>
export default {
  name: "profile"
}
</script>

<style scoped>

</style>
