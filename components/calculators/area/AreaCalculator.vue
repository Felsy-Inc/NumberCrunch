<template>
    <CalculatorBase
        color="blue"
        icon="pi pi-stop"
        title="Area Calculator"
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
                <!-- Shape Selection -->
                <div class="calculator-base__form-group">
                    <label class="form__label">Shape</label>
                    <Dropdown
                        v-model="formData.shape"
                        :options="SHAPES"
                        optionLabel="name"
                        placeholder="Select a shape"
                        class="w-full"
                    />
                </div>

                <!-- Unit Selection -->
                <div class="calculator-base__form-group">
                    <label class="form__label">Input Unit</label>
                    <Dropdown
                        v-model="formData.inputUnit"
                        :options="LENGTH_UNITS"
                        optionLabel="name"
                        placeholder="Select input unit"
                        class="w-full"
                    />
                </div>

                <!-- Dynamic inputs based on selected shape -->
                <template v-if="formData.shape">
                    <hr class="form__divider" />
                    <!-- Rectangle -->
                    <template v-if="formData.shape.id === 'rectangle'">
                        <div class="calculator-base__form-group">
                            <label class="form__label">Length</label>
                            <InputNumber
                                v-model="formData.dimensions.length"
                                class="form__input"
                                placeholder="Enter length"
                                :min="0"
                                :max="MAX_NUMBER"
                                :suffix="formData.inputUnit?.id || ' units'"
                            />
                        </div>
                        <div class="calculator-base__form-group">
                            <label class="form__label">Width</label>
                            <InputNumber
                                v-model="formData.dimensions.width"
                                class="form__input"
                                placeholder="Enter width"
                                :min="0"
                                :max="MAX_NUMBER"
                                :suffix="formData.inputUnit?.id || ' units'"
                            />
                        </div>
                    </template>

                    <!-- Circle -->
                    <template v-if="formData.shape.id === 'circle'">
                        <div class="calculator-base__form-group">
                            <label class="form__label">Radius</label>
                            <InputNumber
                                v-model="formData.dimensions.radius"
                                class="form__input"
                                placeholder="Enter radius"
                                :min="0"
                                :max="MAX_NUMBER"
                                :suffix="formData.inputUnit?.id || ' units'"
                            />
                        </div>
                    </template>

                    <!-- Triangle -->
                    <template v-if="formData.shape.id === 'triangle'">
                        <div class="calculator-base__form-group">
                            <label class="form__label">Base</label>
                            <InputNumber
                                v-model="formData.dimensions.base"
                                class="form__input"
                                placeholder="Enter base"
                                :min="0"
                                :max="MAX_NUMBER"
                                :suffix="formData.inputUnit?.id || ' units'"
                            />
                        </div>
                        <div class="calculator-base__form-group">
                            <label class="form__label">Height</label>
                            <InputNumber
                                v-model="formData.dimensions.height"
                                class="form__input"
                                placeholder="Enter height"
                                :min="0"
                                :max="MAX_NUMBER"
                                :suffix="formData.inputUnit?.id || ' units'"
                            />
                        </div>
                    </template>
                </template>

                <hr class="form__divider" />

                <div class="calculator-base__form-group">
                    <label class="form__label">Output Unit</label>
                    <Dropdown
                        v-model="formData.outputUnit"
                        :options="AREA_UNITS"
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
interface Dimensions {
    length?: number;
    width?: number;
    radius?: number;
    base?: number;
    height?: number;
}

interface Shape {
    id: 'rectangle' | 'circle' | 'triangle';
    name: string;
}

interface AreaFormData {
    shape: Shape | null;
    dimensions: Dimensions;
    inputUnit: (typeof LENGTH_UNITS)[0] | null;
    outputUnit: (typeof AREA_UNITS)[0] | null;
}

// Constants
const MAX_NUMBER = 1000000;
const SHAPES: Shape[] = [
    { id: 'rectangle', name: 'Rectangle' },
    { id: 'circle', name: 'Circle' },
    { id: 'triangle', name: 'Triangle' },
];

const LENGTH_UNITS = [
    { id: 'mm', name: 'Millimeters (mm)', factor: 0.001 },
    { id: 'cm', name: 'Centimeters (cm)', factor: 0.01 },
    { id: 'm', name: 'Meters (m)', factor: 1 },
    { id: 'km', name: 'Kilometers (km)', factor: 1000 },
    { id: 'in', name: 'Inches (in)', factor: 0.0254 },
    { id: 'ft', name: 'Feet (ft)', factor: 0.3048 },
];

const AREA_UNITS = [
    { id: 'mm2', name: 'Square Millimeters (mm²)', factor: 0.000001 },
    { id: 'cm2', name: 'Square Centimeters (cm²)', factor: 0.0001 },
    { id: 'm2', name: 'Square Meters (m²)', factor: 1 },
    { id: 'km2', name: 'Square Kilometers (km²)', factor: 1000000 },
    { id: 'in2', name: 'Square Inches (in²)', factor: 0.00064516 },
    { id: 'ft2', name: 'Square Feet (ft²)', factor: 0.092903 },
    { id: 'ac', name: 'Acres', factor: 4046.86 },
    { id: 'ha', name: 'Hectares', factor: 10000 },
];

const explanation = `
<p>This calculator helps you find the area of different shapes:</p>
<ul>
    <li>Rectangle: Area = length × width</li>
    <li>Circle: Area = π × radius²</li>
    <li>Triangle: Area = ½ × base × height</li>
</ul>
<p>Enter the required dimensions in your preferred units to calculate the area.</p>
`;

// Composables
const { validateForm } = useFormValidation();

// State
const result = ref<string | undefined>(undefined);
const resultFormula = ref<string | undefined>(undefined);
const history = ref<string[]>([]);

// Initial form state
const formData = ref<AreaFormData>({
    shape: null,
    dimensions: {},
    inputUnit: null,
    outputUnit: null,
});

// Computed
const isFormValid = computed(() => {
    if (!formData.value.shape || !formData.value.inputUnit || !formData.value.outputUnit)
        return false;

    const validation: Record<string, boolean> = {
        shapeSelected: !!formData.value.shape,
        inputUnit: !!formData.value.inputUnit,
        outputUnit: !!formData.value.outputUnit,
    };

    switch (formData.value.shape.id) {
        case 'rectangle':
            validation.length =
                !!formData.value.dimensions.length && formData.value.dimensions.length > 0;
            validation.width =
                !!formData.value.dimensions.width && formData.value.dimensions.width > 0;
            break;
        case 'circle':
            validation.radius =
                !!formData.value.dimensions.radius && formData.value.dimensions.radius > 0;
            break;
        case 'triangle':
            validation.base =
                !!formData.value.dimensions.base && formData.value.dimensions.base > 0;
            validation.height =
                !!formData.value.dimensions.height && formData.value.dimensions.height > 0;
            break;
    }

    return validateForm(validation);
});

const formatNumber = (num: number): string => {
    return new Intl.NumberFormat().format(num);
};

const calculate = () => {
    if (
        !isFormValid.value ||
        !formData.value.shape ||
        !formData.value.inputUnit ||
        !formData.value.outputUnit
    )
        return;

    try {
        let area: number;
        let formula: string;
        const inputFactor = formData.value.inputUnit.factor;

        switch (formData.value.shape.id) {
            case 'rectangle': {
                const length = formData.value.dimensions.length! * inputFactor;
                const width = formData.value.dimensions.width! * inputFactor;
                area = length * width;
                formula = `${formatNumber(formData.value.dimensions.length!)} ${
                    formData.value.inputUnit.id
                } × ${formatNumber(formData.value.dimensions.width!)} ${
                    formData.value.inputUnit.id
                }`;
                break;
            }
            case 'circle': {
                const radius = formData.value.dimensions.radius! * inputFactor;
                area = Math.PI * radius * radius;
                formula = `π × (${formatNumber(formData.value.dimensions.radius!)} ${
                    formData.value.inputUnit.id
                })²`;
                break;
            }
            case 'triangle': {
                const base = formData.value.dimensions.base! * inputFactor;
                const height = formData.value.dimensions.height! * inputFactor;
                area = (base * height) / 2;
                formula = `½ × ${formatNumber(formData.value.dimensions.base!)} ${
                    formData.value.inputUnit.id
                } × ${formatNumber(formData.value.dimensions.height!)} ${
                    formData.value.inputUnit.id
                }`;
                break;
            }
            default:
                throw new Error('Invalid shape');
        }

        // Convert to output unit
        const convertedArea = area / formData.value.outputUnit.factor;
        const formattedArea = formatNumber(convertedArea);

        result.value = `${formattedArea} ${formData.value.outputUnit.id}`;
        resultFormula.value = `Area = ${formula} = ${formattedArea} ${formData.value.outputUnit.id}`;

        // Add calculation to history
        history.value = [
            `${formData.value.shape.name}: ${resultFormula.value}`,
            ...history.value.slice(0, 4),
        ];
    } catch (err) {
        result.value = undefined;
        resultFormula.value = undefined;
    }
};

const resetForm = () => {
    formData.value = {
        shape: null,
        dimensions: {},
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
