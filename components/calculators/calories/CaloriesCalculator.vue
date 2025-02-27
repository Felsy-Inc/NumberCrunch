<template>
    <CalculatorBase
        color="rose"
        icon="apple"
        title="Calories Calculator"
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
                    <label class="form__label">Personal Information</label>
                    <div class="form__input-wrapper">
                        <div class="form__radio-group">
                            <RadioButton v-model="formData.gender" value="male" inputId="male" />
                            <label for="male">Male</label>
                            <RadioButton
                                v-model="formData.gender"
                                value="female"
                                inputId="female"
                            />
                            <label for="female">Female</label>
                        </div>
                        <InputNumber
                            v-model="formData.age"
                            class="form__input"
                            placeholder="Age"
                            :min="15"
                            :max="100"
                            @input="(e) => (formData.age = Number(e.value))"
                        />
                    </div>
                </div>

                <div class="form-group">
                    <label class="form__label">Activity Level</label>
                    <Dropdown
                        v-model="formData.activityLevel"
                        :options="activityLevels"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Select activity level"
                        class="form__input"
                    />
                </div>

                <div class="form-group">
                    <label class="form__label">Goal</label>
                    <Dropdown
                        v-model="formData.goal"
                        :options="goals"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Select your goal"
                        class="form__input"
                    />
                </div>

                <div class="form-group">
                    <label class="form__label">Current Weight</label>
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

                <div class="form-group">
                    <label class="form__label">Height</label>
                    <div class="form__radio-group">
                        <RadioButton v-model="formData.heightUnit" value="cm" inputId="cm" />
                        <label for="cm">Centimeters</label>
                        <RadioButton v-model="formData.heightUnit" value="in" inputId="in" />
                        <label for="in">Feet/Inches</label>
                    </div>
                    <InputNumber
                        v-if="formData.heightUnit === 'cm'"
                        v-model="formData.height"
                        class="form__input"
                        placeholder="Enter height in cm"
                        :min="1"
                        :max="300"
                        suffix=" cm"
                        @input="(e) => (formData.height = Number(e.value))"
                    />
                    <div v-else class="form__input-group">
                        <InputNumber
                            v-model="formData.feet"
                            class="form__input mb-2"
                            placeholder="Feet"
                            :min="1"
                            :max="9"
                            suffix=" ft"
                            @input="
                                (e) => updateHeightFromFeetInches(Number(e.value), formData.inches)
                            "
                        />
                        <InputNumber
                            v-model="formData.inches"
                            class="form__input"
                            placeholder="Inches"
                            :min="0"
                            :max="11"
                            suffix=" in"
                            @input="
                                (e) => updateHeightFromFeetInches(formData.feet, Number(e.value))
                            "
                        />
                    </div>
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
interface CaloriesFormData {
    age: number | null;
    gender: 'male' | 'female';
    activityLevel: string;
    goal: string;
    weightUnit: 'kg' | 'lb';
    weight: number | null;
    heightUnit: 'cm' | 'in';
    height: number | null;
    feet: number | null;
    inches: number | null;
}

// Constants
const activityLevels = [
    { label: 'Sedentary (office job)', value: 1.2 },
    { label: 'Light Exercise (1-2 days/week)', value: 1.375 },
    { label: 'Moderate Exercise (3-5 days/week)', value: 1.55 },
    { label: 'Heavy Exercise (6-7 days/week)', value: 1.725 },
    { label: 'Athlete (2x per day)', value: 1.9 },
];

const goals = [
    { label: 'Weight Loss', value: -500 },
    { label: 'Maintain Weight', value: 0 },
    { label: 'Weight Gain', value: 500 },
];

// Meta
const explanation = `
<p>Daily calorie needs are calculated using the Mifflin-St Jeor equation:</p>
<p>For men: BMR = (10 × weight) + (6.25 × height) - (5 × age) + 5</p>
<p>For women: BMR = (10 × weight) + (6.25 × height) - (5 × age) - 161</p>
<p>Total daily calories = BMR × Activity Level Factor</p>
<p>Recommended adjustments:</p>
<ul>
    <li>Weight Loss: -500 calories/day</li>
    <li>Weight Gain: +500 calories/day</li>
</ul>
`;

// Refs
const result = ref<string | undefined>(undefined);
const resultFormula = ref<string | undefined>(undefined);
const history = ref<string[]>([]);

// Composables
const { validateForm } = useFormValidation();

// Initial form state
const formData = ref<CaloriesFormData>({
    age: null,
    gender: 'male',
    activityLevel: '',
    goal: '',
    weightUnit: 'kg',
    weight: null,
    heightUnit: 'cm',
    height: null,
    feet: null,
    inches: null,
});

// Computed
const weightInKg = computed(() => {
    if (!formData.value.weight) return 0;
    return formData.value.weightUnit === 'kg'
        ? formData.value.weight
        : formData.value.weight * 0.453592;
});

const heightInCm = computed(() => {
    if (!formData.value.height) return 0;
    return formData.value.heightUnit === 'cm'
        ? formData.value.height
        : formData.value.height * 2.54;
});

const isFormValid = computed(() => {
    return validateForm({
        age: formData.value.age !== null && formData.value.age > 0,
        weight: weightInKg.value > 0,
        height: heightInCm.value > 0,
        activityLevel: formData.value.activityLevel !== '',
        goal: formData.value.goal !== '',
    });
});

// Methods
const calculate = () => {
    if (!isFormValid.value) return;

    // Calculate BMR using the complete Mifflin-St Jeor equation
    const bmr =
        formData.value.gender === 'male'
            ? 10 * weightInKg.value + 6.25 * heightInCm.value - 5 * formData.value.age! + 5
            : 10 * weightInKg.value + 6.25 * heightInCm.value - 5 * formData.value.age! - 161;

    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdee = bmr * Number(formData.value.activityLevel);

    // Adjust for goal
    const goalCalories = tdee + Number(formData.value.goal);

    result.value = Math.round(goalCalories).toString();
    resultFormula.value = `
        Base Metabolic Rate: ${Math.round(bmr)} calories<br>
        Daily Calories with Activity: ${Math.round(tdee)} calories<br>
        Adjusted for Goal: ${Math.round(goalCalories)} calories
    `;

    history.value = [
        `Weight: ${formData.value.weight}${formData.value.weightUnit}, ` +
            `Activity: ${
                activityLevels.find((a) => a.value === Number(formData.value.activityLevel))?.label
            } = ` +
            `${Math.round(goalCalories)} calories/day`,
        ...history.value.slice(0, 4),
    ];
};

const resetForm = () => {
    formData.value = {
        age: null,
        gender: 'male',
        activityLevel: '',
        goal: '',
        weightUnit: 'kg',
        weight: null,
        heightUnit: 'cm',
        height: null,
        feet: null,
        inches: null,
    };
    result.value = undefined;
    resultFormula.value = undefined;
};

const updateHeightFromFeetInches = (feet: number | null, inches: number | null) => {
    formData.value.feet = feet;
    formData.value.inches = inches;
    if (feet && inches !== null) {
        formData.value.height = feet * 12 + inches;
    } else {
        formData.value.height = null;
    }
};

// Watch for unit changes
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

watch(
    () => formData.value.heightUnit,
    (newUnit) => {
        if (formData.value.height) {
            if (newUnit === 'cm') {
                formData.value.height = Math.round(formData.value.height * 2.54);
            } else {
                const totalInches = Math.round(formData.value.height / 2.54);
                formData.value.feet = Math.floor(totalInches / 12);
                formData.value.inches = totalInches % 12;
                formData.value.height = totalInches;
            }
        }
    }
);
</script>
