<template>
<v-col cols="12">
<v-row>
  <v-col cols="12">
    <v-data-table
      :headers="headers"
      :items="projectValueCreationStrategies"
        show-select
        single-select
        sort-by="description"
        class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Value Creation Strategies</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on"
                >Add VCS</v-btn
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
                      <v-text-field
                        v-model="editedItem.name"
                        label="Name"
                        hint="Name of the VCS"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-text-field
                        v-model="editedItem.description"
                        label="Description"
                        hint="About the VCS"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-text-field
                        v-model="editedItem.ranking"
                        label="Ranking"
                        hint="Ranking of the needs"
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
  <v-col cols="6">
    <v-card>
    <v-system-bar color="grey darken-2" dark>Value Drivers</v-system-bar>
        <v-card-text>
          <v-chip-group
            column
            active-class="primary--text"
          >
            <v-chip v-for="valueDriver in valueDrivers" :key="valueDriver.name" class="ma-2">{{ valueDriver.name }}</v-chip>
          </v-chip-group>
        </v-card-text>
    </v-card>
  </v-col>
</v-row>
</v-col>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: "vcs",
  display: "ValueCreationStrategies",
  order: 8,
  data: () => ({
    dialog: false,
    headers: [
      { text: "Name", value: "name" },
      { text: "Description", value: "description" },
      { text: "Ranking", value: "ranking" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
      description: "",
      ranking: "",
    },
    defaultItem: {
      name: "",
      description: "",
      ranking: "",
    },
    selectedVCS: null,
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add VCS" : "Edit VCS";
    },
    projectValueCreationStrategies(){
      return this.$store.getters.projectValueCreationStrategies;
    },
    ...mapState([
      'selectedProject',
      'valueDrivers'
    ])
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  methods: {

    editItem(item) {
      this.editedIndex = this.projectValueCreationStrategies.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.projectValueCreationStrategies.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.projectValueCreationStrategies.splice(index, 1);
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
        Object.assign(this.projectValueCreationStrategies[this.editedIndex], this.editedItem);
      } else {
        this.projectValueCreationStrategies.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
<style scoped></style>
