<template>
  <div class="col-sm-4 offset-4">
    <h2>Verify email address</h2>
    <h5>To verify email address please click on the bellow button.</h5>

    <b-button @click="verifyEmail">Verify</b-button>
  </div>
</template>

<script>
export default {
  name: "index",
  middleware: "auth",
  auth: "guest",
  methods: {
    async verifyEmail() {
      this.error = ''
      try {
        await this.$axios.post(
          'endpoint/accounts/api/registration/verify-email/',
          {
            key: this.$route.query.key
          }
        );
        await this.$router.push('/done?msg=Your email address id verified.&url=account/login&button=Login')
      } catch (err) {
        this.error = err.response.data
        console.log(err)
      }

    }
    ,
  }
}
</script>

<style scoped>

</style>
