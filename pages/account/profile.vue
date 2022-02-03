<template>
  <div class="col-sm-4 offset-md-4">
    <h2>User Profile</h2>
    <b-form>
      <label class="my-2">Email:</label>
      <b-form-input type="text" :value="this.$auth.user.email" readonly/>
      <label class="my-2">First Name:</label>
      <b-form-input type="text" :value="this.$auth.user.first_name" required/>
      <label class="my-2">Last Name:</label>
      <b-form-input type="text" :value="this.$auth.user.last_name" required/>
      <br/>
      <b-button type="submit" >Save Changes</b-button>
      <b-button to="/account/change-password" class="btn-danger">Change Password</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "profile",
  middleware: "auth",
}
</script>

<style scoped>

</style>
