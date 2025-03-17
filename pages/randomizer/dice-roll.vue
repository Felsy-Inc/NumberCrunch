<template>
    <main class="calculator-page">
        <!-- <h1 class="calculator-page__title">Percentage Calculators</h1> -->
        <DiceRoll />
        <!-- <HorizontalLargeAd /> -->
    </main>
</template>

<script setup>
// import HorizontalLargeAd from '~/components/ads/HorizontalLargeAd.vue';
import DiceRoll from '~/components/randomizers/dice-roll/DiceRoll.vue';

useHead({
    title: 'Dice Roll Simulator - Online Dice Rolling Tool',
    meta: [
        {
            name: 'description',
            content:
                'Free online dice rolling simulator. Roll virtual dice with any number of sides. Perfect for board games, RPGs, and tabletop gaming.',
        },
        {
            name: 'keywords',
            content:
                'dice roller, dice simulator, virtual dice, online dice, random number generator, RPG dice, D&D dice',
        },
        { property: 'og:title', content: 'Dice Roll Simulator - Online Dice Rolling Tool' },
        {
            property: 'og:description',
            content:
                'Free online dice rolling simulator. Roll virtual dice with any number of sides. Perfect for board games, RPGs, and tabletop gaming.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://numbercrunch.io/randomizer/dice-roll' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Dice Roll Simulator - Online Dice Rolling Tool' },
        {
            name: 'twitter:description',
            content:
                'Free online dice rolling simulator. Roll virtual dice with any number of sides.',
        },
    ],
    link: [{ rel: 'canonical', href: 'https://numbercrunch.io/randomizer/dice-roll' }],
});
</script>
