import Vue from 'vue'
import Vuex from 'vuex'
import { vuexOidcCreateStoreModule } from 'vuex-oidc'
import pdf from 'vue-pdf'
import config from '../config'
import getData from './lib/get-data'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar: {
      active: false,
      message: false,
      type: false
    },
    students: [],
    student: {},
    loading: false,
    previewDialog: false,
    pdfFile: {
      numPages: false,
      data: false,
      fileId: false
    },
    pdfFileLoading: false
  },
  mutations: {
    SET_PDF_FILE: (state, payload) => {
      state.pdfFile = payload
    },
    SET_PDF_FILE_LOADING: (state, payload) => {
      state.pdfFileLoading = payload
    },
    SET_PREVIEW_DIALOG: (state, payload) => {
      state.previewDialog = payload
      if (!payload) state.pdfFile = false
    },
    SET_STUDENT_DIALOG: (state, payload) => {
      state.studentDialog = payload
      if (!payload) state.student = {}
    },
    SET_STUDENT: (state, payload) => {
      state.student = payload
    },
    SET_STUDENTS: (state, payload) => {
      state.students = payload
    },
    SET_LOADING: (state, payload) => {
      state.loading = payload
    },
    SET_SNACKBAR: (state, { msg, type = 'info' }) => {
      state.snackbar = {
        message: msg,
        type,
        active: true
      }
    }
  },
  actions: {
    GET_STUDENT: async (context, payload) => {
      try {
        context.commit('SET_LOADING', true)
        context.commit('SET_STUDENT', {})
        const { data } = await getData(`/students/${payload}`)
        context.commit('SET_STUDENT', data)
        context.commit('SET_LOADING', false)
      } catch (error) {
        context.commit('SET_SNACKBAR', { msg: error.message, type: 'error' })
        context.commit('SET_LOADING', false)
      }
    },
    GET_STUDENTS: async (context, payload) => {
      try {
        context.commit('SET_LOADING', true)
        const { data } = await getData('/students')
        context.commit('SET_STUDENTS', data)
        context.commit('SET_LOADING', false)
      } catch (error) {
        context.commit('SET_SNACKBAR', { msg: error.message, type: 'error' })
        context.commit('SET_LOADING', false)
      }
    },
    GENERATE_PREVIEW: async (context, payload) => {
      const base64toUint8 = pdfFile =>
        /* eslint-env browser */
        pdfFile ? new Uint8Array(atob(pdfFile).split('').map(c => c.charCodeAt(0))) : ''

      try {
        context.commit('SET_PDF_FILE_LOADING', true)
        const { file: fileId, recno, source } = payload
        const { data: { file: base64File } } = await getData(`/files/${source}/${fileId}/${recno}`)
        const pdfFile = base64toUint8(base64File)
        const { numPages } = await pdf.createLoadingTask(pdfFile)
        context.commit('SET_PDF_FILE', { data: pdfFile, numPages, fileId })
        context.commit('SET_PREVIEW_DIALOG', true)
        context.commit('SET_PDF_FILE_LOADING', false)
      } catch (error) {
        context.commit('SET_SNACKBAR', { msg: error.message, type: 'error' })
        context.commit('SET_PDF_FILE_LOADING', false)
      }
    }
  },
  modules: {
    oidcStore: vuexOidcCreateStoreModule(config.auth, { namespaced: true })
  }
})
