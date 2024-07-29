// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    modules: ['@nuxtjs/tailwindcss', '@primevue/nuxt-module'],
    css: ['@/assets/css/main.scss'],
    primevue: {
        importTheme: { from: '@/themes/mytheme.js' },
    },
    app: {
        head: {
            script: [
                {
                    hid: 'adsense',
                    src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
                    async: true,
                    'data-ad-client': '8907205065732865',
                },
            ],
        },
    },
});
