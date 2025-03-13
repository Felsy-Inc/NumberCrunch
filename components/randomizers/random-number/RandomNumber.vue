<template>
    <CalculatorBase
        color="violet"
        icon="pi pi-question"
        title="Random Number Generator"
        type="randomizer"
        :can-calculate="isFormValid"
        :explanation="explanation"
        :history="history"
        :result="result"
        :result-formula="resultFormula"
        @calculate="calculate"
        @clear="resetForm"
    >
        <template #content>
            <form @submit.prevent="calculate" class="calculator-base__form">
                <!-- Minimum Number Input -->
                <div class="calculator-base__form-group">
                    <label class="form__label">Min</label>
                    <InputNumber
                        v-model="formData.minNumber"
                        class="form__input"
                        placeholder="Enter minimum number"
                        :min="MIN_NUMBER"
                        :max="MAX_NUMBER"
                        @input="(e) => (formData.minNumber = Number(e.value))"
                    />
                </div>

                <!-- Maximum Number Input -->
                <div class="calculator-base__form-group">
                    <label class="form__label">Max</label>
                    <InputNumber
                        v-model="formData.maxNumber"
                        class="form__input"
                        placeholder="Enter maximum number"
                        :min="MIN_NUMBER"
                        :max="MAX_NUMBER"
                        @input="(e) => (formData.maxNumber = Number(e.value))"
                    />
                </div>
            </form>
        </template>
    </CalculatorBase>
</template>

<script setup lang="ts">
import CalculatorBase from '~/components/calculators/CalculatorBase.vue';
import { ref, computed } from 'vue';
import { useFormValidation } from '~/composables/useFormValidation';

// Types
interface RandomNumberFormData {
    minNumber: number | null;
    maxNumber: number | null;
}

// Constants
const MIN_NUMBER = -1000000;
const MAX_NUMBER = 1000000;

const explanation = `
<p>This generator creates random numbers within a specified range:</p>
<ul>
    <li>Enter a minimum number (inclusive)</li>
    <li>Enter a maximum number (inclusive)</li>
    <li>Click generate to get a random number within the range</li>
</ul>
`;

// Composables
const { validateForm } = useFormValidation();

// State
const result = ref<string | undefined>(undefined);
const resultFormula = ref<string | undefined>(undefined);
const history = ref<string[]>([]);

// Initial form state
const formData = ref<RandomNumberFormData>({
    minNumber: null,
    maxNumber: null,
});

// Computed
const isFormValid = computed(() => {
    const validation = {
        minNumber: formData.value.minNumber !== null,
        maxNumber: formData.value.maxNumber !== null,
        validRange:
            formData.value.minNumber !== null &&
            formData.value.maxNumber !== null &&
            formData.value.minNumber <= formData.value.maxNumber,
    };

    return validateForm(validation);
});

const formatNumber = (num: number): string => {
    return new Intl.NumberFormat().format(num);
};

const calculate = () => {
    if (
        !isFormValid.value ||
        formData.value.minNumber === null ||
        formData.value.maxNumber === null
    )
        return;

    try {
        const min = Math.ceil(formData.value.minNumber);
        const max = Math.floor(formData.value.maxNumber);
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

        result.value = formatNumber(randomNumber);

        const formattedMin = formatNumber(min);
        const formattedMax = formatNumber(max);
        const formattedResult = formatNumber(randomNumber);

        resultFormula.value = `Random number between ${formattedMin} and ${formattedMax}`;

        // Add generation to history
        history.value = [
            `Generated ${formattedResult} (range: ${formattedMin} - ${formattedMax})`,
            ...history.value.slice(0, 4),
        ];
    } catch (err) {
        result.value = undefined;
        resultFormula.value = undefined;
    }
};

const resetForm = () => {
    formData.value = {
        minNumber: null,
        maxNumber: null,
    };
    result.value = undefined;
    resultFormula.value = undefined;
};
</script>

<style scoped>
.form__operation-buttons {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.form__operation-buttons .p-button {
    min-width: 3rem;
}
</style>
