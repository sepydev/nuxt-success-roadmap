import Vue from 'vue'

const validator_mixin = {

  methods: {
    validate_url(url) {
      if (url !== '') {
        const url_regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/
        return url_regex.test(url)
      } else {
        return true
      }
    },
    validate_phone(url) {
      const phone_regex = /(^(\+?1?\d{9,15})$)|^$/
      return phone_regex.test(url)
    },
  }
}

Vue.mixin(validator_mixin)
