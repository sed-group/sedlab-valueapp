<template>
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense nav>
        <template v-for="item in items">
          <v-list-item :key="item.title" link :to="item.to">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <!-- <v-divider></v-divider> -->
      </v-list>
    </v-navigation-drawer>
</template>


<script>

  export default {
    name: "Drawer",
    data: () => ({
      // Navigation Drawer
      items: [
        // {
        //   icon: "mdi-notebook",
        //   title: "Project",
        //   to: "/project"
        // },
        {
          icon: "mdi-contacts",
          title: "Stakeholders",
          to: "/stakeholders"
        },
        {
          icon: "mdi-content-copy",
          title: "Needs",
          to: "/needs"
        },
        {
          icon: "mdi-graph",
          title: "Architectures",
          to: "/architectures"
        },
        {
          icon: "mdi-finance",
          title: "Value Creation Strategies",
          to: "/vcs"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Analysis",
          to: "/analysis"
        },
      ],
    }),

    computed: {
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
    },
  };
</script>