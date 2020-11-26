<template>
  <v-col cols="12">
    <v-data-table
      :headers="headers"
      :items="projectNeeds"
      sort-by="description"
      show-expand
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Needs</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on"
                >New Need</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <!-- <v-col cols="12" sm="6" md="8">
                      <v-select
                        v-model="editedItem.type"
                        :items="needTypes"
                        label="Type"
                        hint="In relation to the firm"
                      ></v-select>
                    </v-col> -->
                    <v-col cols="12" sm="6" md="8">
                      <v-select
                        v-model="editedItem.stakeholders"
                        :items="needTypes"
                        label="Stakeholders"
                        hint="Who has this need?"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-text-field
                        v-model="editedItem.needName"
                        label="Need name"
                        hint="Sucint name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-text-field
                        v-model="editedItem.description"
                        label="Description"
                        hint="Explanation/Definition of the need"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-text-field
                        v-model="editedItem.consequences"
                        label="Consequences"
                        hint="What are the concequences if we are not being able to satisfy this stakeholder need? Please explain"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-text-field
                        v-model="editedItem.examples"
                        label="Examples"
                        hint="Please give a concrete example"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-select
                        v-model="editedItem.engineeringAspects"
                        :items="valueDrivers"
                        item-text="name"
                        item-value="name"
                        :menu-props="{ maxHeight: '400' }"
                        label="Select"
                        multiple
                        hint="What engineering aspects impact this need - that you can control during design? Please write them, providing a unit of measurement between parenthesis"
                        persistent-hint
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-select
                        v-model="editedItem.processName"
                        :items="systemLifeCycleProcesses"
                        item-text="processName"
                        item-value="processName"
                        label="Phase"
                        hint="What life cycle process is affected?"
                      ></v-select>
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
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <p>Consequences: {{ item.consequences }}</p>
          <p>Examples: {{ item.examples }}</p>
          <p>Value Drivers:
            <v-chip-group
              column
              active-class="primary--text"
            >
              <v-chip v-for="valueDriver in item.valueDrivers" :key="valueDriver" class="ma-2">{{ valueDriver }}</v-chip>
            </v-chip-group>
          </p>
          <p>Stakeholders:
            <v-chip-group
              column
              active-class="primary--text"
            >
              <v-chip v-for="stakeholder in item.stakeholders" :key="stakeholder" class="ma-2">{{ stakeholder }}</v-chip>
            </v-chip-group>
          </p>
        </td>
      </template>
    </v-data-table>
  </v-col>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: "needs",
  display: "Needs",
  order: 8,
  components: {},
  data: () => ({
    dialog: false,
    headers: [
      //{ text: "Type", align: "start", value: "type" },
      //{ text: "Stakeholders", value: "stakeholders" },
      { text: "Need name", value: "needName" },
      { text: "Description", value: "description" },
      //{ text: "Consequences", value: "consequences" },
      //{ text: "Examples", value: "examples" },
      //{ text: "Engineering aspects", value: "engineeringAspects" },
      //{ text: "Phase", value: "processName" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    needTypes: ["internal", "external"],
    editedIndex: -1,
    editedItem: {
      type: "",
      stakeholder: "",
      description: "",
    },
    defaultItem: {
      type: "",
      stakeholder: "",
      description: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Need" : "Edit Need";
    },
    projectNeeds(){
      return this.$store.getters.projectNeeds;
    },
    ...mapState([
      'selectedProject',
      'systemLifeCycleProcesses',
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
      this.editedIndex = this.projectNeeds.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.projectNeeds.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.projectNeeds.splice(index, 1);
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
        Object.assign(this.projectNeeds[this.editedIndex], this.editedItem);
      } else {
        this.projectNeeds.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
<style scoped></style>
