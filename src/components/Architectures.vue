<template>
<v-col cols="12">
<v-row>
  <v-col cols="6">
    <v-data-table
      :headers="headers"
      :items="projectArchitectures"
      sort-by="description"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Architectures</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on"
                >Add Architecture</v-btn
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
                        hint="Name of the architecture"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-text-field
                        v-model="editedItem.description"
                        label="Description"
                        hint="About the architecture"
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
    <v-system-bar color="grey darken-2" dark>Visualization</v-system-bar>
        <v-card-text>
          <!-- <v-img :src="randomImage()"></v-img> -->
          <Scene />
        </v-card-text>
    </v-card>
  </v-col>
  <v-col cols="6">
    <v-card>
    <v-system-bar color="grey darken-2" dark>Function-Means Tree Hierarchy</v-system-bar>
        <v-card-text>
            <v-treeview
                v-model="tree"
                :open="open"
                :items="items"
                :active.sync="active"
                activatable
                return-object
                item-key="name"
                dense
            >
                <template v-slot:prepend="{ item, open }">
                <v-icon v-if="!item.itemType">
                    {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                </v-icon>
                <v-icon v-else>
                    {{ itemTypes[item.itemType] }}
                </v-icon>
                </template>
            </v-treeview>
        </v-card-text>
    </v-card>
  </v-col>
  <v-col cols="6" v-if="active.length>0">
    <v-card>
    <v-system-bar color="grey darken-2" dark>Selected element</v-system-bar>
      <v-card-text>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="active[0].name"
                  label="Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="active[0].description"
                  label="Description"
                  auto-grow
                ></v-textarea>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="active[0].size.x"
                  label="Length"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="active[0].size.y"
                  label="Width"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="active[0].size.z"
                  label="Height"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="active[0].position.x"
                  label="Pos. x"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="active[0].position.y"
                  label="Pos. y"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="active[0].position.z"
                  label="Pos. z"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-col>
</v-row>
</v-col>
</template>

<script>
import Scene from "./Scene";
import {mapState} from 'vuex';

export default {
  name: "architectures",
  display: "Architectures",
  order: 8,
  components: {
    Scene,
  },
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
    // Treeview
    active: [],
    open: ['Vehicle'],
    itemTypes: {
      car: 'mdi-car',
      truck: 'mdi-truck',
      fr: 'mdi-function',
      ds: 'mdi-puzzle',
    },
    tree: [],
    items: [
    {
        name: 'Vehicle',
        description: 'Automobile',
        id: 'vehicle',
        itemType: 'car',
        size: {
            x: 4953,
            y: 1776,
            z: 1923
        },
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        children: [
        {
            name: 'Head-Up Display',
            description: 'A transparent display that presents data without requiring users to look away from their usual viewpoints.',
            id: 'hud',
            itemType: 'ds',
            size: {
                x: 200,
                y: 200,
                z: 200
            },
            position: {
                x: 1150,
                y: 200,
                z: 0
            },
            children: [
                {
                    name: 'Show info to driver superimposed on their view of the road',
                    itemType: 'fr',
                    children: [
                        {
                            name: 'Transparent material on glass + 2D projection',
                            itemType: 'ds',
                            children: [
                                {
                                    name: 'Project picture',
                                    itemType: 'fr',
                                    children: [
                                        {
                                            name: 'Flat panel',
                                            itemType: 'ds',
                                        },
                                        {
                                            name: 'Projector',
                                            itemType: 'ds',
                                        },
                                        {
                                            name: 'Cathode Ray Tube',
                                            itemType: 'ds',
                                        },
                                    ],
                                },
                                {
                                    name: 'Reflect picture towards driver',
                                    itemType: 'fr',
                                    children: [
                                        {
                                            name: 'Windscreen',
                                            itemType: 'ds',
                                        },
                                        {
                                            name: 'Independent combiner',
                                            itemType: 'ds',
                                        },
                                        {
                                            name: 'Waveguide optics',
                                            itemType: 'ds',
                                        },
                                    ],
                                },
                                {
                                    name: 'Contain parts',
                                    itemType: 'fr',
                                    children: [
                                        {
                                            name: 'Case',
                                            itemType: 'ds',
                                            children: [
                                                {
                                                    name: 'Attach to car',
                                                    itemType: 'fr',
                                                    children: [
                                                        {
                                                            name: 'Attachment to CCB',
                                                            itemType: 'ds',
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    name: 'Reduce glare from the IP opening',
                                    itemType: 'fr',
                                    children: [
                                        {
                                            name: 'Glare trap',
                                            itemType: 'ds',
                                        },
                                    ],
                                },
                                {
                                    name: 'Output picture without letting dust in',
                                    itemType: 'fr',
                                    children: [
                                        {
                                            name: 'Transparent / Translucent cover',
                                            itemType: 'ds',
                                        },
                                    ],
                                },
                                {
                                    name: 'Reduce picture issues',
                                    itemType: 'fr',
                                    children: [
                                        {
                                            name: 'Circular polarizer',
                                            itemType: 'ds',
                                        },
                                    ],
                                },
                                {
                                    name: 'Collimate light',
                                    itemType: 'fr',
                                    children: [
                                        {
                                            name: 'Collimate by refraction',
                                            itemType: 'ds',
                                        },
                                        {
                                            name: 'Collimate by reflection',
                                            itemType: 'ds',
                                        },
                                        {
                                            name: 'Collimate by difraction',
                                            itemType: 'ds',
                                        },
                                    ],
                                },
                                {
                                    name: 'Receive information',
                                    itemType: 'fr',
                                    children: [
                                        {
                                            name: 'PCB',
                                            itemType: 'ds',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            name: 'Transparent screen',
                            itemType: 'ds',
                        },
                        {
                            name: 'Electroluminescent Display',
                            itemType: 'ds',
                        },
                    ],
                }
            ],
        },
        {
            name: 'Pedal Body',
            description: 'Body of the pedal.',
            id: 'pedalBody',
            itemType: 'ds',
            size: {
                x: 50,
                y: 50,
                z: 400
            },
            position: {
                x: 1075,
                y: 25,
                z: -200
            },
        },
        {
            name: 'Pedal Column Frame',
            description: 'Frame that holds the Pedal Column.',
            id: 'pedalColumnFrame',
            itemType: 'ds',
            size: {
                x: 300,
                y: 50,
                z: 400
            },
            position: {
                x: 1150,
                y: 75,
                z: -100
            },
        },
        {
            name: 'Cross Car Beam',
            description: 'A single cross strut in the vehicle interior that ensures that, in the event of a side impact, the passenger compartment is not compressed, as well as hold the steering wheel, the airbags, and the entire dashboard.',
            id: 'crossCarBeam',
            itemType: 'ds',
            size: {
                x: 1500,
                y: 50,
                z: 100
            },
            position: {
                x: 750,
                y: 325,
                z: 50
            },
        },
        {
            name: 'Heater',
            description: 'Heater element.',
            id: 'heater',
            itemType: 'ds',
            size: {
                x: 600,
                y: 200,
                z: 300
            },
            position: {
                x: 300,
                y: 200,
                z: -50
            },
        },
        {
            name: 'Body Structure',
            description: 'Structure fo the body of the car.',
            id: 'bodyStructure',
            itemType: 'ds',
            size: {
                x: 1500,
                y: 50,
                z: 100
            },
            position: {
                x: 750,
                y: 25,
                z: 50
            },
        },
        {
            name: 'Windshield',
            description: 'The front window of the car, which provides visibility while protecting occupants from the elements.',
            id: 'windScreen',
            itemType: 'ds',
            size: {
                x: 1400,
                y: 700,
                z: 5
            },
            position: {
                x: 700,
                y: 245.21,
                z: 200
            },
            rotation: {
              angle: 45,
              axis: {
                  x: 1,
                  y: 0,
                  z: 0
              },
            },
        },
        {
            name: 'Steering Column',
            description: 'A device intended primarily for connecting the steering wheel to the steering mechanism.',
            id: 'steeringColumn',
            itemType: 'ds',
            size: {
                x: 50,
                y: 50,
                z: 600
            },
            position: {
                x: 1175,
                y: 25,
                z: 0
            },
            rotation: {
              angle: 65,
              axis: {
                  x: -1,
                  y: 0,
                  z: 0
              },
            },
        },
        ],
    },
    ],
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Architecture" : "Edit Architecture";
    },
    projectArchitectures(){
      return this.$store.getters.projectArchitectures;
    },
    ...mapState([
      'selectedProject',
    ]),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  methods: {
    // randomImage() {
    //     const myImages = ['/giphy1.gif', '/giphy2.gif', '/giphy3.gif', '/giphy4.gif'];
    //     return myImages[Math.floor(Math.random() * myImages.length)];
    // },

    editItem(item) {
      this.editedIndex = this.projectArchitectures.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.projectArchitectures.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.projectArchitectures.splice(index, 1);
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
        Object.assign(this.projectArchitectures[this.editedIndex], this.editedItem);
      } else {
        this.projectArchitectures.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
<style scoped></style>
