// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    modules: ['@nuxtjs/tailwindcss', '@primevue/nuxt-module', '@nuxtjs/google-adsense'],
    css: ['@/assets/css/main.scss'],
    primevue: {
        importTheme: { from: '@/themes/mytheme.js' },
    },
    googleAdsense: {
        id: 'ca-pub-8907205065732865',
    },
});
