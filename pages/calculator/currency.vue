<template>
    <main class="calculator-page">
        <!-- <h1 class="calculator-page__title">Percentage Calculators</h1> -->
        <CurrencyCalculator />
        <!-- <HorizontalLargeAd /> -->
    </main>
</template>

<script setup>
// import HorizontalLargeAd from '~/components/ads/HorizontalLargeAd.vue';
import CurrencyCalculator from '~/components/calculators/currency/CurrencyCalculator.vue';

useHead({
    title: 'Currency Calculator - Easy Currency Conversion Tool',
    meta: [
        {
            name: 'description',
            content:
                'Free online currency calculator. Convert between different currencies with our easy-to-use currency conversion tool.',
        },
        {
            name: 'keywords',
            content:
                'currency calculator, currency converter, money converter, exchange rate calculator, currency conversion tool',
        },
        { property: 'og:title', content: 'Currency Calculator - Easy Currency Conversion Tool' },
        {
            property: 'og:description',
            content:
                'Free online currency calculator. Convert between different currencies with our easy-to-use currency conversion tool.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://numbercrunch.io/calculator/currency' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Currency Calculator - Easy Currency Conversion Tool' },
        {
            name: 'twitter:description',
            content:
                'Free online currency calculator. Convert between different currencies with our easy-to-use currency conversion tool.',
        },
    ],
    link: [{ rel: 'canonical', href: 'https://numbercrunch.io/calculator/currency' }],
});
</script>
