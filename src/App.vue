<template>
  <v-app>

    <!-- Toolbar -->
    <Toolbar></Toolbar>

    <!-- Content -->
    <v-content>
      <router-view />
    </v-content>

    <!-- Footer -->
    <Footer>
    </Footer>

    <!-- Snackbar -->
    <v-snackbar
      v-model="snackbar.active"
      :color="snackbar.type === 'error' ? 'error' : 'primary'"
      :bottom="true"
    >
      {{snackbar.message}}
    </v-snackbar>

  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Toolbar from './components/Toolbar'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Footer,
    Toolbar
  },
  computed: {
    ...mapGetters('oidcStore', ['oidcIsAuthenticated']),
    ...mapState(['snackbar'])
  }
}
</script>

<style>
#app {
  font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
}
.v-application .headline {
  font-family: "Nunito", Helvetica, Arial, sans-serif !important;
}
.v-data-table tbody tr.expanded.expanded__content {
  -webkit-box-shadow: none;
  box-shadow: none;
}
tr td:first-child {
  border-left: 8px transparent solid;
}
tr:hover td:first-child {
  border-left: 8px #005260 solid;
}
tr:hover {
  cursor: pointer;
}
#app p a {
  color: black;
}
html {
  overflow: auto;
}
</style>
