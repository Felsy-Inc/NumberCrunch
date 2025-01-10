<template>
    <CalculatorBase
        color="emerald"
        icon="percentage"
        title="Percentage of a number"
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
                <div class="calculator-base__form-group">
                    <label class="form__label">Percentage Value</label>
                    <div class="form__input-wrapper">
                        <InputNumber
                            v-model="formData.percentage"
                            class="form__input"
                            placeholder="Enter percentage"
                            :min="MIN_PERCENTAGE"
                            :max="MAX_PERCENTAGE"
                            @input="(e: InputNumberChangeEvent) => (formData.percentage = e.value)"
                        />
                        <span class="form__percentage-symbol">%</span>
                    </div>
                </div>

                <!-- Number Input -->
                <div class="form-group">
                    <label class="form__label">Number</label>
                    <InputNumber
                        v-model="formData.number"
                        class="form__input"
                        :min="MIN_NUMBER"
                        :max="MAX_NUMBER"
                        placeholder="Enter number"
                        @input="(e: InputNumberChangeEvent) => (formData.number = e.value)"
                    />
                </div>

                <!-- Common Percentages -->
                <div class="form__percentage-buttons">
                    <Button
                        v-for="p in COMMON_PERCENTAGES"
                        :key="p"
                        class="p-button-outlined"
                        :title="`Set percentage value to ${p}%`"
                        @click="setPercentage(p)"
                    >
                        {{ p }}%
                    </Button>
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
interface PercentageFormData {
    percentage: number | null;
    number: number | null;
}

interface InputNumberChangeEvent {
    value: number | null;
}

// Constants
const MIN_PERCENTAGE = 0;
const MAX_PERCENTAGE = 1000000;
const MIN_NUMBER = 0;
const MAX_NUMBER = 1000000;
const COMMON_PERCENTAGES = [25, 50, 75, 100] as const;

const explanation = `
<p>To calculate a percentage of a number:</p>
<ol>
    <li>Multiply the number by the percentage</li>
    <li>Divide by 100</li>
    <li>Use the formula:</li>
    <p class="formula">
    <math>
        <mrow>
            <mi>Result</mi>
            <mo>=</mo>
            <mfrac>
                <mrow>
                    <mi>Number</mi>
                    <mo>x</mo>
                    <mi>Percentage</mi>
                </mrow>
                <mrow>
                    <mi>100</mi>
                </mrow>
            </mfrac>
        </mrow>
    </math>
</p>
</ol>
`;

// Composables
const { validateForm } = useFormValidation();

// State
const result = ref<string | undefined>(undefined);
const resultFormula = ref<string | undefined>(undefined);
const history = ref<string[]>([]);

// Initial form state
const formData = ref<PercentageFormData>({
    percentage: null,
    number: null,
});

// Computed
const isFormValid = computed(() => {
    return validateForm({
        percentage:
            (formData.value.percentage ?? 0) > 0 &&
            (formData.value.percentage ?? 0) <= MAX_PERCENTAGE,
        number: (formData.value.number ?? 0) >= 0 && (formData.value.number ?? 0) <= MAX_NUMBER,
    });
});

const setPercentage = (value: number) => {
    formData.value.percentage = value;
};

const formatNumber = (num: number): string => {
    return new Intl.NumberFormat().format(num);
};

const calculate = () => {
    if (!isFormValid.value || !formData.value.percentage || !formData.value.number) return;

    try {
        const calculatedResult = (formData.value.percentage * formData.value.number) / 100;
        result.value = formatNumber(calculatedResult);

        const formattedNumber = formatNumber(formData.value.number);
        const formattedResult = formatNumber(calculatedResult);

        resultFormula.value = `${formData.value.percentage}% of ${formattedNumber} = ${formattedResult}`;

        // Add calculation to history with more detailed information
        history.value = [
            `${formData.value.percentage}% × ${formattedNumber} ÷ 100 = ${formattedResult}`,
            ...history.value.slice(0, 4),
        ];
    } catch (err) {
        result.value = undefined;
        resultFormula.value = undefined;
    }
};

const resetForm = () => {
    formData.value = {
        percentage: null,
        number: null,
    };
    result.value = undefined;
    resultFormula.value = undefined;
};
</script>
