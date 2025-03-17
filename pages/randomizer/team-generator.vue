<template>
    <main class="calculator-page">
        <!-- <h1 class="calculator-page__title">Percentage Calculators</h1> -->
        <TeamGenerator />
        <!-- <HorizontalLargeAd /> -->
    </main>
</template>

<script setup>
// import HorizontalLargeAd from '~/components/ads/HorizontalLargeAd.vue';
import TeamGenerator from '~/components/randomizers/team-generator/TeamGenerator.vue';

// Use useHead for additional meta tags
useHead({
    title: 'Random Team Generator - Create Fair Teams Instantly | NumberCrunch',
    meta: [
        {
            name: 'description',
            content:
                'Generate random teams quickly and fairly with our free team generator. Perfect for sports, games, group activities, and classroom organization.',
        },
        {
            name: 'keywords',
            content:
                'team generator, random teams, group generator, team maker, team randomizer, fair team division',
        },
        { property: 'og:title', content: 'Random Team Generator - Create Fair Teams Instantly' },
        {
            property: 'og:description',
            content:
                'Generate random teams quickly and fairly. Perfect for sports, games, group activities, and classroom organization.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://numbercrunch.io/randomizer/team-generator' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Random Team Generator - Create Fair Teams Instantly' },
        {
            name: 'twitter:description',
            content:
                'Generate random teams quickly and fairly. Perfect for sports, games, and group activities.',
        },
    ],
    link: [{ rel: 'canonical', href: 'https://numbercrunch.io/randomizer/team-generator' }],
});
</script>
