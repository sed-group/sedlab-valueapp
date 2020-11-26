<template>
  <v-app>

    <AppBar />

    <Drawer />

    <MainView />

  </v-app>
</template>

<script>
  import AppBar from "./core/AppBar";
  import Drawer from "./core/Drawer";
  import MainView from "./core/MainView";
  import {
    mapState
  } from 'vuex';

  export default {
    name: "Index",
    components: {
      AppBar,
      Drawer,
      MainView,
    },
    data: () => ({
    }),
    computed: {
      ...mapState([
        'projects',
      ])
    },
    mounted() {
      this.$store.dispatch('loadProjects')
    }
  };
</script>