<template>
  <v-app-bar
    color="secondary"
    app
  >

    <!-- App Icon -->
    <v-btn icon x-large color="secondary" class="hidden-xs-only mr-3">
      <v-img alt="logo" src="/apple-touch-icon.png" max-height="40" max-width="40">
      </v-img>
    </v-btn>

    <!-- App text and description -->
    <router-link to="/">
      <v-toolbar-title>Elevmappa</v-toolbar-title>
    </router-link>

    <div class="flex-grow-1"></div>

    <div v-if="oidcIsAuthenticated">
      <!-- Home button -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <router-link to="/">
            <v-btn icon v-on="on">
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </router-link>
        </template>
        <span>Hjem</span>
      </v-tooltip>

      <!-- Help button -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <router-link to="/help">
            <v-btn icon v-on="on">
              <v-icon>mdi-help-circle</v-icon>
            </v-btn>
          </router-link>
        </template>
        <span>Hjelp</span>
      </v-tooltip>

      <!-- Account button -->
      <v-menu min-width="200">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list class="pa-3" flat>
            <v-list-item-group color="secondary">

              <v-list-item>
                <v-list-item-icon>
                  <v-avatar>
                    <!-- <v-img v-if="oidcUser && oidcUser.picture"
                      :src="Array.isArray(oidcUser.picture) ? oidcUser.picture[0] : oidcUser.picture"></v-img> -->
                    <v-icon large>mdi-account-circle</v-icon>
                  </v-avatar>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ oidcUser.name || 'demouser' }}</v-list-item-title>
                  <v-list-item-subtitle>{{ oidcUser.email || 'demomail' }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <router-link to="/settings">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-settings</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Innstillinger</v-list-item-title>
                </v-list-item>
              </router-link>

              <v-list-item @click="removeUser">
                <v-list-item-icon>
                  <v-icon color="red">mdi-power</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Logg ut</v-list-item-title>
              </v-list-item>

            </v-list-item-group>
          </v-list>
        </v-card>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Toolbar',
  methods: {
    ...mapActions('oidcStore', ['signOutOidc', 'removeUser'])
  },
  computed: {
    ...mapGetters('oidcStore', ['oidcIsAuthenticated', 'oidcUser'])
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: unset !important;
}
</style>
