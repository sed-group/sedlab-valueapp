<template>
  <v-col cols="12">
    <v-data-table
      :headers="headers"
      :items="projectStakeholders"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Stakeholders</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on"
                >Add Stakeholder</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="8">
                      <v-select
                        v-model="editedItem.type"
                        :items="stakeholderTypes"
                        label="Type"
                        hint="In relation to the firm"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Name"
                        hint="Name of the individual"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-text-field
                        v-model="editedItem.organization"
                        label="Organization"
                        hint="Name of the organization that the individual represents"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-text-field
                        v-model="editedItem.role"
                        label="Role"
                        hint="Role of the the stakeholder"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-col>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: "stakeholders",
  display: "Stakeholders",
  order: 8,
  data: () => ({
    dialog: false,
    headers: [
      { text: "Type", align: "start", value: "type" },
      { text: "Name", value: "name" },
      { text: "Organization", value: "organization" },
      { text: "Role", value: "role" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    stakeholderTypes: ["Internal", "External"],
    editedIndex: -1,
    editedItem: {
      type: "",
      stakeholder: "",
      role: "",
    },
    defaultItem: {
      type: "",
      stakeholder: "",
      role: "",
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Stakeholder" : "Edit Stakeholder";
    },
    projectStakeholders(){
      return this.$store.getters.projectStakeholders;
    },
    ...mapState([
      'selectedProject',
    ])
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  methods: {

    editItem(item) {
      this.editedIndex = this.projectStakeholders.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.projectStakeholders.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.projectStakeholders.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.projectStakeholders[this.editedIndex], this.editedItem);
      } else {
        this.projectStakeholders.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
<style scoped></style>
