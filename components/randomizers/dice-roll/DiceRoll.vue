<template>
    <CalculatorBase
        color="violet"
        icon="pi pi-question"
        title="Dice Roll Calculator"
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
                <!-- Number of Dice Input -->
                <div class="calculator-base__form-group">
                    <label class="form__label">Number of Dice</label>
                    <InputNumber
                        v-model="formData.numberOfDice"
                        class="form__input"
                        placeholder="How many dice?"
                        :min="1"
                        :max="10"
                        @input="(e) => (formData.numberOfDice = Number(e.value))"
                    />
                </div>

                <!-- Sides per Die Input -->
                <div class="calculator-base__form-group">
                    <label class="form__label">Sides per Die</label>
                    <Dropdown
                        v-model="formData.sides"
                        class="form__input w-full"
                        :options="diceOptions"
                        placeholder="Select dice type"
                        optionLabel="label"
                        optionValue="value"
                    />
                </div>

                <!-- Sum Results Toggle -->
                <div class="calculator-base__form-group">
                    <div class="flex align-items-center">
                        <Checkbox v-model="formData.sumResults" :binary="true" class="mr-2" />
                        <label>Sum all dice results</label>
                    </div>
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
interface DiceRollFormData {
    numberOfDice: number | null;
    sides: number | null;
    sumResults: boolean;
}

// Constants
const diceOptions = [
    { label: 'D4 (4 sides)', value: 4 },
    { label: 'D6 (6 sides)', value: 6 },
    { label: 'D8 (8 sides)', value: 8 },
    { label: 'D10 (10 sides)', value: 10 },
    { label: 'D12 (12 sides)', value: 12 },
    { label: 'D20 (20 sides)', value: 20 },
    { label: 'D100 (100 sides)', value: 100 },
];

const explanation = `
<p>Roll virtual dice with this calculator:</p>
<ul>
    <li>Choose how many dice to roll (1-10)</li>
    <li>Select the type of dice (number of sides)</li>
    <li>Optionally sum all dice results together</li>
    <li>Click roll to see the results!</li>
</ul>
`;

// Composables
const { validateForm } = useFormValidation();

// State
const result = ref<string | undefined>(undefined);
const resultFormula = ref<string | undefined>(undefined);
const history = ref<string[]>([]);

// Initial form state
const formData = ref<DiceRollFormData>({
    numberOfDice: null,
    sides: null,
    sumResults: false,
});

// Computed
const isFormValid = computed(() => {
    const validation = {
        numberOfDice: formData.value.numberOfDice !== null && formData.value.numberOfDice > 0,
        sides: formData.value.sides !== null,
    };

    return validateForm(validation);
});

const calculate = () => {
    if (!isFormValid.value || !formData.value.numberOfDice || !formData.value.sides) return;

    try {
        const rolls: number[] = [];
        for (let i = 0; i < formData.value.numberOfDice; i++) {
            rolls.push(Math.floor(Math.random() * formData.value.sides) + 1);
        }

        const sum = rolls.reduce((acc, curr) => acc + curr, 0);

        if (formData.value.sumResults) {
            result.value = sum.toString();
            resultFormula.value = `Sum of ${formData.value.numberOfDice}d${formData.value.sides}`;
        } else {
            result.value = rolls.join(', ');
            resultFormula.value = `${formData.value.numberOfDice}d${formData.value.sides}`;
        }

        // Add roll to history
        const historyEntry = formData.value.sumResults
            ? `Rolled ${formData.value.numberOfDice}d${formData.value.sides}: ${rolls.join(
                  ', '
              )} = ${sum}`
            : `Rolled ${formData.value.numberOfDice}d${formData.value.sides}: ${rolls.join(', ')}`;

        history.value = [historyEntry, ...history.value.slice(0, 4)];
    } catch (err) {
        result.value = undefined;
        resultFormula.value = undefined;
    }
};

const resetForm = () => {
    formData.value = {
        numberOfDice: null,
        sides: null,
        sumResults: false,
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
