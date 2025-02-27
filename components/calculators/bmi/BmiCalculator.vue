<template>
    <CalculatorBase
        color="rose"
        icon="user"
        title="BMI Calculator"
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
                    <label class="form__label">Height</label>
                    <div class="form__radio-group">
                        <RadioButton v-model="formData.heightUnit" value="cm" inputId="cm" />
                        <label for="cm">Centimeters</label>
                        <RadioButton v-model="formData.heightUnit" value="ft" inputId="ft" />
                        <label for="ft">Feet/Inches</label>
                    </div>
                    <template v-if="formData.heightUnit === 'cm'">
                        <InputNumber
                            v-model="formData.heightCm"
                            class="form__input"
                            placeholder="Enter height in cm"
                            suffix=" cm"
                            :min="1"
                            :max="300"
                            @input="(e) => (formData.heightCm = Number(e.value))"
                        />
                    </template>
                    <template v-else>
                        <div class="form__input-wrapper">
                            <InputNumber
                                v-model="formData.heightFt"
                                class="form__input mb-2"
                                placeholder="Feet"
                                suffix=" ft"
                                :min="0"
                                :max="9"
                                @input="(e) => (formData.heightFt = Number(e.value))"
                            />
                            <InputNumber
                                v-model="formData.heightIn"
                                class="form__input"
                                placeholder="Inches"
                                suffix=" in"
                                :min="0"
                                :max="11"
                                @input="(e) => (formData.heightIn = Number(e.value))"
                            />
                        </div>
                    </template>
                </div>

                <div class="form-group">
                    <label class="form__label">Weight</label>
                    <div class="form__radio-group">
                        <RadioButton v-model="formData.weightUnit" value="kg" inputId="kg" />
                        <label for="kg">Kilograms</label>
                        <RadioButton v-model="formData.weightUnit" value="lb" inputId="lb" />
                        <label for="lb">Pounds</label>
                    </div>
                    <InputNumber
                        v-model="formData.weight"
                        class="form__input"
                        :placeholder="`Enter weight in ${formData.weightUnit}`"
                        :min="1"
                        :max="formData.weightUnit === 'kg' ? 500 : 1100"
                        :suffix="` ${formData.weightUnit}`"
                        @input="(e) => (formData.weight = Number(e.value))"
                    />
                </div>
            </form>
        </template>
    </CalculatorBase>
</template>

<script setup lang="ts">
import CalculatorBase from '~/components/calculators/CalculatorBase.vue';
import { ref, computed, watch } from 'vue';
import { useFormValidation } from '~/composables/useFormValidation';

// Types
interface BmiFormData {
    heightUnit: 'cm' | 'ft';
    heightCm: number | null;
    heightFt: number | null;
    heightIn: number | null;
    weightUnit: 'kg' | 'lb';
    weight: number | null;
}

// Meta
const explanation = `
<p>Body Mass Index (BMI) is calculated using the formula:</p>
<p class="formula">
    <math>
        <mrow>
            <mi>BMI</mi>
            <mo>=</mo>
            <mfrac>
                <mrow><mi>weight</mi><mo>(kg)</mo></mrow>
                <mrow><mi>height</mi><mo>(m)</mo><msup><mn>2</mn></msup></mrow>
            </mfrac>
        </mrow>
    </math>
</p>
<p>BMI Categories:</p>
<ul>
    <li>Underweight: < 18.5</li>
    <li>Normal weight: 18.5 - 24.9</li>
    <li>Overweight: 25 - 29.9</li>
    <li>Obese: ≥ 30</li>
</ul>
`;

// Refs
const result = ref<string | undefined>(undefined);
const resultFormula = ref<string | undefined>(undefined);
const history = ref<string[]>([]);

// Composables
const { validateForm } = useFormValidation();

// Initial form state
const formData = ref<BmiFormData>({
    heightUnit: 'cm',
    heightCm: null,
    heightFt: null,
    heightIn: null,
    weightUnit: 'kg',
    weight: null,
});

// Computed
const heightInMeters = computed(() => {
    if (formData.value.heightUnit === 'cm' && formData.value.heightCm) {
        return formData.value.heightCm / 100;
    } else if (formData.value.heightUnit === 'ft' && formData.value.heightFt !== null) {
        const inches = formData.value.heightFt * 12 + (formData.value.heightIn || 0);
        return inches * 0.0254;
    }
    return 0;
});

const weightInKg = computed(() => {
    if (!formData.value.weight) return 0;
    return formData.value.weightUnit === 'kg'
        ? formData.value.weight
        : formData.value.weight * 0.453592;
});

const isFormValid = computed(() => {
    return validateForm({
        height: heightInMeters.value > 0,
        weight: weightInKg.value > 0,
    });
});

// Methods
const calculate = () => {
    if (!isFormValid.value) return;

    const bmi = weightInKg.value / (heightInMeters.value * heightInMeters.value);
    const category = getBmiCategory(bmi);

    result.value = bmi.toFixed(1);
    resultFormula.value = `BMI: ${bmi.toFixed(1)}<br>Category: ${category}`;

    const heightDisplay =
        formData.value.heightUnit === 'cm'
            ? `${formData.value.heightCm}cm`
            : `${formData.value.heightFt}'${formData.value.heightIn || 0}"`;

    const weightDisplay = `${formData.value.weight}${formData.value.weightUnit}`;

    history.value = [
        `Height: ${heightDisplay}, Weight: ${weightDisplay} = BMI: ${bmi.toFixed(1)} (${category})`,
        ...history.value.slice(0, 4),
    ];
};

const getBmiCategory = (bmi: number): string => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
};

const resetForm = () => {
    formData.value = {
        heightUnit: 'cm',
        heightCm: null,
        heightFt: null,
        heightIn: null,
        weightUnit: 'kg',
        weight: null,
    };
    result.value = undefined;
    resultFormula.value = undefined;
};

// Watch for unit changes
watch(
    () => formData.value.heightUnit,
    (newUnit) => {
        if (newUnit === 'cm') {
            if (formData.value.heightFt !== null) {
                const inches = formData.value.heightFt * 12 + (formData.value.heightIn || 0);
                formData.value.heightCm = Math.round(inches * 2.54);
            }
        } else {
            if (formData.value.heightCm !== null) {
                const inches = formData.value.heightCm / 2.54;
                formData.value.heightFt = Math.floor(inches / 12);
                formData.value.heightIn = Math.round(inches % 12);
            }
        }
    }
);

watch(
    () => formData.value.weightUnit,
    (newUnit) => {
        if (formData.value.weight) {
            if (newUnit === 'kg') {
                formData.value.weight = Math.round(formData.value.weight * 0.453592);
            } else {
                formData.value.weight = Math.round(formData.value.weight / 0.453592);
            }
        }
    }
);
</script>
