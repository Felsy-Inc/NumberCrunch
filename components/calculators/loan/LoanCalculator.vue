<template>
    <CalculatorBase
        color="emerald"
        icon="credit-card"
        title="Loan Calculator"
        :explanation="explanation"
        :can-calculate="canCalculate"
        :result="result"
        :result-formula="resultFormula"
        :history="history"
        @calculate="calculate"
        @clear="clear"
    >
        <template #content>
            <div>
                <label class="calculator-base__label">Currency</label>
                <Dropdown
                    v-model="selectedCurrency"
                    :options="currencies"
                    optionLabel="label"
                    optionValue="value"
                    class="calculator-base__input"
                />
            </div>

            <div>
                <label class="calculator-base__label">Loan Amount</label>
                <InputNumber
                    class="calculator-base__input"
                    v-model="loanAmount"
                    :min="0"
                    mode="currency"
                    :currency="selectedCurrency"
                    placeholder="Enter loan amount"
                />
            </div>

            <div>
                <label class="calculator-base__label">Annual Interest Rate</label>
                <div class="calculator-base__input-wrapper">
                    <InputNumber
                        class="calculator-base__input"
                        v-model="interestRate"
                        :min="0"
                        :max="100"
                        :minFractionDigits="2"
                        :maxFractionDigits="2"
                        placeholder="Enter interest rate"
                    />
                    <span class="calculator-base__percentage-symbol">%</span>
                </div>
            </div>

            <div>
                <label class="calculator-base__label">Loan Term</label>
                <div class="calculator-base__radio-group">
                    <RadioButton v-model="termUnit" value="years" inputId="years" />
                    <label for="years">Years</label>
                    <RadioButton v-model="termUnit" value="months" inputId="months" />
                    <label for="months">Months</label>
                </div>
                <InputNumber
                    class="calculator-base__input"
                    v-model="loanTerm"
                    :min="1"
                    :max="termUnit === 'years' ? 100 : 1200"
                    :placeholder="`Enter loan term in ${termUnit}`"
                />
            </div>

            <!-- Common Terms -->
            <!-- <div class="calculator-base__percentage-buttons">
                <Button
                    v-for="term in commonTerms"
                    class="p-button-outlined"
                    :title="`Set loan term to ${term} years`"
                    :key="term"
                    @click="setTermFromYears(term)"
                >
                    {{ term }} years
                </Button>
            </div> -->
        </template>
    </CalculatorBase>
</template>

<script setup>
import CalculatorBase from '~/components/calculators/CalculatorBase.vue';
import { ref, computed, watch } from 'vue';

// Meta
const explanation = `
To calculate monthly loan payments:<br />
1. Convert annual interest rate to monthly (divide by 12 and 100)<br />
2. Convert loan term to months (multiply by 12)<br />
3. Use the formula: P = L[c(1 + c)^n]/[(1 + c)^n - 1]<br />
Where:<br />
P = Monthly Payment<br />
L = Loan Amount<br />
c = Monthly Interest Rate<br />
n = Total Number of Months
`;

// Calculator
const commonTerms = [15, 20, 25, 30];
const loanAmount = ref(null);
const interestRate = ref(null);
const loanTerm = ref(null);
const result = ref(null);
const resultFormula = ref(null);
const history = ref([]);
const termUnit = ref('years');
const selectedCurrency = ref('EUR');
const currencies = [
    { label: 'Euro (EUR)', value: 'EUR' },
    { label: 'US Dollar (USD)', value: 'USD' },
    { label: 'British Pound (GBP)', value: 'GBP' },
    { label: 'Swiss Franc (CHF)', value: 'CHF' },
    { label: 'Japanese Yen (JPY)', value: 'JPY' },
    { label: 'Canadian Dollar (CAD)', value: 'CAD' },
    { label: 'Australian Dollar (AUD)', value: 'AUD' },
    { label: 'Chinese Yuan (CNY)', value: 'CNY' },
    { label: 'Indian Rupee (INR)', value: 'INR' },
    { label: 'Brazilian Real (BRL)', value: 'BRL' },
    { label: 'South African Rand (ZAR)', value: 'ZAR' },
    { label: 'Swedish Krona (SEK)', value: 'SEK' },
    { label: 'Norwegian Krone (NOK)', value: 'NOK' },
    { label: 'Danish Krone (DKK)', value: 'DKK' },
    { label: 'New Zealand Dollar (NZD)', value: 'NZD' },
];

const canCalculate = computed(
    () => Boolean(loanAmount.value) && Boolean(interestRate.value) && Boolean(loanTerm.value)
);

const calculate = () => {
    const principal = loanAmount.value;
    const monthlyRate = interestRate.value / 100 / 12;
    const totalMonths = termUnit.value === 'years' ? loanTerm.value * 12 : loanTerm.value;

    const monthlyPayment =
        (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const totalPayment = monthlyPayment * totalMonths;
    const totalInterest = totalPayment - principal;

    result.value = formatCurrency(monthlyPayment);
    resultFormula.value = `Monthly Payment: ${formatCurrency(
        monthlyPayment
    )}\nTotal Interest: ${formatCurrency(totalInterest)}\nTotal Payment: ${formatCurrency(
        totalPayment
    )}`;

    history.value = [
        `${formatCurrency(principal)} loan at ${interestRate.value}% for ${loanTerm.value} ${
            termUnit.value
        } = ${formatCurrency(monthlyPayment)}/month`,
        ...history.value.slice(0, 4),
    ];
};

const formatCurrency = (num) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: selectedCurrency.value,
    }).format(num);

const clear = () => {
    loanAmount.value = null;
    interestRate.value = null;
    loanTerm.value = null;
    result.value = null;
    resultFormula.value = null;
    termUnit.value = 'years';
    selectedCurrency.value = 'EUR';
};

const setTermFromYears = (years) => {
    loanTerm.value = termUnit.value === 'years' ? years : years * 12;
};

watch(termUnit, (newUnit, oldUnit) => {
    if (loanTerm.value) {
        if (newUnit === 'months' && oldUnit === 'years') {
            loanTerm.value = loanTerm.value * 12;
        } else if (newUnit === 'years' && oldUnit === 'months') {
            loanTerm.value = Math.round(loanTerm.value / 12);
        }
    }
});
</script>
