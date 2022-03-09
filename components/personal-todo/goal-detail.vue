<template>
  <div>
    <b-modal id="goal-detail" :title="form_title" @ok="handel_ok" @shown="show" size="lg">
      <b-form ref="form" @submit.stop.prevent="save_data">

        <div class="row">
          <div class="col-md order-md-0">

            <b-form-group
              label="Title"
              label-for="title-input"
              invalid-feedback="Title is required"
              :state="titleState"
            >

              <b-form-input
                id="title-input"
                v-model="goal.title"
                :state="titleState"
                required
              ></b-form-input>


            </b-form-group>

            <b-form-group
              label="Description"
              label-for="description-input"
            >
              <b-form-input
                id="description-input"
                v-model="goal.description"
              ></b-form-input>

            </b-form-group>

            <b-form-group
              label="Group"
              label-for="group-input"
            >
              <b-form-select
                id="group-input"
                v-model="goal.group"
                :options="group_options"
              ></b-form-select>

            </b-form-group>

            <b-form-group
              label="Due date"
              label-for="due-date-input"
            >
              <b-form-input
                id="due-date-input"
                type="date"
                v-model="goal.due_date"
              ></b-form-input>
            </b-form-group>


            <br/>


            <div class="text-danger">
              {{ this.error }}
            </div>
            <br/>


          </div>
          <div class="col-md order-md-1">

            <b-form-group
              label="Related core values"
              label-for="core-value-input"
            >
              <b-form-checkbox-group
                id="core-value-input"
                :options="core_values"
                value-field="pk"
                text-field="title"
                v-model="goal.core_values"

              >
              </b-form-checkbox-group>
            </b-form-group>
          </div>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "goal-detail",
  props: {
    id: Number,
    insert_mode: Boolean,
  },
  computed: {
    form_title() {
      if (this.insert_mode) {
        return "Add new goal"
      }
      return "Edit goal"
    }
  },
  data() {
    return {
      goal: {},
      group_options: ["immediately", "short term", "middle term", "long term", "Very Long term"],
      core_values: [],
    }
  },
  methods: {
    show() {
      this.get_goal()
      this.load_core_values()
    },
    async load_core_values() {
      try {
        let response = await this.$axios.get('endpoint/personal-to-dos/core-value/')
        if (response.status === 200) {
          this.core_values = response.data
        }
      } catch (err) {
        console.log(err)
      }
    },
    async get_goal() {
      if (!this.insert_mode) {
        try {
          let response = await this.$axios.get('endpoint/personal-to-dos/goal/' + this.id + '/')
          console.log(response)
          if (response.status === 200) {
            this.goal = response.data
          }
        } catch (e) {
          console.log(e)
        }
      }

    },
    handel_ok(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.save_data()
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.titleState = valid
      return valid
    },
    async save_data() {

      if (!this.checkFormValidity()) {
        return
      }

      let data = {
        title: this.goal.title,
        description: this.goal.description,
        is_active: true,
        group: this.goal.group,
        due_date: this.goal.due_date,
        core_values: this.goal.core_values,
      }
      let response = null

      if (this.insert_mode) {
        try {
          response = await this.$axios.post('endpoint/personal-to-dos/goal/', data)
        } catch (err) {
          console.log(err)
          return
        }
      } else {
        try {
          response = await this.$axios.put('endpoint/personal-to-dos/goal/' + this.goal.pk.toString() + "/", data)
        } catch (err) {
          console.log(err)
          return
        }
      }
      if (response != null && (response.status === 200 || response.status === 201)) {
        this.$emit('callback')
        this.$nextTick(() => {
          this.$bvModal.hide('goal-detail')
        })
      }
    },
  },
}
</script>

<style scoped>

</style>
