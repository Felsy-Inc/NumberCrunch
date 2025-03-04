<template>
    <CalculatorBase
        color="blue"
        icon="pi pi-sync"
        title="Unit Converter"
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
                <!-- Input Unit -->
                <div class="calculator-base__form-group">
                    <label class="form__label">From Unit</label>
                    <Dropdown
                        v-model="formData.inputUnit"
                        :options="UNITS"
                        optionLabel="name"
                        placeholder="Select input unit"
                        class="w-full"
                        @change="onUnitTypeChange"
                    />
                </div>

                <!-- Input Value -->
                <div class="calculator-base__form-group">
                    <label class="form__label">Value</label>
                    <InputNumber
                        v-model="formData.value"
                        class="form__input"
                        placeholder="Enter value to convert"
                        :min="0"
                        :max="MAX_NUMBER"
                        :suffix="formData.inputUnit?.id || ''"
                    />
                </div>

                <!-- Output Unit -->
                <div class="calculator-base__form-group">
                    <label class="form__label">To Unit</label>
                    <Dropdown
                        v-model="formData.outputUnit"
                        :options="compatibleUnits"
                        optionLabel="name"
                        placeholder="Select output unit"
                        class="w-full"
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
interface Unit {
    id: string;
    name: string;
    factor: number;
    type: string;
}

interface ConversionFormData {
    value: number | null;
    inputUnit: Unit | null;
    outputUnit: Unit | null;
}

// Constants
const MAX_NUMBER = 1000000;

const UNITS: Unit[] = [
    // Length units
    { id: 'mm', name: 'Millimeters (mm)', factor: 0.001, type: 'length' },
    { id: 'cm', name: 'Centimeters (cm)', factor: 0.01, type: 'length' },
    { id: 'm', name: 'Meters (m)', factor: 1, type: 'length' },
    { id: 'km', name: 'Kilometers (km)', factor: 1000, type: 'length' },
    { id: 'in', name: 'Inches (in)', factor: 0.0254, type: 'length' },
    { id: 'ft', name: 'Feet (ft)', factor: 0.3048, type: 'length' },

    // Area units
    { id: 'mm2', name: 'Square Millimeters (mm²)', factor: 0.000001, type: 'area' },
    { id: 'cm2', name: 'Square Centimeters (cm²)', factor: 0.0001, type: 'area' },
    { id: 'm2', name: 'Square Meters (m²)', factor: 1, type: 'area' },
    { id: 'km2', name: 'Square Kilometers (km²)', factor: 1000000, type: 'area' },
    { id: 'in2', name: 'Square Inches (in²)', factor: 0.00064516, type: 'area' },
    { id: 'ft2', name: 'Square Feet (ft²)', factor: 0.092903, type: 'area' },
    { id: 'ac', name: 'Acres', factor: 4046.86, type: 'area' },
    { id: 'ha', name: 'Hectares', factor: 10000, type: 'area' },

    // Weight units
    { id: 'mg', name: 'Milligrams (mg)', factor: 0.000001, type: 'weight' },
    { id: 'g', name: 'Grams (g)', factor: 0.001, type: 'weight' },
    { id: 'kg', name: 'Kilograms (kg)', factor: 1, type: 'weight' },
    { id: 'lb', name: 'Pounds (lb)', factor: 0.453592, type: 'weight' },
    { id: 'oz', name: 'Ounces (oz)', factor: 0.0283495, type: 'weight' },
    { id: 't', name: 'Metric Tons', factor: 1000, type: 'weight' },

    // Volume units
    { id: 'ml', name: 'Milliliters (ml)', factor: 0.001, type: 'volume' },
    { id: 'l', name: 'Liters (l)', factor: 1, type: 'volume' },
    { id: 'gal', name: 'Gallons (gal)', factor: 3.78541, type: 'volume' },
    { id: 'qt', name: 'Quarts (qt)', factor: 0.946353, type: 'volume' },
    { id: 'pt', name: 'Pints (pt)', factor: 0.473176, type: 'volume' },
    { id: 'fl_oz', name: 'Fluid Ounces (fl oz)', factor: 0.0295735, type: 'volume' },
];

const explanation = `
<p>This calculator helps you convert between different units of measurement:</p>
<ul>
    <li>Length (mm, cm, m, km, in, ft)</li>
    <li>Area (mm², cm², m², km², in², ft², acres, hectares)</li>
    <li>Weight (mg, g, kg, lb, oz, tons)</li>
    <li>Volume (ml, l, gal, qt, pt, fl oz)</li>
</ul>
<p>Enter a value and select the units to convert between.</p>
`;

// Composables
const { validateForm } = useFormValidation();

// State
const result = ref<string | undefined>(undefined);
const resultFormula = ref<string | undefined>(undefined);
const history = ref<string[]>([]);

// Initial form state
const formData = ref<ConversionFormData>({
    value: null,
    inputUnit: null,
    outputUnit: null,
});

// Computed
const compatibleUnits = computed(() => {
    if (!formData.value.inputUnit) return UNITS;
    return UNITS.filter((unit) => unit.type === formData.value.inputUnit?.type);
});

const isFormValid = computed(() => {
    const validation = {
        value: !!formData.value.value && formData.value.value > 0,
        inputUnit: !!formData.value.inputUnit,
        outputUnit: !!formData.value.outputUnit,
        compatibleUnits: formData.value.inputUnit?.type === formData.value.outputUnit?.type,
    };

    return validateForm(validation);
});

// Methods
const onUnitTypeChange = () => {
    // Reset output unit if it's not compatible with the new input unit type
    if (formData.value.outputUnit?.type !== formData.value.inputUnit?.type) {
        formData.value.outputUnit = null;
    }
};

const formatNumber = (num: number): string => {
    return new Intl.NumberFormat(undefined, {
        maximumFractionDigits: 6,
        minimumFractionDigits: 0,
    }).format(num);
};

const calculate = () => {
    if (
        !isFormValid.value ||
        !formData.value.value ||
        !formData.value.inputUnit ||
        !formData.value.outputUnit
    )
        return;

    try {
        // Convert to base unit first, then to target unit
        const baseValue = formData.value.value * formData.value.inputUnit.factor;
        const convertedValue = baseValue / formData.value.outputUnit.factor;

        const formattedInput = formatNumber(formData.value.value);
        const formattedOutput = formatNumber(convertedValue);

        result.value = `${formattedOutput} ${formData.value.outputUnit.id}`;
        resultFormula.value = `${formattedInput} ${formData.value.inputUnit.id} = ${formattedOutput} ${formData.value.outputUnit.id}`;

        // Add calculation to history
        history.value = [
            `${formattedInput} ${formData.value.inputUnit.id} → ${formattedOutput} ${formData.value.outputUnit.id}`,
            ...history.value.slice(0, 4),
        ];
    } catch (err) {
        result.value = undefined;
        resultFormula.value = undefined;
    }
};

const resetForm = () => {
    formData.value = {
        value: null,
        inputUnit: null,
        outputUnit: null,
    };
    result.value = undefined;
    resultFormula.value = undefined;
};
</script>

<style scoped>
.calculator-base__form {
    width: 100%;
}

.form__input {
    width: 100%;
}

.form__divider {
    margin: 1.5rem 0;
    border: none;
    border-top: 1px solid #b0b3b7;
}
</style>
