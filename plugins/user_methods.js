import Vue from 'vue'

const user_mixin = {

  methods: {
    get_user_picture(gender) {
      if (this.$auth.user.photo != null) {
        let file_name = this.$auth.user.photo.split('/').pop()
        return '/personal-to-dos/media/images/' + file_name
      }

      let name = 'man'
      if (gender.toLowerCase() === 'female') {
        name = 'woman'
      }
      return '../' + name + '.png'
    }
  }
}

// if (!Vue.__my_mixin__) {
//   Vue.__my_mixin__ = true
  Vue.mixin(user_mixin)
// }
