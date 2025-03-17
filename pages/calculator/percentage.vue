<template>
    <main class="calculator-page">
        <!-- <h1 class="calculator-page__title">Percentage Calculators</h1> -->
        <PercentageOfNumber />
        <!-- <HorizontalLargeAd /> -->
    </main>
</template>

<script setup>
// import HorizontalLargeAd from '~/components/ads/HorizontalLargeAd.vue';
import PercentageOfNumber from '~/components/calculators/percentage/PercentageOfNumber.vue';

useHead({
    title: 'Percentage Calculator - Calculate Percentages Online',
    meta: [
        {
            name: 'description',
            content:
                'Free online percentage calculator. Calculate percentages of numbers, find percentage differences, and solve percentage problems easily.',
        },
        {
            name: 'keywords',
            content:
                'percentage calculator, percent calculator, calculate percentage, percentage math, percentage tool',
        },
        { property: 'og:title', content: 'Percentage Calculator - Calculate Percentages Online' },
        {
            property: 'og:description',
            content:
                'Free online percentage calculator. Calculate percentages of numbers, find percentage differences, and solve percentage problems easily.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://numbercrunch.io/calculator/percentage' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Percentage Calculator - Calculate Percentages Online' },
        {
            name: 'twitter:description',
            content:
                'Free online percentage calculator. Calculate percentages of numbers and solve percentage problems.',
        },
    ],
    link: [{ rel: 'canonical', href: 'https://numbercrunch.io/calculator/percentage' }],
});
</script>
