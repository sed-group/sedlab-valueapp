<template>
  <v-dialog
    v-model="dialogSelectProject"
    width="900"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
      icon
      v-bind="attrs"
      v-on="on"
      >
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </template>
    <Projects />
  </v-dialog>
</template>

<script>
  import Projects from "../Projects";
  import { mapState, mapMutations } from 'vuex';

  export default {
    name: "SelectProject",
    components: {
      Projects
    },
    data: () => ({
        dialogSelectProject: true,
    }),
    computed: {
      ...mapState([
        'selectedProject',
      ])
    },
    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
    },
  };
</script>