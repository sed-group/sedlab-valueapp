<template>
    <v-col cols="12">
      <v-card v-if="selectedProject.value">
    <v-toolbar
      color="grey"
      dark
      flat
    >
          <v-toolbar-title>{{ selectedProject.item.name }}</v-toolbar-title>
          <template v-slot:extension>
            <v-tabs
              v-model="tab"
              background-color="transparent"
              icons-and-text
              grow
            >
              <v-tab>Stakeholders<v-icon>mdi-contacts</v-icon></v-tab>
              <v-tab>Needs<v-icon>mdi-content-copy</v-icon></v-tab>
              <v-tab>Architectures<v-icon>mdi-graph</v-icon></v-tab>
              <v-tab>VCS<v-icon>mdi-finance</v-icon></v-tab>
              <v-tab>Analysis<v-icon>mdi-chart-bubble</v-icon></v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
        <v-card-text>
          <v-tabs-items v-model="tab">
            <v-tab-item><Stakeholders /></v-tab-item>
            <v-tab-item><Needs /></v-tab-item>
            <v-tab-item><Architectures /></v-tab-item>
            <v-tab-item><ValueCreationStrategies /></v-tab-item>
            <v-tab-item><Analysis /></v-tab-item>
          </v-tabs-items>

        </v-card-text>
        <v-card-actions>
          <SelectProject />
        </v-card-actions>
      </v-card>
    </v-col>
</template>


<script>
  import SelectProject from "./core/SelectProject";
  import Stakeholders from "./Stakeholders";
  import Needs from "./Needs";
  import Architectures from "./Architectures";
  import ValueCreationStrategies from "./ValueCreationStrategies";
  import Analysis from "./Analysis";
  import {
    mapState
  } from 'vuex';

  export default {
    name: "Project",
    components: {
      SelectProject,
      Stakeholders,
      Needs,
      Architectures,
      ValueCreationStrategies,
      Analysis,
    },
    data: () => ({
      tab: null,
      items: [
        'Stakeholders', 'Needs', 'Architectures', 'VCS', 'Analysis',
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }),
    computed: {
      ...mapState([
        'selectedProject'
      ])
    },
  };
</script>