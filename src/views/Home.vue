<template>
  <v-container
    color="background"
    v-if="oidcIsAuthenticated"
  >
    <v-layout>
      <v-flex>

        <!-- Search -->
        <v-flex class="text-xs-right mb-8">
          <v-text-field
            v-model="search"
            prepend-icon="mdi-magnify"
            label="Søk etter elev eller klasse"
            single-line
            hide-details
            autofocus
            color="primary"
            clearable
          ></v-text-field>
        </v-flex>

        <!-- Student table -->
        <v-data-table
          color="secondary"
          hide-default-footer
          :headers="headers"
          :items="students"
          :search="search"
          :loading="loading"
          :items-per-page="pagination.rowsPerPage"
          :sort-by="pagination.sortBy"
          :page.sync="pagination.page"
          :expanded.sync="expanded"
          item-key="uid"
          loading-text="Laster elever..."
          no-data-text="Ingen elever funnet"
        >

          <template v-slot:item="{ item }">
            <router-link tag="tr" :to="{ name: 'view', params: { id: item.userName }}">
              <td>{{ item.fullName }}</td>
              <td>{{ item.mainGroupName }}</td>
            </router-link>
          </template>

          <v-alert slot="no-data" dark :value="true" v-if="loading !== true" color="error" icon="mdi-alert">
            Du har ikke tilgang til noen elever. Ta kontakt med administrativt personale på din skole.
          </v-alert>

          <v-alert slot="no-results" dark :value="true" color="error" icon="mdi-alert">
            Ditt søk etter "{{ search }}" fikk ingen resultater.<br/>
            Finner du ikke eleven du leter etter, ta kontakt med den som er ansvarlig for Extens eller administrativt personale på din skole.
          </v-alert>
        </v-data-table>

        <!-- pagination -->
        <div v-if="students.length > 0" class="text-xs-center pt-2">
          <v-pagination
            v-model="pagination.page"
            circle
            color="primary"
            :total-visible="7"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            :length="Math.round(students.length / pagination.rowsPerPage)"
          ></v-pagination>
        </div>

      </v-flex>
    </v-layout>
  </v-container>
  <SignedOut v-else>
  </SignedOut>
</template>

<script>
import SignedOut from '../components/SignedOut'
import { mapState, mapGetters } from 'vuex'

const headers = [
  {
    text: 'Navn',
    sortable: true,
    value: 'fullName'
  },
  {
    text: 'Klasse',
    sortable: true,
    value: 'mainGroupName'
  }
]

export default {
  name: 'Home',
  data: () => ({
    search: '',
    headers,
    expanded: [],
    pagination: {
      rowsPerPage: 8,
      sortBy: 'fullName',
      page: 1
    }
  }),
  methods: {
  },
  created () {
    this.$store.dispatch('GET_STUDENTS')
  },
  computed: {
    ...mapState([
      'students',
      'loading'
    ]),
    ...mapGetters('oidcStore', ['oidcIsAuthenticated'])
  },
  components: {
    SignedOut
  }
}
</script>

<style scoped>
tr:hover {
  cursor: pointer;
}
</style>
