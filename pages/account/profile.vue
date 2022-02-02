<template>
<div class="col-sm-4 offset-md-4">
  <h2>User Profile</h2>
  <label class="my-2">Email:</label>
  <b-form-input type="text"  :value="this.$auth.user.email"  readonly  />
  <label class="my-2">First Name:</label>
  <b-form-input type="text"  :value="this.$auth.user.first_name"  readonly  />
  <label class="my-2">Last Name:</label>
  <b-form-input type="text"  :value="this.$auth.user.last_name"  readonly  />
  <br/>
  <b-button to="/account/change-password" class="btn-danger">Change Password</b-button>
</div>
</template>

<script>
export default {
  name: "profile",
  middleware:"auth",
}
</script>

<style scoped>

</style>
