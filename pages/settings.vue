<template>
    <main class="settings settings-page">
        <div class="settings__container">
            <div class="settings__header">
                <Button
                    class="settings__back-button"
                    icon="pi pi-arrow-left"
                    text
                    @click="$router.back()"
                />
                <h1 class="settings__title">Settings</h1>
            </div>

            <div class="settings__sections">
                <!-- Appearance Settings Group -->
                <div class="settings-group">
                    <h2 class="settings-group__title">Appearance</h2>
                    <div class="settings-group__content">
                        <div class="settings-item">
                            <label class="settings-item__label" for="theme-select">Theme</label>
                            <Select
                                id="theme-select"
                                class="settings-item__select"
                                :options="AVAILABLE_THEMES"
                                optionLabel="label"
                                optionValue="value"
                                v-model="theme"
                            />
                            <span class="settings-item__description"
                                >Choose how the application looks</span
                            >
                        </div>
                    </div>
                </div>

                <!-- Regional Settings Group -->
                <div class="settings-group">
                    <h2 class="settings-group__title">Regional</h2>
                    <div class="settings-group__content">
                        <div class="settings-item">
                            <label class="settings-item__label" for="currency-select"
                                >Currency</label
                            >
                            <Select
                                id="currency-select"
                                class="settings-item__select"
                                :options="AVAILABLE_CURRENCIES"
                                optionLabel="label"
                                optionValue="value"
                                v-model="currency"
                            />
                            <span class="settings-item__description"
                                >Select your preferred currency for transactions</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserPreferencesStore } from '~/stores/userPreferences';
import { AVAILABLE_CURRENCIES } from '~/constants/currencies';
import { useHead } from 'unhead';
const { $updateTheme } = useNuxtApp();

const AVAILABLE_THEMES = [
    { icon: 'pi pi-sun', label: 'Light', value: 'light' },
    { icon: 'pi pi-moon', label: 'Dark', value: 'dark' },
    { icon: 'pi pi-desktop', label: 'System', value: 'system' },
];

const userPreferencesStore = useUserPreferencesStore();
const { currency } = storeToRefs(userPreferencesStore);
const theme = ref('system');

watch(theme, (newTheme, oldTheme) => {
    if (oldTheme !== undefined) {
        $updateTheme(newTheme);
    }
});
watch(currency, (newCurrency) => {
    userPreferencesStore.setCurrency(newCurrency);
});

onMounted(() => {
    resetColorTheme();
    theme.value = localStorage.getItem('theme');
});

// Add meta information
useHead({
    title: 'Settings - NumberCrunch',
    meta: [
        {
            name: 'description',
            content:
                'Customize your NumberCrunch experience. Adjust theme, currency, and other preferences to suit your needs.',
        },
        {
            name: 'keywords',
            content:
                'settings, preferences, theme settings, currency settings, calculator preferences',
        },
        { property: 'og:title', content: 'Settings - NumberCrunch' },
        {
            property: 'og:description',
            content:
                'Customize your NumberCrunch experience. Adjust theme, currency, and other preferences to suit your needs.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://numbercrunch.io/settings' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Settings - NumberCrunch' },
        {
            name: 'twitter:description',
            content:
                'Customize your NumberCrunch experience. Adjust theme, currency, and other preferences.',
        },
    ],
    link: [{ rel: 'canonical', href: 'https://numbercrunch.io/settings' }],
});
</script>

<style lang="scss" scoped>
.settings {
    &__container {
        @apply max-w-2xl mx-auto p-4;
    }

    &__header {
        @apply flex items-center gap-4 mb-8;
    }

    &__back-button {
        @apply -ml-2;
    }

    &__title {
        @apply text-2xl font-bold;
    }

    &__sections {
        @apply space-y-8;
    }
}

.settings-group {
    @apply space-y-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-800/50;

    &__title {
        @apply text-lg font-semibold text-gray-900 dark:text-gray-100;
    }

    &__content {
        @apply space-y-6;
    }
}

.settings-item {
    @apply flex flex-col space-y-2;

    &__label {
        @apply font-medium text-gray-700 dark:text-gray-300;
    }

    &__description {
        @apply text-sm text-gray-500 dark:text-gray-400;
    }

    &__select {
        @apply w-full max-w-xs;
    }
}
</style>
