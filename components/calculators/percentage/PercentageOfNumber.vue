<template>
    <CalculatorBase
        color="emerald"
        icon="percentage"
        title="Percentage of a number"
        :explanation="explanation"
    >
    </CalculatorBase>
</template>

<script setup>
import CalculatorBase from '~/components/calculators/CalculatorBase.vue';
const explanation = `
To calculate a percentage of a number:<br />
1. Multiply the number by the percentage<br />
2. Divide by 100<br />
Formula: (Percentage × Number) ÷ 100
`;
</script>
