<template>
    <main class="calculator-page">
        <!-- <h1 class="calculator-page__title">Percentage Calculators</h1> -->
        <CoinFlip />
        <!-- <HorizontalLargeAd /> -->
    </main>
</template>

<script setup>
// import HorizontalLargeAd from '~/components/ads/HorizontalLargeAd.vue';
import CoinFlip from '~/components/randomizers/coin-flip/CoinFlip.vue';
import { useHead } from 'unhead';

// Add meta information
useHead({
    title: 'Coin Flip Simulator - Random Heads or Tails Generator',
    meta: [
        {
            name: 'description',
            content:
                'Free online coin flip simulator. Get random heads or tails results instantly. Perfect for making quick decisions or settling debates.',
        },
        {
            name: 'keywords',
            content:
                'coin flip, heads or tails, random coin flip, coin toss simulator, online coin flip',
        },
        { property: 'og:title', content: 'Coin Flip Simulator - Random Heads or Tails Generator' },
        {
            property: 'og:description',
            content:
                'Free online coin flip simulator. Get random heads or tails results instantly. Perfect for making quick decisions or settling debates.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://numbercrunch.io/randomizer/coin-flip' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Coin Flip Simulator - Random Heads or Tails Generator' },
        {
            name: 'twitter:description',
            content:
                'Free online coin flip simulator. Get random heads or tails results instantly.',
        },
    ],
    link: [{ rel: 'canonical', href: 'https://numbercrunch.io/randomizer/coin-flip' }],
});
</script>
