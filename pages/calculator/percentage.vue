<template>
    <main class="percentage-page">
        <h1 class="percentage-page__title">Percentage Calculators</h1>
        <PercentageOfNumber />
        <HorizontalLargeAd />
    </main>
</template>

<script setup>
import HorizontalLargeAd from '~/components/ads/HorizontalLargeAd.vue';
import PercentageOfNumber from '~/components/calculators/percentage/PercentageOfNumber.vue';
</script>

<style lang="scss">
.percentage-page {
    @apply relative flex-1;

    &__title {
        @apply py-8 lg:py-24 text-2xl sm:text-6xl font-bold text-center mx-auto w-fit bg-gradient-to-r 
        from-primary-700 via-primary-400 to-primary-700 dark:from-primary-600 dark:via-primary-300 dark:to-primary-600 text-transparent bg-clip-text;
    }
}
</style>
