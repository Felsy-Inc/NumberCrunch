<template>
    <Card class="calculator-base">
        <template #header>
            <section class="calculator-base__header">
                <i class="pi pi-calculator text-xl"></i>
                Percentage Calculator
            </section>
        </template>

        <template #content>
            <section class="calculator-base__content">
                <!-- Input Section -->
                <div class="content-left">
                    <div>
                        <label class="block text-sm font-medium mb-1">Percentage Value</label>
                        <div class="relative">
                            <InputNumber
                                v-model="percentage"
                                :min="0"
                                :max="100"
                                placeholder="Enter percentage"
                                class="w-full"
                            />
                            <span class="absolute right-3 top-2 text-gray-400">%</span>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-1">Number</label>
                        <InputNumber v-model="number" placeholder="Enter number" class="w-full" />
                    </div>

                    <!-- Common Percentages -->
                    <div class="flex gap-4 flex-wrap">
                        <Button
                            v-for="p in commonPercentages"
                            :key="p"
                            @click="percentage = p"
                            class="p-button-outlined"
                        >
                            {{ p }}%
                        </Button>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex gap-4">
                        <Button @click="calculate" class="flex-1" :disabled="!canCalculate">
                            Calculate
                            <i class="pi pi-arrow-right ml-2"></i>
                        </Button>
                        <Button @click="clear" icon="pi pi-refresh" class="p-button-secondary" />
                    </div>
                </div>

                <!-- Result Section -->
                <div class="content-right">
                    <!-- Error Display -->
                    <Message v-if="error" severity="error" :closable="false" class="mb-4">
                        {{ error }}
                    </Message>

                    <!-- Result Display -->
                    <div v-if="result !== null" class="p-4 bg-gray-800 rounded-lg shadow">
                        <div class="flex justify-between items-center">
                            <div>
                                <h3 class="text-lg font-semibold">Result</h3>
                                <p class="text-3xl text-blue-400">{{ formatNumber(result) }}</p>
                                <p class="text-sm text-gray-400">
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
                    <div class="mt-4 p-4 bg-gray-800 rounded-lg shadow">
                        <div class="flex items-start gap-2">
                            <i class="pi pi-info-circle text-blue-400 mt-1"></i>
                            <div>
                                <h3 class="font-medium">How it works</h3>
                                <p class="text-sm text-gray-400">
                                    To calculate a percentage of a number:<br />
                                    1. Multiply the number by the percentage<br />
                                    2. Divide by 100<br />
                                    Formula: (Percentage × Number) ÷ 100
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Calculation History -->
                    <div v-if="history.length" class="mt-4">
                        <h3 class="font-medium mb-2">Recent Calculations</h3>
                        <div class="space-y-2">
                            <div
                                v-for="(item, index) in history"
                                :key="index"
                                class="text-sm text-gray-400 p-2 bg-gray-800 rounded-lg shadow"
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
    @apply max-w-3xl mx-auto border-gray-100 dark:bg-gray-900;

    &__header {
        @apply text-2xl font-bold flex items-center gap-2 border-b border-gray-700 p-4;
    }

    .p-card-body {
        @apply p-0;
    }

    &__content {
        @apply grid grid-cols-1 lg:grid-cols-2 gap-8 p-4;

        .content-left {
            @apply space-y-6;
        }

        .content-right {
        }
    }
}

.p-inputnumber-input {
    @apply bg-gray-800 border-gray-700 text-white;
}

.p-button {
    @apply bg-blue-500 border-blue-500;
}

.p-button:hover {
    @apply bg-blue-600 border-blue-600;
}

.p-button.p-button-secondary {
    @apply bg-gray-700 border-gray-700;
}

.p-button.p-button-secondary:hover {
    @apply bg-gray-600 border-gray-600;
}

.p-card {
    @apply bg-gray-900 border-gray-700;
}

.p-message {
    @apply bg-red-500 border-red-600 text-white;
}
</style>
