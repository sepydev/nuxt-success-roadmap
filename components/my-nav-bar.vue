<template>
  <div>

    <push :isOpen="open"
          :burgerIcon="false">

      <nuxt-link class="link-primary" to="/">Home</nuxt-link>
      <hr class="my-4">
      <div class="row" v-if="this.$auth.loggedIn">
        <nuxt-link class="link-secondary" to="/personal-todo/core-values">Core values</nuxt-link>
        <nuxt-link class="link-secondary" to="/personal-todo/goals">Goals</nuxt-link>
        <nuxt-link class="link-secondary" to="/personal-todo/tasks">Tasks</nuxt-link>
        <nuxt-link class="link-secondary" to="/personal-todo/to-do-list">To do list</nuxt-link>
      </div>

    </push>


    <b-navbar type="dark" variant="dark">
      <div @click="toggle_menu" style="padding-left: 10px; ">
        <div id="nav-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <b-navbar-brand   style="padding-left: 10px;  ">
        Success-roadmap
      </b-navbar-brand>


      <div v-if="this.$auth.loggedIn">
        <nuxt-link to="/account/profile" class="btn btn-link">{{ this.$auth.user.email }}</nuxt-link>
        <button v-on:click="userLogout()" class="btn btn-link">Logout</button>
      </div>
      <div v-else>
        <nuxt-link to="/account/login" class="btn btn-link">Login</nuxt-link>
        <nuxt-link to="/account/register" class="btn btn-link">Register</nuxt-link>
      </div>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "my-nav-bar",
  data() {
    return {
      open: false
    }
  },
  methods:
    {
      toggle_menu(e) {
        e.preventDefault()
        e.stopPropagation()
        this.open = !this.open
      },
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

*,
*:after,
*:before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

html {
  height: 100%;
}

body {
  height: 100%;
  color: #fffce1;
  font-family: 'Raleway', Arial, sans-serif;
  margin: 0;
}


/* Icon 1 */

#nav-icon {
  width: 25px;
  height: 20px;
  position: relative;
  margin: 5px auto;

  cursor: pointer;
}

#nav-icon span, #nav-icon3 span, #nav-icon4 span {
  display: block;
  position: absolute;
  height: 4px;
  width: 100%;
  background: #FFFFFF;
  border-radius: 5px;
  opacity: 1;
  left: 0;

}

#nav-icon span:nth-child(1) {
  top: 0;
}

#nav-icon span:nth-child(2) {
  top: 10px;
}

#nav-icon span:nth-child(3) {
  top: 20px;
}

</style>
