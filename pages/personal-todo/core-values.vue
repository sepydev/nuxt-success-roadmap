<template>
  <div>
    <div class="col-lg-8 offset-lg-2 row ">
      <h2>My Core Values</h2>
      <div>
        <b-button variant="primary" @click="add">Add new core value</b-button>
        <b-table :items="core_values" :fields="fields" striped responsive="sm">
          <template #cell(operations)="row">
            <b-button size="sm" @click="edit(row.item)">
              Edit
            </b-button>
            <b-button size="sm" @click="delete_core_value(row.item)" variant="danger">
              Delete
            </b-button>
          </template>
        </b-table>
      </div>
    </div>
    <core-value-detail
      :pk="selected_item.pk"
      :title="selected_item.title"
      :description="selected_item.description"
      :insert_mode="modal_insert_mode"
      @callback="load_core_values"
    />
  </div>
</template>

<script>
import CoreValueDetail from "@/components/personal-todo/core-value-detail";

export default {
  name: "index",
  components: {CoreValueDetail},
  middleware: "auth",
  mounted: function () {
    this.load_core_values()
  },
  data() {
    return {
      fields: ["title", "description", "operations"],
      core_values: [],
      selected_item: {
        pk: Number,
        title: String,
        description: String,
      },
      modal_insert_mode: true,
    }
  },
  methods: {
    edit(item) {
      this.selected_item.pk = item.pk
      this.selected_item.title = item.title
      this.selected_item.description = item.description
      this.modal_insert_mode = false
      this.$bvModal.show("modal-core-value")
    },
    add() {
      this.selected_item.pk = ""
      this.selected_item.title = ""
      this.selected_item.description = ""
      this.modal_insert_mode = true
      this.$bvModal.show("modal-core-value")
    },
    async delete_core_value(item) {
      try {
        let response = await this.$axios.delete('endpoint/personal-to-dos/core-value/' + item.pk.toString() + "/"
        )
        if (response.status === 204) {
          await this.load_core_values()
        }
      } catch (err) {
        console.log(err)
      }
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
  },
}
</script>

<style scoped>

</style>
