<template>
    <Button
        :icon="currentIcon"
        class="p-button-rounded"
        size="large"
        @click="toggleDarkMode"
        :class="currentButtonClass"
        aria-label="Toggle Dark Mode"
    />
</template>

<script setup>
import { ref, onMounted } from 'vue';

const mode = ref('system');
const modes = ['system', 'light', 'dark'];
const icons = {
    system: 'pi pi-desktop',
    light: 'pi pi-sun',
    dark: 'pi pi-moon',
};
const currentIcon = ref(icons[mode.value]);

const currentButtonClass = ref('system-button');

const toggleDarkMode = () => {
    const currentIndex = modes.indexOf(mode.value);
    mode.value = modes[(currentIndex + 1) % modes.length];
    updateMode();
};

const updateMode = () => {
    currentIcon.value = icons[mode.value];
    currentButtonClass.value = `${mode.value}-button`;
    switch (mode.value) {
        case 'dark':
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            break;
        case 'light':
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            break;
        default:
            localStorage.removeItem('theme');
            applySystemPreference();
    }
};

const applySystemPreference = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', prefersDark);
};

onMounted(() => {
    const savedTheme = localStorage.getItem('theme') || 'system';
    mode.value = savedTheme;
    updateMode();
    window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', applySystemPreference);
});
</script>
