<template>
  <v-container
    color="background"
    v-if="oidcIsAuthenticated"
  >
    <v-layout>
      <v-flex>
        <v-card>

          <v-card-title primary-title>
            <h3 class="headline">{{ loading ? 'Laster ...' : student.fullName }}</h3>
          </v-card-title>

          <v-card-text>

            <!--
              Case and student info
              Fødselsnummer: {{ student.personalIdNumber }}<br/>
              Mobilnr: {{ student.mobilePhone }} <br/>
              E-post: {{ student.mail }} <br/>
              Klasse: {{ student.mainGroupName }}<br/><br/>
            -->

            <!-- Search -->
            <v-flex class="text-xs-right mb-8">
              <v-text-field
                v-model="search"
                prepend-icon="mdi-magnify"
                label="Søk i dokumentittel"
                single-line
                hide-details
                autofocus
                color="primary"
                clearable
              ></v-text-field>
            </v-flex>

            <!-- Student document table -->
            <v-data-table
              must-sort
              color="secondary"
              @click:row="row => expandToggle(row)"
              hide-default-footer
              :headers="headers"
              :items="student.documents"
              :search="search"
              :loading="loading"
              loading-text="Laster dokumenter..."
              no-data-text="Ingen dokumenter funnet"
              :sort-by="pagination.sortBy"
              :page.sync="pagination.page"
              :expanded.sync="expanded"
              show-expand
              single-expand
              sort-desc
            >
              <!-- Expanded table -->
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  <v-card flat tile>
                    <v-card-text :key="file.recno" v-for="file in item.files" style="color: black !important">
                      <b>Dato</b>: {{ file.date || 'Ukjent' }}<br/>
                      <b>Fra</b>: {{ file.from || 'Ukjent' }}<br/>
                      <b>Til</b>: {{ file.to || 'Ukjent' }}<br/>
                      <v-divider style="margin-bottom: 10px"></v-divider>
                      <span @click="GENERATE_PREVIEW({ ...file, source: item.source, studentId: student.userName })">
                        <v-progress-circular
                          v-if="pdfFileLoading === file.recno"
                          size="16"
                          width="3"
                          indeterminate
                          color="accent"
                        ></v-progress-circular>
                        <v-icon
                          v-else
                          style="height: 16px"
                        >
                        mdi-attachment
                        </v-icon> {{ item.title }}
                      </span>
                    </v-card-text>
                  </v-card>
                </td>
              </template>

              <v-alert slot="no-data" dark :value="true" v-if="loading !== true" color="error" icon="mdi-alert">
                Du har ikke tilgang til denne eleven. <br/>
                Ta kontakt med administrativt personale på din skole dersom du mener dette er en feil.
              </v-alert>

              <v-alert slot="no-results" dark :value="true" color="error" icon="mdi-alert">
                Ditt søk etter "{{ search }}" fikk ingen resultater.<br/>
                Finner du ikke det du leter etter, ta kontakt med administrativt personale på din skole.
              </v-alert>

            </v-data-table>

            <!-- Table pagination -->
            <div class="text-xs-center pt-2">
              <v-pagination
                v-model="pagination.page"
                circle
                color="primary"
                :total-visible="7"
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
                :length="student && student.documents ? Math.round(student.documents.length / pagination.rowsPerPage) : 0"
              ></v-pagination>
            </div>

          </v-card-text>

        </v-card>
      </v-flex>
    </v-layout>
    <PreviewDialog></PreviewDialog>
  </v-container>
</template>

<script>
import PreviewDialog from '../components/PreviewDialog'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Documents',
  data: () => ({
    expanded: [],
    search: '',
    headers: [
      {
        text: '',
        value: 'data-table-expand'
      },
      {
        text: 'Dok. nr.',
        sortable: true,
        value: 'docId',
        sort: (a, b) => Number(a.match(/\d/g).join('')) > Number(b.match(/\d/g).join('')) ? -1 : 1,
        hide: true
      },
      {
        text: 'Tittel',
        sortable: false,
        value: 'title'
      }
    ],
    pagination: {
      rowsPerPage: 8,
      sortBy: 'sortId',
      page: 1
    }
  }),
  methods: {
    ...mapActions(['GENERATE_PREVIEW']),
    expandToggle (row) {
      if (this.expanded.length > 0) {
        this.expanded = []
      } else {
        this.expanded.push(row)
      }
    }
  },
  created () {
    this.$store.dispatch('GET_STUDENT', this.$route.params.id)
  },
  computed: {
    ...mapState([
      'student',
      'loading',
      'pdfFileLoading'
    ]),
    ...mapGetters('oidcStore', ['oidcIsAuthenticated'])
  },
  components: {
    PreviewDialog
  }
}
</script>

<style>
.v-data-table__expanded__content {
  box-shadow: unset !important;
  -webkit-box-shadow: unset !important;
  border-left: 8px #005260 solid;
}

.v-data-table__expanded__content td {
  border-left: 8px #005260 solid !important;
}
</style>
