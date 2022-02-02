<template>

  <div>
    <h1>Hello World !</h1>
    <button @click="go">go </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  methods:{
    go(){

      this.$router.push('/done?msg=Reset password is completed.&url=account/login&button=Login')

    }
  }


})
</script>
