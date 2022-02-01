<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/" style="padding: 3px">Home</b-navbar-brand>
      <div v-if="this.$auth.loggedIn">
        <nuxt-link to="/account/profile" class="btn btn-link">{{ this.$auth.user.email }}</nuxt-link>
        <button v-on:click="userLogout()" class="btn btn-link">Logout</button>
      </div>
      <div v-else>
        <nuxt-link to="/account/login" class="btn btn-link">Login</nuxt-link>
      </div>
    </b-navbar>
    <nuxt/>
  </div>

</template>

<script>
export default {
  name: "navbar",
  methods:
    {
      async userLogout() {
        try {
          let response = await this.$auth.logout()
          console.log(response)
        } catch (err) {
          console.log(err)
        }
      }
    }
}
</script>

<style scoped>

</style>
