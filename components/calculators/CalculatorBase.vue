<template>
    <Toast />
    <Card class="calculator-base" :class="`calculator-base--${color}`">
        <template #header>
            <section class="calculator-base__header">
                <div class="calculator-base__icon-container">
                    <i class="calculator-base__icon pi" :class="`pi-${icon}`"></i>
                </div>
                {{ title }}
            </section>
        </template>

        <template #content>
            <section class="calculator-base__content">
                <!-- Input Section -->
                <div class="calculator-base__content-left">
                    <slot name="content"></slot>
                    <!-- Error Display -->
                    <Message
                        v-if="error"
                        severity="error"
                        :closable="false"
                        class="calculator-base__error"
                    />
                    <!-- Action Buttons -->
                    <div class="calculator-base__action-buttons">
                        <Button
                            @click="$emit('calculate')"
                            class="calculator-base__calculate-btn"
                            :disabled="!canCalculate"
                        >
                            Calculate
                            <i class="calculator-base__arrow-icon pi pi-arrow-right"></i>
                        </Button>
                        <Button
                            @click="$emit('clear')"
                            icon="pi pi-refresh"
                            class="p-button-outlined"
                            severity="secondary"
                            title="Reset"
                        />
                    </div>
                </div>

                <!-- Result Section -->
                <div class="calculator-base__content-right">
                    <!-- Result Display -->
                    <div v-if="result !== null" class="calculator-base__result">
                        <div class="calculator-base__result-container">
                            <div>
                                <h3 class="calculator-base__result-title">Result</h3>
                                <p class="calculator-base__result-value">
                                    {{ result }}
                                </p>
                                <p class="calculator-base__result-formula">
                                    {{ resultFormula }}
                                </p>
                            </div>
                            <Button
                                class="p-button-outlined"
                                title="Copy result"
                                icon="pi pi-copy"
                                @click="copyResult"
                            />
                        </div>
                    </div>

                    <!-- Formula Help -->
                    <div class="calculator-base__help">
                        <div class="calculator-base__help-container">
                            <i class="calculator-base__help-icon pi pi-info-circle"></i>
                            <div>
                                <h3 class="calculator-base__help-title">How it works</h3>
                                <p class="calculator-base__help-text" v-html="explanation"></p>
                            </div>
                        </div>
                    </div>

                    <!-- Calculation History -->
                    <div v-if="history.length" class="calculator-base__history">
                        <h3 class="calculator-base__history-title">Recent Calculations</h3>
                        <div class="calculator-base__history-list">
                            <div
                                v-for="(item, index) in history"
                                :key="index"
                                class="calculator-base__history-item"
                            >
                                {{ item }}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </template>
    </Card>
</template>

<script setup>
import { updatePrimaryPalette } from '@primevue/themes';
import { watch } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Message from 'primevue/message';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';

const props = defineProps({
    color: {
        type: String,
        default: 'primary',
    },
    icon: {
        type: String,
        default: 'calculator',
    },
    title: {
        type: String,
        required: true,
    },
    explanation: {
        type: String,
        required: true,
    },
    canCalculate: {
        type: Boolean,
        default: false,
    },
    result: {
        type: String,
        default: null,
    },
    resultFormula: {
        type: String,
        default: null,
    },
    history: {
        type: Array,
        default: [],
    },
    error: {
        type: String,
        default: '',
    },
});

const updateTheme = (color) => {
    updatePrimaryPalette({
        50: `{${color}.50}`,
        100: `{${color}.100}`,
        200: `{${color}.200}`,
        300: `{${color}.300}`,
        400: `{${color}.400}`,
        500: `{${color}.500}`,
        600: `{${color}.600}`,
        700: `{${color}.700}`,
        800: `{${color}.800}`,
        900: `{${color}.900}`,
        950: `{${color}.950}`,
    });
};

watch(
    () => props.color,
    (newColor) => {
        if (newColor) {
            updateTheme(newColor);
        }
    },
    { immediate: true }
);

const toast = useToast();

const copyResult = async () => {
    if (props.result !== null) {
        try {
            await navigator.clipboard.writeText(props.result.toString());
            toast.add({
                severity: 'success',
                summary: 'Copied!',
                detail: 'Result copied to clipboard',
                life: 3000,
            });
        } catch (err) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to copy to clipboard',
                life: 3000,
            });
        }
    }
};
</script>

<style lang="scss">
.calculator-base {
    @apply max-w-3xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700;

    // Theme overwrites
    &--emerald {
        .calculator-base {
            &__icon-container {
                @apply bg-emerald-600 dark:bg-emerald-500;
            }
            &__result-value {
                @apply text-emerald-600 dark:text-emerald-400;
            }
            &__help-icon {
                @apply text-emerald-600 dark:text-emerald-400;
            }
        }
    }

    &--rose {
        .calculator-base {
            &__icon-container {
                @apply bg-rose-600 dark:bg-rose-500;
            }
            &__result-value {
                @apply text-rose-600 dark:text-rose-400;
            }
            &__help-icon {
                @apply text-rose-600 dark:text-rose-400;
            }
        }
    }

    // Header
    &__header {
        @apply text-2xl font-bold flex items-center gap-4 border-b border-gray-200 dark:border-gray-700 p-4 text-gray-900 dark:text-white;
    }

    &__icon-container {
        @apply h-10 w-10 bg-primary-600 dark:bg-primary-500 rounded flex items-center justify-center;
    }

    &__icon {
        @apply text-xl text-white;
    }

    // Layout
    &__content {
        @apply grid grid-cols-1 lg:grid-cols-2 gap-8 p-4;
    }

    &__content-left {
        @apply space-y-6;
    }

    // Input Fields
    &__label {
        @apply block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300;
    }

    &__input-wrapper {
        @apply relative;
    }

    &__input {
        @apply w-full;
    }

    &__percentage-symbol {
        @apply absolute right-3 top-2 text-gray-500 dark:text-gray-400;
    }

    // Buttons
    &__percentage-buttons {
        @apply flex gap-4 flex-wrap;
    }

    &__action-buttons {
        @apply flex gap-4;
    }

    &__calculate-btn {
        @apply flex-1 transition-transform;

        &:active {
            @apply transform scale-95;
        }
    }

    &__arrow-icon {
        @apply ml-2 transition-transform;
    }

    // Results & Messages
    &__error {
        @apply mb-4;
    }

    &__result {
        @apply p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700;
    }

    &__result-container {
        @apply flex justify-between items-center;
    }

    &__result-title {
        @apply text-lg font-semibold text-gray-900 dark:text-white;
    }

    &__result-value {
        @apply text-3xl text-primary-600 dark:text-primary-400 font-bold;
    }

    &__result-formula {
        @apply text-sm text-gray-600 dark:text-gray-400;
    }

    // Help Section
    &__help {
        @apply mt-6 rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-gray-50/50 dark:bg-gray-800/30;
    }

    &__help-container {
        @apply flex items-start gap-3;
    }

    &__help-icon {
        @apply text-base text-primary-600 dark:text-primary-400;
    }

    &__help-title {
        @apply text-base font-semibold text-gray-900 dark:text-white mb-1.5;
    }

    &__help-text {
        @apply text-sm text-gray-600 dark:text-gray-400 leading-relaxed;

        ::v-deep(strong) {
            @apply text-gray-900 dark:text-white font-medium;
        }
    }

    // History Section
    &__history {
        @apply mt-4;
    }

    &__history-title {
        @apply font-medium mb-2 text-gray-900 dark:text-white;
    }

    &__history-list {
        @apply space-y-2;
    }

    &__history-item {
        @apply text-sm text-gray-600 dark:text-gray-400 p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700;

        &:hover {
            @apply bg-gray-50 dark:bg-gray-700;
        }
    }

    // PrimeVue Component Overrides
    .p-card-body {
        @apply p-0;
    }
}
</style>
