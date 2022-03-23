<template>
  <div>
    <div class="col-lg-8 offset-lg-2 row">
      <h2>
        My Goals
      </h2>
      <div>
        <b-button variant="primary" @click="add">Add new goal</b-button>
        <b-table :fields="fields" :items="goals">
          <template #cell(operations)="row">
            <b-button size="sm" @click="edit(row.item)">Edit</b-button>
            <b-button size="sm" variant="danger" @click="delete_goal(row.item)">Delete</b-button>
          </template>

        </b-table>
      </div>
    </div>
    <goal-detail :id="selected_id" :insert_mode="modal_insert_mode" @callback="load_goals"></goal-detail>
  </div>
</template>

<script>
import goalDetail from "@/components/personal-todo/goal-detail";

export default {
  name: "goals",
  middleware: 'auth',
  components: {goalDetail,},
  mounted() {
    this.load_goals()
  },
  data() {
    return {
      fields: ['title', 'description', 'due_date', 'group', 'operations'],
      goals: [],
      modal_insert_mode: true,
      selected_id: Number,

    }
  },
  methods: {
    edit(goal) {
      this.selected_id = goal.pk
      this.modal_insert_mode = false
      this.$bvModal.show('goal-detail')

    },
    async delete_goal(goal) {
      try {
        let response = await this.$axios.delete('endpoint/personal-to-dos/goal/' + goal.pk.toString() + "/"
        )
        if (response.status === 204) {
          await this.load_goals()
        }
      } catch (err) {
        console.log(err)
      }
    },
    add() {
      this.selected_id = null
      this.modal_insert_mode = true
      this.$bvModal.show('goal-detail')
    },
    async load_goals() {
      try {
        let response = await this.$axios.get('personal-to-dos/goal/')
        if (response.status === 200) {
          this.goals = response.data
        }
      } catch (e) {
        console.log(e)
      }
    }

  },


}
</script>

<style scoped>

</style>
