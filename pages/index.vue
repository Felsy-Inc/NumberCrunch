<template>
    <main class="home-page">
        <IntroductionHero />
        <CalculatorList />
    </main>
</template>

<script setup>
import CalculatorList from '~/components/base/CalculatorList.vue';
import IntroductionHero from '~/components/IntroductionHero.vue';
</script>

<style lang="scss">
.home-page {
    @apply relative flex-1;
}
</style>
