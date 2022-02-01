<template>
  <div class="col-md-4 offset-md-4">
    <h2 class="text-center">Reset Password</h2>
    <b-form @submit.prevent="resetPassword">
      <label class="col-form-label">Email</label>
      <b-input type="email" class="input-group" name="email" />
      <br/>
      <b-button  type="submit" class="btn-danger">Send reset password email</b-button>
    </b-form>
    <br/>

  </div>
</template>

<script>
export default {
  name: "reset-password",
  middleware:"auth",
  auth:"guest",
  head() {
    return {
      title: 'Reset Password',
    }
  },
  methods:{
    async resetPassword() {
      try {

      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
