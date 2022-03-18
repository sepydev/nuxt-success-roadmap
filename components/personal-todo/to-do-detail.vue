<template>
  <div>
    <div>
      <b-modal id="to-do-detail" :title="form_title"  @shown="show" size="lg"

      >
        <b-form ref="form" @submit.stop.prevent="save_data">


          <div class="row">


            <b-form-group label="Task">
              <b-form-input v-model="task.title" readonly ></b-form-input>
            </b-form-group>
            <b-form-group label="Task Description">
              <b-form-input v-model="task.description" readonly ></b-form-input>
            </b-form-group>
            <b-form-group label="Goal">
              <b-form-input v-model="task.goal_title" readonly ></b-form-input>
            </b-form-group>


            <b-form-group
              label="Complete Description"
              label-for="description-input"
            >
              <b-form-input
                id="description-input"
                v-model="todo.description"
              ></b-form-input>

            </b-form-group>


          </div>
        </b-form>

        <template #modal-footer="{ ok, cancel, hide }">

          <!-- Emulate built in modal footer ok and cancel button actions -->
          <b-button size="sm" variant="success" @click="handel_ok">
            OK
          </b-button>
          <b-button size="sm"  @click="cancel()">
            Cancel
          </b-button>
          <!-- Button with custom close trigger value -->
          <b-button size="sm" variant="danger" @click="delete_data">
            Delete it
          </b-button>
        </template>

      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "to-do-detail",
  props: {
    task_id: Number,
    date: Date,
  },
  computed: {
    form_title() {
      if (this.insert_mode) {
        return "Complete the to-do"
      }
      return "Edit completed to-do"
    }
  },
  data() {
    return {
      todo: {},
      task: {},
      error: "",

    }
  }
  ,
  methods: {

    show() {
      this.get_task()
      this.get_todo()
      this.error = ""
    }
    ,
    async get_task() {

      try {
        let response = await this.$axios.get('endpoint/personal-to-dos/task/' + this.task_id + '/')
        if (response.status === 200) {
          this.task = response.data
        }
      } catch (e) {
        console.log(e)
      }


    }
    ,
    async get_todo() {
      try {
        this.todo={}
        let date = Intl.DateTimeFormat(
          "fr-CA", {year: "numeric", month: "2-digit", day: "2-digit"}
        ).format(this.date)
        let response = await this.$axios.get(
          'endpoint/personal-to-dos/partially-completed-task/?task_id=' + this.task_id + '&date=' + date)
        if (response.status === 200) {
          if (response.data.length> 0)
          {
            this.todo = response.data[0]
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
    ,
    handel_ok(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.save_data()
    }
    ,
    checkFormValidity() {
      let valid = true
      return valid
    }
    ,
    async save_data() {

      if (!this.checkFormValidity()) {
        return
      }

      let data = {
        "description": this.todo.description,
        "task": this.task_id,
        "is_active": true
      }
      let response = null

      if (! this.todo.pk ) {
        try {
          response = await this.$axios.post(
            'endpoint/personal-to-dos/partially-completed-task/',
            data
          )
        } catch (err) {
          if (err.response) {
            this.error = err.response.data
          }
          console.log(err)
          return
        }
      } else {
        try {
          response = await this.$axios.put(
            'endpoint/personal-to-dos/partially-completed-task/' + this.todo.pk.toString() + "/",
            data
          )
        } catch (err) {
          if (err.response) {
            this.error = err.response.data
          }
          return
        }
      }
      if (response != null && (response.status === 200 || response.status === 201)) {
        this.$emit('callback')
        this.$nextTick(() => {
          this.$bvModal.hide('to-do-detail')
        })
      }
    }
    ,

    async delete_data() {


      let response = null

      if  ( this.todo.pk ) {
        try {
          response = await this.$axios.delete(
            'endpoint/personal-to-dos/partially-completed-task/' + this.todo.pk.toString() + "/",
          )
        } catch (err) {
          if (err.response) {
            this.error = err.response.data
          }
          console.log(err)
          return
        }

        if (response.status === 204) {
          this.$emit('callback')
          this.$nextTick(() => {
            this.$bvModal.hide('to-do-detail')
          })
        }
      }
    }
    ,

  }
  ,
}
</script>

<style scoped>

</style>
