<template>
    <CalculatorBase
        color="blue"
        icon="calculator"
        title="Basic Math Calculator"
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
                <!-- First Number Input -->
                <div class="calculator-base__form-group">
                    <label class="form__label">First Number</label>
                    <InputNumber
                        v-model="formData.firstNumber"
                        class="form__input"
                        placeholder="Enter first number"
                        :min="MIN_NUMBER"
                        :max="MAX_NUMBER"
                        @input="(e) => (formData.firstNumber = Number(e.value))"
                    />
                </div>

                <!-- Operation Selection -->
                <div class="calculator-base__form-group">
                    <label class="form__label">Operation</label>
                    <div class="form__operation-buttons">
                        <Button
                            v-for="op in OPERATIONS"
                            :key="op.symbol"
                            :class="[
                                formData.operation === op.symbol
                                    ? 'p-button-primary'
                                    : 'p-button-outlined',
                            ]"
                            :title="op.name"
                            @click="setOperation(op.symbol)"
                        >
                            {{ op.symbol }}
                        </Button>
                    </div>
                </div>

                <!-- Second Number Input -->
                <div class="calculator-base__form-group">
                    <label class="form__label">Second Number</label>
                    <InputNumber
                        v-model="formData.secondNumber"
                        class="form__input"
                        :min="MIN_NUMBER"
                        :max="MAX_NUMBER"
                        placeholder="Enter second number"
                        @input="(e) => (formData.secondNumber = Number(e.value))"
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
interface BasicMathFormData {
    firstNumber: number | null;
    operation: string;
    secondNumber: number | null;
}

// Constants
const MIN_NUMBER = -1000000;
const MAX_NUMBER = 1000000;
const OPERATIONS = [
    { symbol: '+', name: 'Addition' },
    { symbol: '-', name: 'Subtraction' },
    { symbol: '×', name: 'Multiplication' },
    { symbol: '÷', name: 'Division' },
    { symbol: '%', name: 'Modulo' },
    { symbol: '^', name: 'Power' },
] as const;

const explanation = `
<p>This calculator performs basic mathematical operations:</p>
<ul>
    <li>Addition (+): Adds two numbers together</li>
    <li>Subtraction (-): Subtracts the second number from the first</li>
    <li>Multiplication (×): Multiplies two numbers</li>
    <li>Division (÷): Divides the first number by the second</li>
    <li>Modulo (%): Returns the remainder of division</li>
    <li>Power (^): Raises the first number to the power of the second</li>
</ul>
`;

// Composables
const { validateForm } = useFormValidation();

// State
const result = ref<string | undefined>(undefined);
const resultFormula = ref<string | undefined>(undefined);
const history = ref<string[]>([]);

// Initial form state
const formData = ref<BasicMathFormData>({
    firstNumber: null,
    operation: '+',
    secondNumber: null,
});

// Computed
const isFormValid = computed(() => {
    const validation = {
        firstNumber: formData.value.firstNumber !== null,
        secondNumber: formData.value.secondNumber !== null,
        operation: OPERATIONS.some((op) => op.symbol === formData.value.operation),
        divisionByZero: !(formData.value.operation === '÷' && formData.value.secondNumber === 0),
    };

    return validateForm(validation);
});

const setOperation = (operation: string) => {
    formData.value.operation = operation;
};

const formatNumber = (num: number): string => {
    return new Intl.NumberFormat().format(num);
};

const calculate = () => {
    if (
        !isFormValid.value ||
        formData.value.firstNumber === null ||
        formData.value.secondNumber === null
    )
        return;

    try {
        let calculatedResult: number;
        const a = formData.value.firstNumber;
        const b = formData.value.secondNumber;

        switch (formData.value.operation) {
            case '+':
                calculatedResult = a + b;
                break;
            case '-':
                calculatedResult = a - b;
                break;
            case '×':
                calculatedResult = a * b;
                break;
            case '÷':
                if (b === 0) throw new Error('Division by zero');
                calculatedResult = a / b;
                break;
            case '%':
                calculatedResult = a % b;
                break;
            case '^':
                calculatedResult = Math.pow(a, b);
                break;
            default:
                throw new Error('Invalid operation');
        }

        result.value = formatNumber(calculatedResult);

        const formattedFirst = formatNumber(a);
        const formattedSecond = formatNumber(b);
        const formattedResult = formatNumber(calculatedResult);

        resultFormula.value = `${formattedFirst} ${formData.value.operation} ${formattedSecond} = ${formattedResult}`;

        // Add calculation to history
        history.value = [
            `${formattedFirst} ${formData.value.operation} ${formattedSecond} = ${formattedResult}`,
            ...history.value.slice(0, 4),
        ];
    } catch (err) {
        result.value = undefined;
        resultFormula.value = undefined;
    }
};

const resetForm = () => {
    formData.value = {
        firstNumber: null,
        operation: '+',
        secondNumber: null,
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
