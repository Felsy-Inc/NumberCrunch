<template>
    <main class="calculator-page">
        <!-- <h1 class="calculator-page__title">Percentage Calculators</h1> -->
        <BasicMathCalculator />
        <!-- <HorizontalLargeAd /> -->
    </main>
</template>

<script setup>
// import HorizontalLargeAd from '~/components/ads/HorizontalLargeAd.vue';
import BasicMathCalculator from '~/components/calculators/basic-math/BasicMathCalculator.vue';

useHead({
    title: 'Basic Math Calculator - Simple Online Calculator for Math Operations',
    meta: [
        {
            name: 'description',
            content:
                'Free online basic math calculator for addition, subtraction, multiplication, and division. Simple, fast, and easy-to-use calculator for everyday calculations.',
        },
        {
            name: 'keywords',
            content:
                'basic math calculator, online calculator, math operations, addition, subtraction, multiplication, division',
        },
        {
            property: 'og:title',
            content: 'Basic Math Calculator - Simple Online Calculator for Math Operations',
        },
        {
            property: 'og:description',
            content:
                'Free online basic math calculator for addition, subtraction, multiplication, and division. Simple, fast, and easy-to-use calculator.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://numbercrunch.io/calculator/basic-math' },
        { name: 'twitter:card', content: 'summary' },
        {
            name: 'twitter:title',
            content: 'Basic Math Calculator - Simple Online Calculator for Math Operations',
        },
        {
            name: 'twitter:description',
            content:
                'Free online basic math calculator for addition, subtraction, multiplication, and division.',
        },
    ],
    link: [{ rel: 'canonical', href: 'https://numbercrunch.io/calculator/basic-math' }],
});
</script>
