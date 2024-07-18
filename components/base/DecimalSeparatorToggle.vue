<template>
    <ButtonGroup class="decimal-separator-toggle">
        <Button label="," :outlined="separator !== ','" @click="setSeparator(',')" />
        <Button label="." :outlined="separator !== '.'" @click="setSeparator('.')" />
    </ButtonGroup>
</template>

<script setup>
import { ref } from 'vue';

const separator = ref(',');
const setSeparator = (value) => {
    separator.value = value;
    // Optionally, save the value to localStorage or other state management
};
</script>

<style lang="scss">
.decimal-separator-toggle {
    .p-button-outlined {
        @apply bg-gray-200 dark:bg-gray-700;
    }
}
</style>
