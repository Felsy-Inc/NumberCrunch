<template>
    <main class="home-page">
        <IntroductionHero />
        <CalculatorList />
    </main>
</template>

<script setup>
import CalculatorList from '~/components/base/CalculatorList.vue';
import IntroductionHero from '~/components/IntroductionHero.vue';
import { resetColorTheme } from '~/utils/colorTheme';
import { onMounted } from 'vue';
import { useHead } from 'unhead';

onMounted(() => {
    resetColorTheme();
});

// Add meta information
useHead({
    title: 'NumberCrunch - Free Online Calculator Tools',
    meta: [
        {
            name: 'description',
            content:
                'Access a comprehensive collection of free online calculators for various mathematical, financial, and conversion needs. Simple, fast, and accurate calculations.',
        },
        {
            name: 'keywords',
            content:
                'online calculators, math tools, financial calculators, conversion tools, free calculators',
        },
        { property: 'og:title', content: 'NumberCrunch - Free Online Calculator Tools' },
        {
            property: 'og:description',
            content:
                'Access a comprehensive collection of free online calculators for various mathematical, financial, and conversion needs.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://numbercrunch.io' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'NumberCrunch - Free Online Calculator Tools' },
        {
            name: 'twitter:description',
            content:
                'Access a comprehensive collection of free online calculators for various mathematical and financial needs.',
        },
    ],
    link: [{ rel: 'canonical', href: 'https://numbercrunch.io' }],
});
</script>
