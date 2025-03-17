<template>
    <main class="calculator-page">
        <!-- <h1 class="calculator-page__title">Percentage Calculators</h1> -->
        <RandomNumber />
        <!-- <HorizontalLargeAd /> -->
    </main>
</template>

<script setup>
// import HorizontalLargeAd from '~/components/ads/HorizontalLargeAd.vue';
import RandomNumber from '~/components/randomizers/random-number/RandomNumber.vue';

useHead({
    title: 'Random Number Generator',
    meta: [
        {
            name: 'description',
            content:
                'Generate random numbers quickly and easily with our free online random number generator tool.',
        },
        {
            name: 'keywords',
            content:
                'random number generator, random number tool, number randomizer, random number picker',
        },
        { property: 'og:title', content: 'Random Number Generator' },
        {
            property: 'og:description',
            content:
                'Generate random numbers quickly and easily with our free online random number generator tool.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://numbercrunch.io/randomizer/random-number' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Random Number Generator' },
        {
            name: 'twitter:description',
            content: 'Generate random numbers quickly and easily with our free online tool.',
        },
    ],
    link: [{ rel: 'canonical', href: 'https://numbercrunch.io/randomizer/random-number' }],
});
</script>
