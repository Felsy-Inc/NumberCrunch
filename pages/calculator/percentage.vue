<template>
    <main class="percentage-page">
        <h1 class="percentage-page__title">Percentage Calculators</h1>
        <PercentageOfNumber />
    </main>
</template>

<script setup>
import PercentageOfNumber from '~/components/calculators/percentage/PercentageOfNumber.vue';
</script>

<style lang="scss">
.percentage-page {
    @apply relative;

    &__title {
        @apply py-8 lg:py-24 text-2xl sm:text-6xl font-bold text-center mx-auto w-fit bg-gradient-to-r from-primary-600 via-primary-300 to-primary-600 text-transparent bg-clip-text;
    }
}
</style>
