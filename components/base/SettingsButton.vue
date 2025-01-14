<template>
    <Button
        icon="pi pi-cog"
        class="p-button-rounded settings-button"
        size="large"
        severity="error"
        @click="navigateToSettings"
        aria-label="Settings"
    />
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToSettings = () => {
    router.push('/settings');
};
</script>

<style lang="scss">
.settings-button {
    @apply bg-sky-500 border-sky-500 text-white dark:text-black;
    &:not(:disabled):hover {
        @apply bg-sky-600 border-sky-600 text-white dark:text-black;
    }
}
</style>
