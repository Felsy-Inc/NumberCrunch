<template>
    <section class="introduction-hero">
        <h1 class="introduction-hero__subtitle">Stop crunching your head</h1>
        <h2 class="introduction-hero__title">Start crunching numbers</h2>
        <h3 class="introduction-hero__text">
            Choose from our wide range of calculators to get started
        </h3>
    </section>
</template>

<style lang="scss">
.introduction-hero {
    @apply container mx-auto my-12 px-3 text-center;

    &__title {
        @apply text-6xl text-primary-500 dark:text-primary-400 font-bold mb-8;
    }

    &__subtitle {
        @apply text-5xl mb-1 line-through;
    }

    &__text {
        @apply text-2xl mb-3;
    }
}
</style>
