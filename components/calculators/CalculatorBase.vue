<template>
    <Card class="calculator-base">
        <template #header>
            <section class="calculator-base__header">
                <i class="calculator-base__icon pi pi-calculator"></i>
                Percentage Calculator
            </section>
        </template>

        <template #content>
            <section class="calculator-base__content">
                <!-- Input Section -->
                <div class="calculator-base__content-left">
                    <div>
                        <label class="calculator-base__label">Percentage Value</label>
                        <div class="calculator-base__input-wrapper">
                            <InputNumber
                                v-model="percentage"
                                :min="0"
                                :max="100"
                                placeholder="Enter percentage"
                                class="calculator-base__input"
                            />
                            <span class="calculator-base__percentage-symbol">%</span>
                        </div>
                    </div>

                    <div>
                        <label class="calculator-base__label">Number</label>
                        <InputNumber
                            v-model="number"
                            placeholder="Enter number"
                            class="calculator-base__input"
                        />
                    </div>

                    <!-- Common Percentages -->
                    <div class="calculator-base__percentage-buttons">
                        <Button
                            v-for="p in commonPercentages"
                            :key="p"
                            @click="percentage = p"
                            class="p-button-outlined"
                            :title="`Set percentage value to ${p}%`"
                        >
                            {{ p }}%
                        </Button>
                    </div>

                    <!-- Action Buttons -->
                    <div class="calculator-base__action-buttons">
                        <Button
                            @click="calculate"
                            class="calculator-base__calculate-btn"
                            :disabled="!canCalculate"
                        >
                            Calculate
                            <i class="calculator-base__arrow-icon pi pi-arrow-right"></i>
                        </Button>
                        <Button
                            @click="clear"
                            icon="pi pi-refresh"
                            class="p-button-secondary"
                            title="Reset"
                        />
                    </div>
                </div>

                <!-- Result Section -->
                <div class="calculator-base__content-right">
                    <!-- Error Display -->
                    <Message
                        v-if="error"
                        severity="error"
                        :closable="false"
                        class="calculator-base__error"
                    />

                    <!-- Result Display -->
                    <div v-if="result !== null" class="calculator-base__result">
                        <div class="calculator-base__result-container">
                            <div>
                                <h3 class="calculator-base__result-title">Result</h3>
                                <p class="calculator-base__result-value">
                                    {{ formatNumber(result) }}
                                </p>
                                <p class="calculator-base__result-formula">
                                    {{ percentage }}% of {{ formatNumber(number) }} =
                                    {{ formatNumber(result) }}
                                </p>
                            </div>
                            <Button
                                @click="copyResult"
                                icon="pi pi-copy"
                                class="p-button-text"
                                title="Copy result"
                            />
                        </div>
                    </div>

                    <!-- Formula Help -->
                    <div class="calculator-base__help">
                        <div class="calculator-base__help-container">
                            <i class="calculator-base__help-icon pi pi-info-circle"></i>
                            <div>
                                <h3 class="calculator-base__help-title">How it works</h3>
                                <p class="calculator-base__help-text">
                                    <span v-html="explanation"></span>
                                </p>
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
                                {{ item.percentage }}% of {{ formatNumber(item.number) }} =
                                {{ formatNumber(item.result) }}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </template>
    </Card>
</template>

<script setup>
import { ref, computed } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import Message from 'primevue/message';

const props = defineProps({
    explanation: {
        type: String,
        required: true,
    },
});

const percentage = ref(null);
const number = ref(null);
const result = ref(null);
const error = ref('');
const history = ref([]);

const commonPercentages = [25, 50, 75, 100];

const canCalculate = computed(() => percentage.value !== null && number.value !== null);

const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
};

const calculate = () => {
    error.value = '';

    if (!canCalculate.value) {
        error.value = 'Please fill in both fields';
        return;
    }

    const calculatedResult = (percentage.value * number.value) / 100;
    result.value = calculatedResult;

    history.value = [
        { percentage: percentage.value, number: number.value, result: calculatedResult },
        ...history.value.slice(0, 4),
    ];
};

const clear = () => {
    percentage.value = null;
    number.value = null;
    result.value = null;
    error.value = '';
};

const copyResult = () => {
    if (result.value !== null) {
        navigator.clipboard.writeText(result.value.toString());
    }
};
</script>

<style lang="scss">
.calculator-base {
    @apply max-w-3xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700;

    // Header
    &__header {
        @apply text-2xl font-bold flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 p-4 text-gray-900 dark:text-white;
    }

    &__icon {
        @apply text-xl text-primary-600 dark:text-primary-400;
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

        .p-inputnumber-input {
            @apply bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-colors;

            &:focus {
                @apply border-primary-500 ring-2 ring-primary-200 dark:ring-primary-800;
            }
        }
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
        @apply p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all border border-gray-200 dark:border-gray-700;

        &:hover {
            @apply shadow-lg;
        }
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
        @apply mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all border border-gray-200 dark:border-gray-700;

        &:hover {
            @apply shadow-lg;
        }
    }

    &__help-container {
        @apply flex items-start gap-2;
    }

    &__help-icon {
        @apply text-primary-600 dark:text-primary-400 mt-1;
    }

    &__help-title {
        @apply font-medium text-gray-900 dark:text-white;
    }

    &__help-text {
        @apply text-sm text-gray-600 dark:text-gray-400 leading-relaxed;
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
        @apply text-sm text-gray-600 dark:text-gray-400 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all border border-gray-200 dark:border-gray-700;

        &:hover {
            @apply shadow-lg bg-gray-50 dark:bg-gray-700;
        }
    }

    // PrimeVue Component Overrides
    .p-card-body {
        @apply p-0;
    }
}
</style>
