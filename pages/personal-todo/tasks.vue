<template>
  <div>
    <div class="col-lg-8 offset-lg-2 row">
      <h2>
        My Tasks
      </h2>
      <div>
        <b-button variant="primary" @click="add">Add new task</b-button>
        <b-table :fields="fields" :items="tasks">
          <template #cell(operations)="row">
            <b-button size="sm" @click="edit(row.item)">Edit</b-button>
            <b-button size="sm" variant="danger" @click="delete_task(row.item)">Delete</b-button>
          </template>
          <template #cell(completely_done)="row">

            <input type="checkbox" id="mike" v-model="row.item.completely_done"  >
          </template>

        </b-table>
      </div>
    </div>
    <task-detail :id="selected_id" :insert_mode="modal_insert_mode" @callback="load_tasks"></task-detail>
  </div>
</template>

<script>
import taskDetail from "@/components/personal-todo/task-detail";
export default {
  name: "tasks",
  components:{taskDetail,
  },
  middleware:'auth',
  mounted() {
    this.load_tasks();
  },
  data() {
    return {
      fields: ['title', 'description', 'goal', 'start_date_time', 'repeat_type', 'completely_done', 'operations'],
      tasks: [],
      modal_insert_mode: true,
      selected_id: Number,

    }
  },
  methods:{
    async load_tasks() {
      try {
        let response = await this.$axios.get('endpoint/personal-to-dos/task/')
        if (response.status === 200) {
          this.tasks = response.data
        }
      } catch (e) {
        console.log(e)
      }
    },
    add() {
      this.selected_id = 0
      this.modal_insert_mode = true
      this.$bvModal.show('task-detail')
    },
    edit(goal) {
      this.selected_id = goal.pk
      this.modal_insert_mode = false
      this.$bvModal.show('task-detail')

    },
    async delete_task(goal) {
      try {
        let response = await this.$axios.delete('endpoint/personal-to-dos/task/' + goal.pk.toString() + "/"
        )
        if (response.status === 204) {
          await this.load_tasks()
        }
      } catch (err) {
        console.log(err)
      }
    },
  },


}
</script>

<style scoped>

</style>
