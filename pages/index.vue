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

onMounted(() => {
    resetColorTheme();
});
</script>
