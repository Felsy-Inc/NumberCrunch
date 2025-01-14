<template>
    <div class="max-w-2xl mx-auto p-4">
        <h1 class="text-2xl font-bold mb-6">Settings</h1>
        <div class="space-y-6">
            <!-- Theme Selection -->
            <div class="space-y-2">
                <label class="font-medium">Theme</label>
                <select v-model="theme" class="block w-full max-w-xs p-2 border rounded">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                </select>
            </div>

            <!-- Currency Selection -->
            <div class="space-y-2">
                <label class="font-medium">Currency</label>
                <select v-model="currency" class="block w-full max-w-xs p-2 border rounded">
                    <option
                        v-for="currency in AVAILABLE_CURRENCIES"
                        :key="currency.value"
                        :value="currency.value"
                    >
                        {{ currency.label }}
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserPreferencesStore } from '~/stores/userPreferences';
import { AVAILABLE_CURRENCIES } from '../constants/currencies';

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
