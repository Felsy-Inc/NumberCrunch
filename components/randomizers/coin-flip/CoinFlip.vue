<template>
    <CalculatorBase
        color="violet"
        icon="pi pi-question"
        title="Coin Flip Calculator"
        type="randomizer"
        :can-calculate="true"
        :explanation="explanation"
        :history="history"
        :result="result"
        :result-formula="resultFormula"
        @calculate="calculate"
        @clear="resetForm"
    >
        <template #content>
            <form @submit.prevent="calculate" class="calculator-base__form">
                <!-- Number of Flips Input -->
                <div class="calculator-base__form-group">
                    <label class="form__label">Number of Flips</label>
                    <InputNumber
                        v-model="formData.numberOfFlips"
                        class="form__input"
                        placeholder="How many flips?"
                        :min="1"
                        :max="10"
                        @input="(e) => (formData.numberOfFlips = Number(e.value))"
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
interface CoinFlipFormData {
    numberOfFlips: number | null;
}

const explanation = `
<p>Flip virtual coins with this calculator:</p>
<ul>
    <li>Choose how many coins to flip (1-10)</li>
    <li>Click flip to see the results!</li>
</ul>
`;

// Composables
const { validateForm } = useFormValidation();

// State
const result = ref<string | undefined>(undefined);
const resultFormula = ref<string | undefined>(undefined);
const history = ref<string[]>([]);

// Initial form state
const formData = ref<CoinFlipFormData>({
    numberOfFlips: 1,
});

// Computed
const isFormValid = computed(() => {
    return formData.value.numberOfFlips !== null && formData.value.numberOfFlips > 0;
});

const calculate = () => {
    if (!formData.value.numberOfFlips) return;

    try {
        const flips: string[] = [];
        for (let i = 0; i < formData.value.numberOfFlips; i++) {
            flips.push(Math.random() < 0.5 ? 'Heads' : 'Tails');
        }

        result.value = flips.join(', ');
        resultFormula.value = `${formData.value.numberOfFlips} coin flip${
            formData.value.numberOfFlips > 1 ? 's' : ''
        }`;

        // Add flip to history
        const historyEntry = `Flipped ${formData.value.numberOfFlips} coin${
            formData.value.numberOfFlips > 1 ? 's' : ''
        }: ${flips.join(', ')}`;

        history.value = [historyEntry, ...history.value.slice(0, 4)];
    } catch (err) {
        result.value = undefined;
        resultFormula.value = undefined;
    }
};

const resetForm = () => {
    formData.value = {
        numberOfFlips: null,
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
