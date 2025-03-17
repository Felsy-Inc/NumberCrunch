<template>
    <main class="calculator-page">
        <!-- <h1 class="calculator-page__title">Percentage Calculators</h1> -->
        <ConversionCalculator />
        <!-- <HorizontalLargeAd /> -->
    </main>
</template>

<script setup>
// import HorizontalLargeAd from '~/components/ads/HorizontalLargeAd.vue';
import ConversionCalculator from '~/components/calculators/conversion/ConversionCalculator.vue';

useHead({
    title: 'Unit Conversion Calculator',
    meta: [
        {
            name: 'description',
            content:
                'Free online unit conversion calculator. Convert between different units of measurement including length, weight, volume, temperature, and more.',
        },
        {
            name: 'keywords',
            content:
                'unit converter, conversion calculator, measurement converter, metric conversion, imperial conversion',
        },
        { property: 'og:title', content: 'Unit Conversion Calculator' },
        {
            property: 'og:description',
            content:
                'Free online unit conversion calculator. Convert between different units of measurement including length, weight, volume, temperature, and more.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://numbercrunch.io/calculator/conversion' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Unit Conversion Calculator' },
        {
            name: 'twitter:description',
            content:
                'Free online unit conversion calculator. Convert between different units of measurement.',
        },
    ],
    link: [{ rel: 'canonical', href: 'https://numbercrunch.io/calculator/conversion' }],
});
</script>
