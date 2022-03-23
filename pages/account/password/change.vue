<template>
  <div class="col-sm-4 offset-4">
    <h2>Change password</h2>
    <b-form @submit.prevent="changePassword">
      <label>New password:</label>
      <b-input name="password1"
               required
               type="password"
               v-model="data.new_password1"
               placeholder="Enter your new password"
               :state="passwordLengthCheck"
      />
      <b-form-invalid-feedback>
        Password must be grater or equal 8 characters
      </b-form-invalid-feedback>

      <label>Confirm password:</label>
      <b-input name="password2"
               required
               type="password"
               v-model="data.new_password2"
               placeholder="Enter your new password again"
               :state="matchPasswords"
      />
      <b-form-invalid-feedback>
        Confirm password is not matched with the password!
      </b-form-invalid-feedback>

      <div class="text-danger">
        {{ this.error }}
      </div>
      <br/>
      <b-button type="submit" class="btn-danger">Change Password</b-button>

    </b-form>
  </div>
</template>

<script>
export default {
  name: "change",
  middleware: "auth",
  data() {
    return {
      data: {
        new_password1: "",
        new_password2: "",
      },
      error: "",
    }
  },
  computed: {
    passwordLengthCheck() {
      return this.data.new_password1.length >= 8
    },
    matchPasswords() {
      return this.data.new_password1 === this.data.new_password2
    },
  },
  methods: {
    async changePassword() {
      this.error = ""
      try {
        let response = await this.$axios.post('accounts/api/password/change/',
          this.data)
        if (response.status === 200) {
          await this.$router.push('/done?msg=The password is changed.&url=account/login&button=Login')
        }


      } catch (err) {
        this.error = err.response.data
        console.log(err)

      }
    }
  },
}
</script>

<style scoped>

</style>
