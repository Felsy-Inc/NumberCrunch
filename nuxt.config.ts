// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/tailwindcss',
        '@primevue/nuxt-module',
        [
            '@pinia/nuxt',
            {
                autoImports: ['defineStore', 'storeToRefs', 'acceptHMRUpdate'],
            },
        ],
        // '@nuxtjs/google-adsense'
    ],
    imports: {
        dirs: ['stores'],
    },
    css: ['@/assets/scss/main.scss'],
    primevue: {
        importTheme: { from: '@/themes/mytheme.js' },
    },
    // googleAdsense: {
    //     id: 'ca-pub-8907205065732865',
    // },
});
