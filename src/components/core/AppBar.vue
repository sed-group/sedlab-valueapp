<template>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app>
      <!-- Hamburger for the Drawer -->
      <v-app-bar-nav-icon @click.stop="setDrawer(!drawer)"></v-app-bar-nav-icon>
      <!-- Title -->
      <router-link to="/" class="toolbar-title">
        <v-toolbar-title class="headline text-uppercase">
            <span>SED</span>
            <span class="font-weight-light">Lab </span>
            <span>VALUE</span>
            <span class="font-weight-light">APP</span>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <span v-if="selectedProject.value">Project: {{ selectedProject.item.name }}</span>
      <v-spacer></v-spacer>
      <!-- Items -->
      <v-toolbar-items>
        <!-- Project selector -->
        <SelectProject />
        <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            ><v-icon>mdi-help-circle</v-icon></v-btn>
        </template>
        <span>No help available yet :(</span>
        </v-tooltip>
        <v-btn
          href="https://sedlab-catalog.netlify.app/"
          target="_blank"
          text
        >
          <span class="mr-2">SEDLab</span>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
</template>

<script>
  import SelectProject from "./SelectProject";
  import { mapState, mapMutations } from 'vuex';

  export default {
    name: "AppBar",
    components: {
      SelectProject,
    },
    data: () => ({
    }),
    computed: {
      ...mapState([
        'selectedProject',
        'drawer'
      ])
    },
    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
    },
  };
</script>
<style>
a.toolbar-title {
  color: rgba(0, 0, 0, 0.87);
  text-decoration: none;
}
</style>