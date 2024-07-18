<template>
    <div class="layout-default">
        <AppHeader />
        <slot />
    </div>
</template>

<script setup>
import AppHeader from '~/components/layout/AppHeader.vue';
</script>

<style lang="scss">
.layout-default {
    @apply dark:bg-black;
    position: relative;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    overflow-y: auto;

    &::before {
        content: '';
        position: absolute;
        top: -10rem;
        left: -5rem;
        height: 100%;
        width: 100%;
        background-image: linear-gradient(to right, var(--tw-gradient-stops));
        --tw-gradient-from: rgba(169, 175, 182, 1) var(--tw-gradient-from-position);
        --tw-gradient-to: rgba(169, 175, 182, 0) var(--tw-gradient-to-position);
        --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
        --tw-gradient-to: transparent var(--tw-gradient-to-position);
        opacity: 0.3;
        transform: rotate(45deg);
        pointer-events: none;
    }

    &:is(.dark *) {
        &::before {
            background-image: linear-gradient(to right, var(--tw-gradient-stops));
            --tw-gradient-from: rgba(31, 41, 55, 1) var(--tw-gradient-from-position);
            --tw-gradient-to: rgba(31, 41, 55, 0) var(--tw-gradient-to-position);
            opacity: 0.6;
        }
    }
}
</style>
