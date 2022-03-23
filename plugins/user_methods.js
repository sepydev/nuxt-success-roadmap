import Vue from 'vue'

const user_mixin = {

  methods: {
    async get_user_picture(gender) {
      console.log('get_user_picture')
      if (this.$auth.user.photo != null) {
        let file_name = this.$auth.user.photo.split('/').pop()
        try {
          let response =await this.$axios.get(
            '/personal-to-dos/media/images/' + file_name,
          )
          console.log(response)
          if (response.status === 200) {


            // const blob = new Blob(response.data)
            // const isServer = typeof window === 'undefined'
            // const base64 = isServer ? blob.toString('base64') : btoa(blob)
            // console.log(base64)
            // console.log(blob)
            // const ret = 'data:' + response.headers['content-type'] + ';base64,' + base64
            const ret = 'data:' + response.headers['content-type'] + ';base64,' + response.data.imageData

            // const urlCreator = window.URL || window.webkitURL
            // const ret  = urlCreator.createObjectURL(response.data)
            console.log(ret)
            return ret
          }
        } catch
          (err) {
          console.log('asdfadsfasdfasd')
          console.log(err)
        }

      }

      let name = 'man'
      if (gender.toLowerCase() === 'female') {
        name = 'woman'
      }
      return '../' + name + '.png'
    }
  }
}

Vue.mixin(user_mixin)

