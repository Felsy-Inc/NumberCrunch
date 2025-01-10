<template>
    <CalculatorBase
        color="emerald"
        icon="credit-card"
        title="Loan Calculator"
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
                <div class="form-group">
                    <label class="form__label">Currency</label>
                    <Select
                        v-model="formData.currency"
                        class="form__input"
                        optionLabel="label"
                        optionValue="value"
                        :options="availableCurrencies"
                    />
                </div>

                <div class="form-group">
                    <label class="form__label">Loan Amount</label>
                    <InputNumber
                        v-model="formData.loanAmount"
                        class="form__input"
                        placeholder="Enter loan amount"
                        mode="currency"
                        :currency="formData.currency"
                        :min="0"
                        @input="(e: InputNumberChangeEvent) => (formData.loanAmount = e.value)"
                    />
                </div>

                <div class="form-group">
                    <label class="form__label">Annual Interest Rate</label>
                    <div class="form__input-wrapper">
                        <InputNumber
                            v-model="formData.interestRate"
                            class="form__input"
                            placeholder="Enter interest rate"
                            :min="0"
                            :max="100"
                            :minFractionDigits="2"
                            :maxFractionDigits="2"
                            @input="(e: InputNumberChangeEvent) => (formData.interestRate = e.value)"
                        />
                        <span class="form__percentage-symbol">%</span>
                    </div>
                </div>

                <div class="form-group">
                    <label class="form__label">Loan Term</label>
                    <div class="form__radio-group">
                        <RadioButton v-model="formData.termUnit" value="years" inputId="years" />
                        <label for="years">Years</label>
                        <RadioButton v-model="formData.termUnit" value="months" inputId="months" />
                        <label for="months">Months</label>
                    </div>
                    <InputNumber
                        v-model="formData.loanTerm"
                        class="form__input"
                        :min="1"
                        :max="formData.termUnit === 'years' ? 100 : 1200"
                        :placeholder="`Enter loan term in ${formData.termUnit}`"
                        @input="(e: InputNumberChangeEvent) => (formData.loanTerm = e.value)"
                    />
                </div>
            </form>
        </template>
    </CalculatorBase>
</template>

<script setup lang="ts">
import CalculatorBase from '~/components/calculators/CalculatorBase.vue';
import { ref, computed, watch } from 'vue';
import { useCurrencyFormatter } from '~/composables/useCurrencyFormatter';
import { useFormValidation } from '~/composables/useFormValidation';

// Types
interface LoanFormData {
    loanAmount: number | null;
    interestRate: number | null;
    loanTerm: number | null;
    currency: string;
    termUnit: 'years' | 'months';
}

interface InputNumberChangeEvent {
    value: number | null;
}

// Meta
const explanation = `
<p>To calculate monthly loan payments:</p>
<ol>
    <li>Convert annual interest rate to monthly (divide by 12 and 100)</li>
    <li>Convert loan term to months</li>
    <li>Use the formula:</li>
    <p class="formula">
    <math>
        <mrow>
            <mi>P</mi>
            <mo>=</mo>
            <mi>L</mi>
            <mo>[</mo>
            <mi>c</mi>
            <mo>(</mo>
            <mn>1</mn>
            <mo>+</mo>
            <mi>c</mi>
            <mo>)</mo>
            <mi>n</mi>
            <mo>]</mo>
            <mo>/</mo>
            <mo>[</mo>
            <mo>(</mo>
            <mn>1</mn>
            <mo>+</mo>
            <mi>c</mi>
            <mo>)</mo>
            <mi>n</mi>
            <mo>-</mo>
            <mn>1</mn>
            <mo>]</mo>
        </mrow>
    </math>
</p>
<p>
    P = Monthly Payment<br>
    L = Loan Amount<br>
    c = Monthly Interest Rate<br>
    n = Total Number of Months
</p>
</ol>
`;

// Calculator
const commonTerms = [15, 20, 25, 30];
const result = ref<string | undefined>(undefined);
const resultFormula = ref<string | undefined>(undefined);
const history = ref<string[]>([]);

// Initial form state
const formData = ref<LoanFormData>({
    loanAmount: null,
    interestRate: null,
    loanTerm: null,
    currency: 'EUR',
    termUnit: 'years',
});

// Composables
const { formatCurrency, availableCurrencies } = useCurrencyFormatter();
const { validateForm } = useFormValidation();

// Computed
const isFormValid = computed(() => {
    return validateForm({
        loanAmount: (formData.value.loanAmount ?? 0) > 0,
        interestRate:
            (formData.value.interestRate ?? 0) > 0 && (formData.value.interestRate ?? 0) <= 100,
        loanTerm: (formData.value.loanTerm ?? 0) > 0,
    });
});

const monthlyTermInMonths = computed(() => {
    if (!formData.value.loanTerm) return 0;
    return formData.value.termUnit === 'years'
        ? formData.value.loanTerm * 12
        : formData.value.loanTerm;
});

// Methods
const calculate = () => {
    if (!isFormValid.value) return;

    const { loanAmount, interestRate } = formData.value;
    const monthlyRate = (interestRate as number) / 100 / 12;
    const totalMonths = monthlyTermInMonths.value;

    const monthlyPayment = calculateMonthlyPayment(loanAmount as number, monthlyRate, totalMonths);
    updateResults(monthlyPayment, loanAmount as number, totalMonths);
};

const calculateMonthlyPayment = (
    principal: number,
    monthlyRate: number,
    totalMonths: number
): number => {
    return (
        (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
    );
};

const updateResults = (monthlyPayment: number, principal: number, totalMonths: number) => {
    const totalPayment = monthlyPayment * totalMonths;
    const totalInterest = totalPayment - principal;

    result.value = formatCurrency(monthlyPayment, formData.value.currency);
    resultFormula.value = `Monthly Payment: ${formatCurrency(
        monthlyPayment,
        formData.value.currency
    )}<br>Total Interest: ${formatCurrency(
        totalInterest,
        formData.value.currency
    )}<br>Total Payment: ${formatCurrency(totalPayment, formData.value.currency)}`;

    history.value = [
        `${formatCurrency(principal, formData.value.currency)} loan at ${
            formData.value.interestRate
        }% for ${formData.value.loanTerm} ${formData.value.termUnit} = ${formatCurrency(
            monthlyPayment,
            formData.value.currency
        )}/month`,
        ...history.value.slice(0, 4),
    ];
};

const resetForm = () => {
    formData.value = {
        loanAmount: null,
        interestRate: null,
        loanTerm: null,
        currency: 'EUR',
        termUnit: 'years',
    };
    result.value = undefined;
    resultFormula.value = undefined;
};

const setTermFromYears = (years: number) => {
    formData.value.loanTerm = formData.value.termUnit === 'years' ? years : years * 12;
};

watch(
    () => formData.value.termUnit,
    (newUnit, oldUnit) => {
        if (formData.value.loanTerm) {
            if (newUnit === 'months' && oldUnit === 'years') {
                formData.value.loanTerm = formData.value.loanTerm * 12;
            } else if (newUnit === 'years' && oldUnit === 'months') {
                formData.value.loanTerm = Math.round(formData.value.loanTerm / 12);
            }
        }
    }
);
</script>
