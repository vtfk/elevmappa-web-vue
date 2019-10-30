<template>
  <div>

    <!-- PDF view -->
    <div :style="'width:' + zoom + '%'" ref="pdfview" class="wrapper" :class='{"zoom-active": zoom > 100 }'>
      <pdf
        v-for="i in pdfFile.numPages"
        style="height: vh; width: 100vw"
        :src="pdfFile.data"
        :page="i"
        :key="i"
        @page-loaded="currentPage = $event"
      ></pdf>
    </div>

    <!-- Action buttons -->
    <v-snackbar bottom right :timeout="0" value="true" class="transparent-snack">
      <span>

        <!-- Zoom in -->
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="{ on }" @click='zoom += 20' style="padding: 0; margin-right: 10px;" text icon>
              <v-icon>mdi-magnify-plus</v-icon>
            </v-btn>
          </template>
          <span>Zoom in</span>
        </v-tooltip>

        <!-- Zoom out -->
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="{ on }" @click='zoom -= 20' style="padding: 0; margin-right: 10px" text icon>
              <v-icon>mdi-magnify-minus</v-icon>
            </v-btn>
          </template>
          <span>Zoom ut</span>
        </v-tooltip>

      </span>
    </v-snackbar>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
import { mapState } from 'vuex'

export default {
  data: () => ({
    zoom: 100
  }),
  methods: {
    handleKey ({ keyCode }) {
      if (keyCode === 187) this.zoom += 20
      if (keyCode === 189) this.zoom -= 20
      if (keyCode === 48) this.zoom = 100
    }
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.handleKey)
  },
  created () {
    window.addEventListener('keydown', this.handleKey)
  },
  components: {
    pdf
  },
  computed: mapState(['pdfFile'])
}
</script>

<style>
.wrapper {
  -webkit-overflow-scrolling: touch;
  -moz-overflow-scrolling: touch;
  -ms-overflow-scrolling: touch;
  overflow-scrolling: touch;
  overflow: auto;
}
.transparent-snack {
  opacity: 0.5;
  padding: 0;
}
.transparent-snack .v-snack__wrapper {
  min-width: unset;
}
.transparent-snack .v-snack__content {
  padding: unset;
}
.transparent-snack .v-snack__content .v-btn:first-of-type {
  margin-left: 10px;
}
</style>
