<template>
    <main class="calculator-page">
        <!-- <h1 class="calculator-page__title">Percentage Calculators</h1> -->
        <AreaCalculator />
        <!-- <HorizontalLargeAd /> -->
    </main>
</template>

<script setup>
// import HorizontalLargeAd from '~/components/ads/HorizontalLargeAd.vue';
import AreaCalculator from '~/components/calculators/area/AreaCalculator.vue';

// Define meta information
useHead({
    title: 'Area Calculator - Calculate Area of Different Shapes',
    meta: [
        {
            name: 'description',
            content:
                'Free online area calculator. Calculate the area of rectangles, squares, circles, triangles and more. Simple and easy to use geometric area calculator.',
        },
        {
            name: 'keywords',
            content:
                'area calculator, geometric calculator, shape area, circle area, rectangle area, square area, triangle area',
        },
        { property: 'og:title', content: 'Area Calculator - Calculate Area of Different Shapes' },
        {
            property: 'og:description',
            content:
                'Free online area calculator. Calculate the area of rectangles, squares, circles, triangles and more. Simple and easy to use geometric area calculator.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://numbercrunch.io/calculator/area' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Area Calculator - Calculate Area of Different Shapes' },
        {
            name: 'twitter:description',
            content:
                'Free online area calculator. Calculate the area of rectangles, squares, circles, and more.',
        },
    ],
    link: [{ rel: 'canonical', href: 'https://numbercrunch.io/calculator/area' }],
});
</script>
