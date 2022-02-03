<template>
  <div class="col-md-4 offset-md-4">
    <h2 class="text-center">Reset Password</h2>
    <b-form @submit.prevent="resetPassword">
      <label class="col-form-label">Email</label>
      <b-input type="email" class="input-group" name="email" v-model="email"/>
      <br/>
      <b-button type="submit" class="btn-danger">Send reset password email</b-button>
    </b-form>
    <br/>

  </div>
</template>

<script>
export default {
  name: "reset-password",
  middleware: "auth",
  auth: "guest",
  head() {
    return {
      title: 'Reset Password',
    }
  },
  data() {
    return {
      email: ""
    }
  },
  methods: {
    async resetPassword() {
      this.$nuxt.$loading.start()
      try {
        let response = await this.$axios.post('endpoint/accounts/api/password/reset/',
          {
            email: this.email
          })
        this.$router.push('/done?msg=You will receive an email with a link to reset your password.&url=/&button=Home')
      } catch (err) {
        console.log(err)
      }
      this.$nuxt.$loading.finish()
    }
  }
}
</script>

<style scoped>

</style>
