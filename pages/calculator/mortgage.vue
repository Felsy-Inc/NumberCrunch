<template>
    <main class="calculator-page">
        <!-- <h1 class="calculator-page__title">Percentage Calculators</h1> -->
        <MortgageCalculator />
        <!-- <HorizontalLargeAd /> -->
    </main>
</template>

<script setup>
// import HorizontalLargeAd from '~/components/ads/HorizontalLargeAd.vue';
import MortgageCalculator from '~/components/calculators/mortgage/MortgageCalculator.vue';

// Add meta information
useHead({
    title: 'Mortgage Calculator - Calculate Monthly Mortgage Payments',
    meta: [
        {
            name: 'description',
            content:
                'Free online mortgage calculator. Calculate your monthly mortgage payments, including principal and interest, based on loan amount, interest rate, and loan term.',
        },
        {
            name: 'keywords',
            content:
                'mortgage calculator, home loan calculator, monthly mortgage payment, mortgage payment calculator, loan calculator',
        },
        {
            property: 'og:title',
            content: 'Mortgage Calculator - Calculate Monthly Mortgage Payments',
        },
        {
            property: 'og:description',
            content:
                'Free online mortgage calculator. Calculate your monthly mortgage payments, including principal and interest, based on loan amount, interest rate, and loan term.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://numbercrunch.io/calculator/mortgage' },
        { name: 'twitter:card', content: 'summary' },
        {
            name: 'twitter:title',
            content: 'Mortgage Calculator - Calculate Monthly Mortgage Payments',
        },
        {
            name: 'twitter:description',
            content:
                'Free online mortgage calculator. Calculate your monthly mortgage payments based on loan amount, interest rate, and term.',
        },
    ],
    link: [{ rel: 'canonical', href: 'https://numbercrunch.io/calculator/mortgage' }],
});
</script>
