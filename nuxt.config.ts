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
    runtimeConfig: {
        public: {
            exchangeRateApiKey: process.env.EXCHANGE_RATE_API_KEY,
        },
    },
    app: {
        head: {
            title: 'NumberCrunch - Free Online Calculator Tools',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                {
                    name: 'description',
                    content:
                        'Access a comprehensive collection of free online calculators for various mathematical, financial, and conversion needs. Simple, fast, and accurate calculations.',
                },
                {
                    name: 'keywords',
                    content:
                        'online calculators, math tools, financial calculators, conversion tools, free calculators',
                },
                { property: 'og:site_name', content: 'NumberCrunch' },
                { property: 'og:type', content: 'website' },
                { property: 'og:title', content: 'NumberCrunch - Free Online Calculator Tools' },
                {
                    property: 'og:description',
                    content:
                        'Access a comprehensive collection of free online calculators for various mathematical, financial, and conversion needs.',
                },
                { property: 'og:url', content: 'https://numbercrunch.io' },
                { name: 'twitter:card', content: 'summary' },
                { name: 'twitter:title', content: 'NumberCrunch - Free Online Calculator Tools' },
                {
                    name: 'twitter:description',
                    content:
                        'Access a comprehensive collection of free online calculators for various mathematical and financial needs.',
                },
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
                { rel: 'canonical', href: 'https://numbercrunch.io' },
            ],
            script: [
                {
                    type: 'application/ld+json',
                    innerHTML: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@graph': [
                            {
                                '@type': 'WebSite',
                                '@id': 'https://numbercrunch.io/#website',
                                url: 'https://numbercrunch.io',
                                name: 'NumberCrunch',
                                description: 'Free Online Calculator Tools',
                                potentialAction: {
                                    '@type': 'SearchAction',
                                    target: 'https://numbercrunch.io/?s={search_term_string}',
                                    'query-input': 'required name=search_term_string',
                                },
                            },
                            {
                                '@type': 'Organization',
                                '@id': 'https://numbercrunch.io/#organization',
                                name: 'NumberCrunch',
                                url: 'https://numbercrunch.io',
                                description:
                                    'Access a comprehensive collection of free online calculators for various mathematical, financial, and conversion needs.',
                            },
                        ],
                    }),
                },
            ],
        },
    },
});
