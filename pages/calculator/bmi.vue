<template>
    <main class="calculator-page">
        <!-- <h1 class="calculator-page__title">Percentage Calculators</h1> -->
        <BmiCalculator />
        <!-- <HorizontalLargeAd /> -->
    </main>
</template>

<script setup>
// import HorizontalLargeAd from '~/components/ads/HorizontalLargeAd.vue';
import BmiCalculator from '~/components/calculators/bmi/BmiCalculator.vue';

// Add meta information
useHead({
    title: 'BMI Calculator - Calculate Your Body Mass Index',
    meta: [
        {
            name: 'description',
            content:
                'Calculate your Body Mass Index (BMI) with our free BMI calculator. Learn about your ideal weight range and understand what your BMI means for your health.',
        },
        {
            name: 'keywords',
            content:
                'BMI calculator, body mass index, healthy weight calculator, BMI measurement, weight health, BMI chart',
        },
        { property: 'og:title', content: 'BMI Calculator - Calculate Your Body Mass Index' },
        {
            property: 'og:description',
            content:
                'Calculate your Body Mass Index (BMI) with our free BMI calculator. Learn about your ideal weight range and understand what your BMI means for your health.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://numbercrunch.io/calculator/bmi' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'BMI Calculator - Calculate Your Body Mass Index' },
        {
            name: 'twitter:description',
            content:
                'Calculate your Body Mass Index (BMI) with our free BMI calculator. Learn about your ideal weight range.',
        },
    ],
    link: [{ rel: 'canonical', href: 'https://numbercrunch.io/calculator/bmi' }],
});
</script>
