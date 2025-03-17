<template>
    <main class="calculator-page">
        <!-- <h1 class="calculator-page__title">Percentage Calculators</h1> -->
        <CaloriesCalculator />
        <!-- <HorizontalLargeAd /> -->
    </main>
</template>

<script setup>
// import HorizontalLargeAd from '~/components/ads/HorizontalLargeAd.vue';
import CaloriesCalculator from '~/components/calculators/calories/CaloriesCalculator.vue';

// Add meta information
useHead({
    title: 'Calories Calculator - Calculate Daily Caloric Needs',
    meta: [
        {
            name: 'description',
            content:
                'Calculate your daily calorie needs with our free calories calculator. Find out how many calories you need to maintain, lose, or gain weight.',
        },
        {
            name: 'keywords',
            content:
                'calories calculator, calorie counter, daily calorie needs, BMR calculator, TDEE calculator, weight management',
        },
        { property: 'og:title', content: 'Calories Calculator - Calculate Daily Caloric Needs' },
        {
            property: 'og:description',
            content:
                'Calculate your daily calorie needs with our free calories calculator. Find out how many calories you need to maintain, lose, or gain weight.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://numbercrunch.io/calculator/calories' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Calories Calculator - Calculate Daily Caloric Needs' },
        {
            name: 'twitter:description',
            content:
                'Calculate your daily calorie needs with our free calories calculator. Find out how many calories you need.',
        },
    ],
    link: [{ rel: 'canonical', href: 'https://numbercrunch.io/calculator/calories' }],
});
</script>
