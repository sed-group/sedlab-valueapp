<template>
<!--     <v-col cols="12">

      <v-item-group active-class="primary">
        <v-container>
          <v-row>
            <v-col
              v-for="project in projects"
              :key="project.name"
              cols="12"
              md="4"
            >
              <v-item>
                <v-card>
                  <v-card-title class="headline">{{ project.name }}</v-card-title>
                  <v-card-subtitle>{{ project.description }}</v-card-subtitle>
                  <v-card-actions>
                    <v-btn text>Edit</v-btn>
                    <v-btn text color="error">Delete</v-btn>
                  </v-card-actions>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
      <v-btn
        absolute
        dark
        fab
        bottom
        right
        color="primary"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-col> -->

      <v-data-table
        :headers="headers"
        :items="projects"
        show-select
        single-select
        sort-by="description"
        class="elevation-1"
        @item-selected="setSelectedProject"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Projects</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on"
                  >Add Project</v-btn
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
                          hint="Name of the project"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="8">
                        <v-text-field
                          v-model="editedItem.description"
                          label="Description"
                          hint="About the project"
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

</template>

<script>
import {mapState, mapMutations} from 'vuex';

export default {
  name: "projects",
  display: "Projects",
  data: () => ({
    dialog: false,
    headers: [
      { text: "Name", value: "name" },
      { text: "Description", value: "description" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
      description: "",
    },
    defaultItem: {
      name: "",
      description: "",
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Project" : "Edit Project";
    },
    ...mapState([
      'projects',
      'selectedProject'
    ])
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  methods: {
      ...mapMutations({
        setSelectedProject: 'SET_SELECTED_PROJECT',
      }),

    editItem(item) {
      this.editedIndex = this.projects.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.projects.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.projects.splice(index, 1);
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
        Object.assign(this.projects[this.editedIndex], this.editedItem);
      } else {
        this.projects.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
<style scoped></style>
