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
import { ref, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserPreferencesStore } from '~/stores/userPreferences';
import { AVAILABLE_CURRENCIES } from '../constants/currencies';

const AVAILABLE_THEMES = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'System', value: 'system' },
];

const userPreferencesStore = useUserPreferencesStore();
const { theme, currency } = storeToRefs(userPreferencesStore);

const icons = {
    system: 'pi pi-desktop',
    light: 'pi pi-sun',
    dark: 'pi pi-moon',
};

const currentIcon = ref(icons[theme.value || 'system']);
const currentButtonClass = ref(`${theme.value || 'system'}-button`);

watch(theme, (newTheme, oldTheme) => {
    if (oldTheme !== undefined) {
        updateMode(newTheme);
    }
});
watch(currency, (newCurrency) => {
    userPreferencesStore.setCurrency(newCurrency);
});

const updateMode = (newTheme) => {
    currentIcon.value = icons[newTheme];
    currentButtonClass.value = `${newTheme}-button`;
    switch (newTheme) {
        case 'dark':
            document.documentElement.classList.add('dark');
            userPreferencesStore.setTheme('dark');
            break;
        case 'light':
            document.documentElement.classList.remove('dark');
            userPreferencesStore.setTheme('light');
            break;
        default:
            userPreferencesStore.setTheme('system');
            applySystemPreference();
    }
};

const applySystemPreference = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', prefersDark);
};

onMounted(() => {
    resetTheme();

    if (theme.value === 'system') {
        applySystemPreference();
    } else if (theme.value === 'dark') {
        document.documentElement.classList.add('dark');
    }

    window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', applySystemPreference);
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
    @apply space-y-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50;

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
