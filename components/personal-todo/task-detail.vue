<template>
  <div>
    <div>
      <b-modal id="task-detail" :title="form_title" @ok="handel_ok" @shown="show" size="lg">
        <b-form ref="form" @submit.stop.prevent="save_data">

          <div class="row">
            <div class="col-md order-md-0">

              <b-form-group
                label="Title"
                label-for="title-input"
                invalid-feedback="Title is required"
                :state="title_state"
              >

                <b-form-input
                  id="title-input"
                  v-model="task.title"
                  :state="title_state"
                  required
                ></b-form-input>


              </b-form-group>

              <b-form-group
                label="Description"
                label-for="description-input"
              >
                <b-form-input
                  id="description-input"
                  v-model="task.description"
                ></b-form-input>

              </b-form-group>

              <b-form-group
                label="Related goal"
                label-for="goal-input"
              >
                <b-form-select
                  id="goal-input"
                  v-model="task.goal"
                  :options="goals"
                  value-field="pk"
                  text-field="title"
                ></b-form-select>

              </b-form-group>

              <b-form-group
                label="Start date time"
              >
                <b-form-input
                  type="datetime-local"
                  id="start-date-time-input"
                  v-model="task.start_date_time"
                ></b-form-input>


              </b-form-group>

              <b-form-checkbox
                class="m-2"
                id="completely-done-input"
                v-model="task.completely_done"
              >Completely done
              </b-form-checkbox>


              <br/>


              <div class="text-danger">
                {{ this.error }}
              </div>
              <br/>


            </div>
            <div class="col-md order-md-1">

              <b-form-checkbox
                class="m-2"
                id="is-repeated-input"
                v-model="repeat"
              >Repeat
              </b-form-checkbox>
              <div v-show="repeat">

                <b-row class="my-1">
                  <b-col sm="4">
                    <lable>Relate every</lable>
                  </b-col>
                  <b-col sm="3">
                    <b-form-input
                      id="repeat-period-input"
                      type="number"
                      v-model="task.repeat_period"
                      :state="repeat_period_state"
                    ></b-form-input>

                  </b-col>
                  <b-col sm="5">
                    <b-form-select
                      id="repeat-input"
                      v-model="task.repeat_type"
                      :options="repeat_types"
                      :state="repeat_type_state"
                    ></b-form-select>
                  </b-col>
                </b-row>


                <b-form-group
                  label="Repeat on"
                  v-slot="{ ariaDescribedby }"
                  v-show="task.repeat_type=='Week'"
                >
                  <b-form-checkbox-group
                    v-model="task.selected_week_days"
                    :options="selected_week_days"
                    :aria-describedby="ariaDescribedby"
                    value-field="pk"
                    text-field="title"
                    buttons
                    button-variant="primary"
                    name="buttons-2"
                  ></b-form-checkbox-group>

                </b-form-group>

                <b-form-group
                  label="Ends"
                  v-slot="{ ariaDescribedby }"
                >

                  <b-form-radio-group
                    :aria-describedby="ariaDescribedby"
                    v-model="task.end_type"

                  >
                    <b-row class="my-1">
                      <b-col sm="4">
                        <b-form-radio value="Never">Never</b-form-radio>
                      </b-col>
                    </b-row>
                    <b-row class="my-1">
                      <b-col sm="4">
                        <b-form-radio value="On specific date">On</b-form-radio>
                      </b-col>
                      <b-col sm="8">
                        <b-form-input type="date" v-model="task.end_date"
                                      :disabled="task.end_type!='On specific date'"
                        ></b-form-input>
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="4">
                        <b-form-radio value="After specific occurrence">After</b-form-radio>
                      </b-col>
                      <b-col sm="4">
                        <b-form-input type="number" v-model="task.end_after_occurrence"
                                      :disabled="task.end_type!='After specific occurrence'"
                        ></b-form-input>
                      </b-col>
                      <b-col sm="4">
                        <label class="col-8">occurrences</label>
                      </b-col>

                    </b-row>

                  </b-form-radio-group>


                </b-form-group>


              </div>
            </div>
          </div>
        </b-form>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "task-detail",
  props: {
    id: Number,
    insert_mode: Boolean,
  },
  computed: {
    form_title() {
      if (this.insert_mode) {
        return "Add new task"
      }
      return "Edit task"
    }
  },
  data() {
    return {
      repeat: false,
      //"No repeat",
      repeat_types: ["Day", "Week", "Month", "Year"],
      selected_week_days: [
        {
          pk: "Sunday",
          title: 'Su',
        },
        {
          pk: "Monday",
          title: 'Mo',
        },
        {
          pk: "Tuesday",
          title: 'Tu',
        },
        {
          pk: "Wednesday",
          title: 'We',
        },
        {
          pk: "Thursday",
          title: 'Th',
        },
        {
          pk: "Friday",
          title: 'Fr',
        },
        {
          pk: "Saturday",
          title: 'Sa',
        },
      ],
      end_types: [{value: "Never", text: "Never"},
        {value: "On specific date", text: "On"},
        {value: "After specific occurrence", text: "After"}],
      task: {
        "end_type": "Never",
        "end_after_occurrence": 0,
        "repeat_type": "No repeat",
        "repeat_period": 0,
        "selected_week_days": [],
      },
      goals: [],
      title_state: null,
      repeat_type_state: null,
      repeat_period_state: null,
      error: "",

    }
  }
  ,
  methods: {

    show() {
      this.get_task()
      this.load_goals()
      this.error = ""
    }
    ,
    async load_goals() {
      try {
        let response = await this.$axios.get('endpoint/personal-to-dos/goal/')
        if (response.status === 200) {
          this.goals = response.data
        }
      } catch (err) {
        console.log(err)
      }
    }
    ,
    async get_task() {
      if (!this.insert_mode) {
        try {
          let response = await this.$axios.get('endpoint/personal-to-dos/task/' + this.id + '/')
          if (response.status === 200) {
            this.task = response.data
            if (this.task.repeat_type!= 'No repeat')
            {
              this.repeat= true
            }
          }
        } catch (e) {
          console.log(e)
        }
      }
      else {
        this.task = {
          "end_type": "Never",
          "end_after_occurrence": 0,
          "repeat_type": "No repeat",
          "repeat_period": 0,
          "selected_week_days": [],
        }
        this.repeat=false
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
      this.title_state = true
      this.repeat_period_state = true
      this.repeat_type_state = true

      if (!this.task.title || this.task.title.length === 0) {
        valid &= false
        this.title_state = false
      }
      if (this.repeat && (!this.task.repeat_period || this.task.repeat_period <= 0)) {
        valid &= false
        this.repeat_period_state = false

      }
      if (this.repeat && (!this.task.repeat_type || this.task.repeat_type.length === 0)) {
        valid &= false
        this.repeat_type_state = false
      }


      return valid
    }
    ,
    async save_data() {

      if (!this.checkFormValidity()) {
        return
      }
      let repeat_type = this.task.repeat_type
      if (!this.repeat) {
        repeat_type = 'No repeat'
      }

      if (!this.task.selected_week_days) {
        this.task.selected_week_days = []
      }
      if (!this.task.end_type) {
        this.task.end_type = "Never"
      }
      let data = {
        "title": this.task.title,
        "description": this.task.description,
        "goal": this.task.goal,
        "start_date_time": this.task.start_date_time,
        "completely_done": this.task.completely_done,
        "repeat_type": repeat_type,
        "is_active": true,
        "repeat_period": this.task.repeat_period,
        "selected_week_days": this.task.selected_week_days,
        "end_type": this.task.end_type,
        "end_date": this.task.end_date,
        "end_after_occurrence": this.task.end_after_occurrence
      }
      let response = null

      if (this.insert_mode) {
        try {
          response = await this.$axios.post('endpoint/personal-to-dos/task/', data)
        } catch (err) {
          if (err.response) {
            this.error = err.response.data
          }
          console.log(err)
          return
        }
      } else {
        try {
          response = await this.$axios.put('endpoint/personal-to-dos/task/' + this.task.pk.toString() + "/", data)
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
          this.$bvModal.hide('task-detail')
        })
      }
    }
    ,
  }
  ,
}
</script>

<style scoped>

</style>
