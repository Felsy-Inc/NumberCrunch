<template>
    <CalculatorBase
        title="Percentage of a Number"
        :result="result"
        @calculate="calculatePercentage"
    >
        <div>
            <label for="percentage" class="block font-semibold">Percentage</label>
            <InputGroup class="mt-2">
                <InputNumber
                    id="percentage"
                    v-model="percentage"
                    placeholder="Enter a percentage"
                    :minFractionDigits="0"
                    :maxFractionDigits="5"
                    :useGrouping="false"
                />
                <InputGroupAddon>%</InputGroupAddon>
            </InputGroup>
        </div>
        <div>
            <label for="number" class="block font-semibold">Number</label>
            <InputGroup class="mt-2">
                <InputNumber
                    id="number"
                    v-model="number"
                    placeholder="Enter a number"
                    :minFractionDigits="0"
                    :maxFractionDigits="5"
                    :useGrouping="false"
                />
            </InputGroup>
        </div>
    </CalculatorBase>
</template>

<script setup>
import { ref } from 'vue';
import CalculatorBase from '~/components/calculators/CalculatorBase.vue';

const number = ref(null);
const percentage = ref(null);
const result = ref(null);

const calculatePercentage = () => {
    if (number.value !== null && percentage.value !== null) {
        let _result = (number.value * (percentage.value / 100)).toFixed(2);
        result.value = parseFloat(_result).toString();
    } else {
        result.value = null;
    }
};
</script>
