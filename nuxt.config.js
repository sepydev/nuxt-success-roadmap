export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'success-roadmap %s',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  globals: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/auth-next',
  //  My modules


  ],


  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // baseURL: 'http://127.0.0.1:8000/',
    proxy: true
  },
  proxy: {
    '/endpoint': {
      target: 'http://127.0.0.1:8000/',
      pathRewrite: {'^/endpoint': ''},
      changeOrigin: true
    }
  },

  auth: {
    redirect: {
      login: '/account/login',
      logout: '/',
      home: '/',
    },
    strategies: {

      local: {
        token: {
          property: 'key',
          global: true,
          required: true,
          type: 'token'
        },
        user: {
          property: '',
          autoFetch: true
        },
        // cookie: {
        //   cookie: {
        //     // (optional) If set, we check this cookie existence for loggedIn check
        //     name: 'csrftoken',
        //   },
        // },
        endpoints: {
          login: {url: '/endpoint/accounts/api/login/', method: 'post'  },
          logout: {url: '/endpoint/accounts/api/logout/', method: 'post'},
          user: {url: '/endpoint/accounts/api/user/', method: 'get' }
        }
      }
    }

  },
  loading: {
    continuous: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
