<template>
  <div>
    <div class="col-lg-8 offset-lg-2 row">
      <h2>
        To do List
      </h2>
      <div>
        <b-table :fields="fields" :items="to_dos">
          <template #cell(operations)="row">
            <b-button size="sm" @click="edit(row.item)">Complete</b-button>
          </template>
          <template #cell(done_today)="row">

            <input type="checkbox" id="mike" v-model="row.item.done_today">
          </template>

        </b-table>
      </div>
    </div>
    <to-do-detail :task_id="selected_id" :date="filter_date" @callback="load_to_dos"></to-do-detail>
  </div>
</template>

<script>
import toDoDetail from "@/components/personal-todo/to-do-detail";
export default {
  name: "to-do-list",
  middleware: 'auth',
  components:{toDoDetail},
  mounted() {
    this.load_to_dos();
  },
  data() {
    return {
      fields: ['title', 'description', 'goal', 'done_today', 'operations'],
      to_dos: [],
      selected_id: Number,
      filter_date: new Date()

    }
  },
  methods: {
    async load_to_dos() {
      try {
        let date = Intl.DateTimeFormat(
          "fr-CA", {year: "numeric", month: "2-digit", day: "2-digit"}
        ).format(this.filter_date)
        console.log(date)

        let response = await this.$axios.get(
          'endpoint/personal-to-dos/to-do-list/?date=' + date)
        if (response.status === 200) {
          this.to_dos = response.data
        }
      } catch (e) {
        console.log(e)
      }
    },

    edit(task) {
      this.selected_id = task.task_id
      this.$bvModal.show('to-do-detail')
    },


  },
}
</script>

<style scoped>

</style>
