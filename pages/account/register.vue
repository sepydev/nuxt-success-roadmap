<template>
  <div class="col-sm-4 offset-4">
    <h2>Register new account</h2>
    <h5>We are pleased to have you on our website.</h5>
    <b-form @submit.prevent="registerNewAccount">

      <label class="my-2">Email:</label>
      <b-form-input type="email" v-model="register.email"
                    placeholder="Enter your email address"
                    required/>

      <label class="my-2">New password:</label>
      <b-input type="password" :state="passwordLengthCheck"
               v-model="register.password1" name="new_password1"
               placeholder="Enter your new password"
      />
      <b-form-invalid-feedback>
        Password must be grater or equal 8 character
      </b-form-invalid-feedback>
      <label class="my-2">Confirm password:</label>
      <b-input type="password" :state="matchPasswords"
               v-model="register.password2"
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
      <b-button class="btn-primary" type="submit">Submit</b-button>


    </b-form>


  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      register: {
        password1: "",
        password2: "",
        email: "",
        username: ""

      },
      error: '',
    }
  },
  computed: {
    passwordLengthCheck() {
      return this.register.password1.length >= 8
    },
    matchPasswords() {
      return this.register.password1 === this.register.password2
    }
  },
  methods: {
    async registerNewAccount()
    {
      this.error = ''
      if (!(this.passwordLengthCheck && this.matchPasswords)) {
        return
      }
      this.register.username = this.register.email
      try {
        this.$nuxt.$loading.start()

        await this.$axios.post(
          'accounts/api/registration/',
          this.register
        );
        await this.$router.push('/done?msg=Verification e-mail sent. Please active your account.&url=account/login&button=Login')
      } catch (err) {
        this.error = err.response.data
        console.log(err)
      }
      this.$nuxt.$loading.finish()

    }

  }
}
</script>

<style scoped>

</style>
