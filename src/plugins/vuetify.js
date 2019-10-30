import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import config from '../../config'
import no from 'vuetify/es5/locale/no'

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: { no },
    current: 'no'
  },
  theme: {
    themes: {
      light: config.colors,
      dark: config.colors
    }
  }
})
