export default defineNuxtConfig({
    app: {
        head: {
            htmlAttrs: {
                lang: 'ru'
            },
            title: 'Здоровье в школе',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Система для отслеживания здоровья учащихся школы'
                }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
                {
                    rel: 'preload',
                    href: '/fonts/Rubik-Regular.woff2',
                    as: 'font',
                    type: 'font/woff2',
                    crossorigin: 'anonymous'
                }
            ]
        },

        pageTransition: { name: 'page', mode: 'out-in' }
    },

    css: [
        'primevue/resources/themes/lara-light-indigo/theme.css',
        'primevue/resources/primevue.css',
        'primeicons/primeicons.css',
        'primeflex/primeflex.css',

        'assets/css/rubik.fontface.css',
        'assets/css/dark-theme.css',
        'assets/css/main.css'
    ],

    modules: ['@nuxt/image', '@nuxt/devtools', '@pinia/nuxt', 'nuxt-lodash', '@nuxtjs/color-mode'],

    vite: {
        resolve: {
            alias: { '.prisma/client/index-browser': './node_modules/.prisma/client/index-browser.js' }
        }
    },

    nitro: {
        experimental: { openAPI: true }
    },

    build: {
        transpile: ['primevue']
    }
})
