<template>
  <div class="col-sm-4 offset-4">
    <h2>Reset your password!</h2>
    <b-form @submit.prevent="changePassword">
      <label class="my-2">New password:</label>
      <b-input type="password" :state="passwordLengthCheck"
               v-model="data.new_password1" name="new_password1"
               placeholder="Enter your new password"
      />
      <b-form-invalid-feedback>
        Password must be grater or equal 8 character
      </b-form-invalid-feedback>
      <label class="my-2">Confirm password:</label>
      <b-input type="password" :state="matchPasswords"
               v-model="data.new_password2"
               name="new_password2"
               placeholder="Enter your new password again"
      />
      <b-form-invalid-feedback>
        Confirm password is not matched with the password!
      </b-form-invalid-feedback>

      <div class="text-danger">
        {{ this.error }}
      </div>
      <br/>
      <b-button class="btn-danger" type="submit">Change password</b-button>


    </b-form>


  </div>
</template>

<script>
export default {
  name: "reset-password-confirm",
  middleware: "auth",
  auth: "guest",
  data() {
    return {
      data: {
        new_password1: "",
        new_password2: "",
        uid: this.$route.params.uidb64,
        token: this.$route.params.token,
      },
      error: '',
    }
  },
  computed: {
    passwordLengthCheck() {
      return this.data.new_password1.length >= 8
    },
    matchPasswords() {
      return this.data.new_password1 === this.data.new_password2
    }
  },
  methods: {
    async changePassword() {
      this.error = ''
      if (!(this.passwordLengthCheck & this.matchPasswords)) {
        return
      }
      try {
        let response = await this.$axios.post(
          'endpoint/accounts/api/password/reset/confirm/',
          this.data
        )
        this.$router.push('/done?msg=Reset password is completed.&url=account/login&button=Login')
      } catch (err) {
        this.error = err.response.data
        console.log(err)
      }

    }
  }

}
</script>

<style scoped>

</style>
