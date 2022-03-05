<template>
  <div>

    <b-modal id="modal-core-value" :title="form_title" @ok="handleOk">

      <b-form ref="form" @submit.stop.prevent="save_data">
        <b-form-group
          label="Title"
          label-for="title-input"
          invalid-feedback="Title is required"
          :state="titleState"
        >
          <vue-simple-suggest
            :list="core_value_title_suggestions"
            id="title-input"
            v-model="title"
            :state="titleState"
            required
          />


        </b-form-group>

        <b-form-group
          label="Description"
          label-for="description-input"
        >
          <b-form-input
            id="description-input"
            v-model="description"
          ></b-form-input>
        </b-form-group>


        <br/>


        <div class="text-danger">
          {{ this.error }}
        </div>
        <br/>

      </b-form>


    </b-modal>

  </div>

</template>

<script>
import VueSimpleSuggest from 'vue-simple-suggest'

export default {
  name: "core-value-detail",
  components: {
    VueSimpleSuggest
  },
  props: {
    insert_mode: Boolean,
    pk: Number,
    title: String,
    description: String,
  },
  data() {
    return {
      error: "",
      titleState: null,
      core_value_title_suggestions: []
    }
  },
  mounted: async function () {
    this.core_value_title_suggestions = await this.get_field_suggestions('personal_to_dos.corevalue', 'title')
  },
  computed: {
    form_title: function () {
      if (this.insert_mode) {
        return "Add new core value"
      }
      return "Edit core value"
    }
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.titleState = valid
      return valid
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.save_data()
    },

    async save_data() {
      if (!this.checkFormValidity()) {
        return
      }

      if (this.insert_mode) {
        try {
          let response = await this.$axios.post('endpoint/personal-to-dos/core-value/',
            {
              title: this.title,
              description: this.description,
              is_active: true
            }
          )
          if (response.status === 201) {
            this.$emit('callback')
            this.$nextTick(() => {
              this.$bvModal.hide('modal-core-value')
            })
          }
        } catch (err) {
          console.log(err)
        }
      } else {


        try {
          let response = await this.$axios.put('endpoint/personal-to-dos/core-value/' + this.pk.toString() + "/",
            {
              title: this.title,
              description: this.description,
              is_active: true
            },
          )
          if (response.status === 200) {
            this.$emit('callback')
            this.$nextTick(() => {
              this.$bvModal.hide('modal-core-value')
            })
          }
        } catch (err) {
          console.log(err)
        }


      }

    }
  }
}
</script>

<style scoped>

</style>
