/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import '@/styles/main.scss'
import 'vuetify/styles'
import {VFileUpload} from 'vuetify/labs/VFileUpload'
// Composables
import {createVuetify} from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'dark',

    themes: {
      light: {
        colors: {
          background: '#ededed',
          surface: '#f2f2f2',
          'surface-dim': '#e2e2e2',
          'surface-bright': '#f2f2f2',
          'on-surface': '#151515',
          outline: '#67625d',
          'outline-variant': '#d9d7d5',
          primary: '#44712e',
          'on-primary': '#d7ebc9',
          secondary: '#928800',
          'on-secondary': '#fff3b5',
          tertiary: '#00825f',
          'on-tertiary': '#bdfbdd',
          error: '#c01e1e',
          'on-error': '#fed8d9',
          'surface-light': '#eaeaea',
        },
        dark: false,
        variables: {
          'overlay-background': '#191715',
        },
      },
      dark: {
        colors: {
          background: '#181818',
          surface: '#0a0a0a',
          'surface-dim': '#0a0a0a',
          'surface-bright': '#2b2b2b',
          'on-surface': '#e7e7e7',
          outline: '#8b8480',
          'outline-variant': '#3c3834',
          primary: '#9dcd7d',
          'on-primary': '#2f4824',
          secondary: '#ffe84e',
          'on-secondary': '#6d6801',
          tertiary: '#5cecb5',
          'on-tertiary': '#015e46',
          error: '#fc9b9b',
          'on-error': '#891c1c',
          'surface-light': '#2b2b2b',
        },
        dark: true,
        variables: {
          'overlay-background': '#191715',
        },

      },
    },
  },
  defaults: {
    VContainer: {
      maxWidth: '1200px',
    }

  },
  components: {
    VFileUpload,
  },
})
