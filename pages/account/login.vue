<template>
  <div class="col-md-4 offset-md-4">
    <h2 class="text-center">Welcome back! </h2>
    <form @submit.prevent="userLogin">
      <label class="col-form-label">Email</label>
      <input type="email" class="input-group" name="email" v-model="login.email">
      <br/>

      <label class="col-form-label">Password</label>
      <input type="password" class="input-group" name="password" v-model="login.password"><br/>

      <button type="submit">Submit</button>

    </form>
  </div>

</template>

<script>
export default {
  name: "login",
  head() {
    return {
      title: 'Login'
    }
  },
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith('local',
          {
            data: this.login
          })
        this.$router.push('/')
      } catch (err) {
        console.log(err)
      }
    }
  }


}
</script>

<style scoped>

</style>
