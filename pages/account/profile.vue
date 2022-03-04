<template>
  <div>
    <b-form @submit.prevent="saveUserData">
      <div class="col-md-8 offset-md-2 row ">
        <h2>User Profile</h2>
        <div class="col order-md-1  ">
          <h6>Profile picture</h6>
          <b-img :src="get_picture()" fluid rounded="circle"/>
          <div class="d-flex justify-content-center">
            <!--            <b-button class="m-2" @click="uploadPhoto">Upload a photo</b-button>-->

            <label class="btn btn-primary m-2">Upload a photo
              <input type="file" id="file" v-on:change="uploadPhoto($event)"/>
            </label>

            <b-button class="m-2" @click="removePhoto">remove photo</b-button>
          </div>
          <br/>
          <div class="text-danger">
            {{ this.photo_upload_error }}
          </div>
        </div>
        <div class="col order-md-0  ">
          <b-card class="m-2">
            <label class="my-2">Email:</label>
            <b-form-input type="text" :value="this.$auth.user.email" readonly/>
            <label class="my-2">First Name:</label>
            <b-form-input type="text" v-model="user.first_name" required/>
            <label class="my-2">Last Name:</label>
            <b-form-input type="text" v-model="user.last_name"/>

            <label class="my-2">Bio:</label>
            <b-textarea v-model="user.biography"/>
          </b-card>
          <b-card class="m-2">
            <b-card-header>Personal data</b-card-header>
            <b-card-body>
              <label class="my-2">Website:</label>
              <b-form-input
                type="text"
                v-model="user.website"
                :state="validate_url(user.website)"
              />

              <label class="my-2">Phone Number:</label>
              <b-form-input
                type="text"
                v-model="user.phone_number"
                :state="validate_phone(user.phone_number)"
              />


              <label class="my-2">Gender</label>
              <!--          <vue-autosuggest :suggestions="genders" input-props=""-->
              <!--                           :v-model="user.gender"/>-->

              <vue-simple-suggest
                :list="genders"
                v-model="user.gender"
              />

            </b-card-body>
          </b-card>
          <div class="text-danger">
            {{ this.error }}
          </div>
          <br/>
          <b-button type="submit">Save Changes</b-button>
          <b-button to="/account/password/change" class="btn-danger">Change Password</b-button>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
import VueSimpleSuggest from 'vue-simple-suggest'

export default {
  name: "profile",
  components: {
    VueSimpleSuggest
  },
  middleware: "auth",
  data() {
    return {
      genders: ['Male', 'Female',],
      error: '',
      photo_upload_error: '',
      user: {
        first_name: this.$auth.user.first_name,
        last_name: this.$auth.user.last_name,
        biography: this.$auth.user.biography,
        website: this.$auth.user.website,
        phone_number: this.$auth.user.phone_number,
        gender: this.$auth.user.gender

      },
      url_regex: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/,
      phone_regex: /(^(\+?1?\d{9,15})$)|^$/,

    }
  }
  ,
  methods: {
    get_picture() {
      if (this.$auth.user.photo != null) {
        let file_name = this.$auth.user.photo.split('/').pop()
        return '/personal-to-dos/media/images/' + file_name
      }

      let name = 'man'
      if (this.user.gender.toLowerCase() === 'female') {
        name = 'woman'
      }
      return '../' + name + '.png'

    },
    validate_url(url) {
      if (url !=='') {
        return this.url_regex.test(url)
      }
      else
      {
        return true
      }
    },
    validate_phone(url) {
      return this.phone_regex.test(url)
    },

    async saveUserData() {
      this.error = ''
      try {
        let response = await this.$axios.put('endpoint/accounts/api/user/',
          this.user)
        if (response.status === 200) {
          await this.$auth.fetchUser()
        }
      } catch (err) {
        this.error = err.response.data
        console.log(err)
      }
    },
    async removePhoto() {
      this.photo_upload_error = ''
      try {
        let response = await this.$axios.delete('endpoint/accounts/api/user/upload-photo/')
        if (response.status === 200) {
          await this.$auth.fetchUser()
        }
      } catch (err) {
        this.photo_upload_error = err.response.data
        console.log(err)
      }
    },
    async uploadPhoto(event) {
      const file = event.target.files[0];
      if (!file) return;
      this.photo_upload_error = ''
      try {
        let response = await this.$axios.post('endpoint/accounts/api/user/upload-photo/',
          file,
          {
            headers: {
              'Content-type': file.type,
              'Content-Disposition': 'attachment; filename="' + file.name + '"'
            }
          })
        if (response.status === 200) {
          await this.$auth.fetchUser()
        }
      } catch (err) {
        console.log(err)
      }
    },


  }
}
</script>

<style scoped>
input[type="file"] {
  position: absolute;
  top: -500px;
}
</style>
