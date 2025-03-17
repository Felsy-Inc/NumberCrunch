<template>
    <main class="calculator-page">
        <!-- <h1 class="calculator-page__title">Percentage Calculators</h1> -->
        <LoanCalculator />
        <!-- <HorizontalLargeAd /> -->
    </main>
</template>

<script setup>
// import HorizontalLargeAd from '~/components/ads/HorizontalLargeAd.vue';
import LoanCalculator from '~/components/calculators/loan/LoanCalculator.vue';

// Add meta information
useHead({
    title: 'Loan Calculator - Calculate Loan Payments & Interest',
    meta: [
        {
            name: 'description',
            content:
                'Calculate loan payments, interest, and amortization schedule with our easy-to-use loan calculator. Get accurate monthly payment estimates for mortgages, personal loans, and more.',
        },
        {
            name: 'keywords',
            content:
                'loan calculator, mortgage calculator, loan payment calculator, amortization calculator, loan interest calculator',
        },
        { property: 'og:title', content: 'Loan Calculator - Calculate Loan Payments & Interest' },
        {
            property: 'og:description',
            content:
                'Calculate loan payments, interest, and amortization schedule with our easy-to-use loan calculator. Get accurate monthly payment estimates for mortgages, personal loans, and more.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://numbercrunch.io/calculator/loan' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Loan Calculator - Calculate Loan Payments & Interest' },
        {
            name: 'twitter:description',
            content:
                'Calculate loan payments, interest, and amortization schedule with our easy-to-use loan calculator.',
        },
    ],
    link: [{ rel: 'canonical', href: 'https://numbercrunch.io/calculator/loan' }],
});
</script>
