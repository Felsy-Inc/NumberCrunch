<template>
    <main class="calculator-page">
        <!-- <h1 class="calculator-page__title">Percentage Calculators</h1> -->
        <VolumeCalculator />
        <!-- <HorizontalLargeAd /> -->
    </main>
</template>

<script setup>
// import HorizontalLargeAd from '~/components/ads/HorizontalLargeAd.vue';
import VolumeCalculator from '~/components/calculators/volume/VolumeCalculator.vue';

// Add meta information
useHead({
    title: 'Volume Calculator - Convert Between Volume Units',
    meta: [
        {
            name: 'description',
            content:
                'Free online volume calculator. Convert between different volume units including liters, milliliters, cubic meters, cubic feet, gallons, and more.',
        },
        {
            name: 'keywords',
            content:
                'volume calculator, volume conversion, volume units, cubic meters, liters, gallons, cubic feet, volume measurement',
        },
        { property: 'og:title', content: 'Volume Calculator - Convert Between Volume Units' },
        {
            property: 'og:description',
            content:
                'Free online volume calculator. Convert between different volume units including liters, milliliters, cubic meters, cubic feet, gallons, and more.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://numbercrunch.io/calculator/volume' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Volume Calculator - Convert Between Volume Units' },
        {
            name: 'twitter:description',
            content:
                'Free online volume calculator. Convert between different volume units including liters, milliliters, cubic meters.',
        },
    ],
    link: [{ rel: 'canonical', href: 'https://numbercrunch.io/calculator/volume' }],
});
</script>
