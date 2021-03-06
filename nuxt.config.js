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
    script: [
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  globals: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
    {src: '~/plugins/user_methods' } ,
    '~/plugins/validators',
    '~/plugins/field-value-suggestion',
    { src: '~/plugins/slide-menu', ssr: false },
  ],

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
  bootstrapVue: {
    icons: true,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://localhost:8000',
    // proxy: true,


  },
  // proxy: {
  //   "/endpoint": {
  //     target: 'http://localhost:8000' ,
  //     pathRewrite: {"^/endpoint": ''},
  //   },
  //   "/personal-to-dos/media/images": {
  //     target: 'http://localhost:8000' ,
  //     pathRewrite: {"^/images": "/images"},
  //   },
  //
  // },

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
        //     name: 'XSRF-TOKEN',
        //   },
        // },
        endpoints: {
          login: {url: '/accounts/api/login/', method: 'post'},
          logout: {url: '/accounts/api/logout/', method: 'post'},
          user: {url: '/accounts/api/user/', method: 'get'}
        }
      }
    }

  },
  loading: {
    continuous: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: ['vue-burger-menu'],
  }
}
