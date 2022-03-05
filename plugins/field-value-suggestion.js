import Vue from 'vue'

const suggestion_mixin = {

  methods: {
    async get_field_suggestions(content_type, field) {

      try {
        let response = await this.$axios.get(
          'endpoint/core/field-values-suggestion/?content_type=' + content_type + '&field=' + field
        )
        if (response.status === 200) {
          return response.data
        }
      } catch (err) {
        console.log(err)
      }
      return null

    }
  }
}

Vue.mixin(suggestion_mixin)
