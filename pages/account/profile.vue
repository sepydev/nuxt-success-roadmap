<template>
  <div class="col-sm-4 offset-md-4">
    <h2>User Profile</h2>
    <b-form @submit.prevent="saveUserData">
      <label class="my-2">Email:</label>
      <b-form-input type="text" :value="this.$auth.user.email" readonly/>
      <label class="my-2">First Name:</label>
      <b-form-input type="text" v-model="user.first_name" required/>
      <label class="my-2">Last Name:</label>
      <b-form-input type="text" v-model="user.last_name" required/>
      <br/>
      <b-button type="submit">Save Changes</b-button>
      <b-button to="/account/password/change" class="btn-danger">Change Password</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "profile",
  middleware: "auth",
  data() {
    return {
      user: {
        first_name: this.$auth.user.first_name,
        last_name: this.$auth.user.last_name
      }
    }
  }
  ,
  methods: {
    async saveUserData() {
      try {
        let response = await this.$axios.put('endpoint/accounts/api/user/',
          this.user)
        this.$auth.fetchUser()
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
