<template>
    <CalculatorBase
        color="emerald"
        icon="percentage"
        title="Percentage of a number"
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
                <label class="calculator-base__label">Percentage Value</label>
                <div class="calculator-base__input-wrapper">
                    <InputNumber
                        class="calculator-base__input"
                        v-model="percentage"
                        :min="0"
                        :max="1000000"
                        placeholder="Enter percentage"
                    />
                    <span class="calculator-base__percentage-symbol">%</span>
                </div>
            </div>

            <div>
                <label class="calculator-base__label">Number</label>
                <InputNumber
                    class="calculator-base__input"
                    v-model="number"
                    placeholder="Enter number"
                />
            </div>

            <!-- Common Percentages -->
            <div class="calculator-base__percentage-buttons">
                <Button
                    v-for="p in commonPercentages"
                    class="p-button-outlined"
                    :title="`Set percentage value to ${p}%`"
                    :key="p"
                    @click="percentage = p"
                >
                    {{ p }}%
                </Button>
            </div>
        </template>
    </CalculatorBase>
</template>

<script setup>
import CalculatorBase from '~/components/calculators/CalculatorBase.vue';
import { ref } from 'vue';

// Meta
const explanation = `
To calculate a percentage of a number:<br />
1. Multiply the number by the percentage<br />
2. Divide by 100<br />
Formula: (Percentage × Number) ÷ 100
`;

// Calculator
const commonPercentages = [25, 50, 75, 100];
const percentage = ref(null);
const number = ref(null);
const result = ref(null);
const resultFormula = ref(null);
const history = ref([]);

const canCalculate = computed(() => Boolean(percentage.value) && Boolean(number.value));

const calculate = () => {
    const calculatedResult = (percentage.value * number.value) / 100;
    result.value = formatNumber(calculatedResult);
    resultFormula.value = `${percentage.value}% of ${formatNumber(number.value)} = ${result.value}`;
    history.value = [
        `${percentage.value}% of ${formatNumber(number.value)} = ${result.value}`,
        ...history.value.slice(0, 4),
    ];
};

const formatNumber = (num) => new Intl.NumberFormat().format(num);

const clear = () => {
    percentage.value = null;
    number.value = null;
    result.value = null;
    error.value = '';
};
</script>
