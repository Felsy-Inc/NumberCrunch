<template>
    <CalculatorBase
        color="blue"
        icon="pi pi-box"
        title="Volume Calculator"
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
                    <!-- Rectangular Prism -->
                    <template v-if="formData.shape.id === 'rectangular-prism'">
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

                    <!-- Cylinder -->
                    <template v-if="formData.shape.id === 'cylinder'">
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

                    <!-- Cone -->
                    <template v-if="formData.shape.id === 'cone'">
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

                    <!-- Sphere -->
                    <template v-if="formData.shape.id === 'sphere'">
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
                </template>

                <hr class="form__divider" />

                <div class="calculator-base__form-group">
                    <label class="form__label">Output Unit</label>
                    <Dropdown
                        v-model="formData.outputUnit"
                        :options="VOLUME_UNITS"
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
    height?: number;
    radius?: number;
    base?: number;
}

interface Shape {
    id: 'rectangular-prism' | 'cylinder' | 'cone' | 'sphere';
    name: string;
}

interface AreaFormData {
    shape: Shape | null;
    dimensions: Dimensions;
    inputUnit: (typeof LENGTH_UNITS)[0] | null;
    outputUnit: (typeof VOLUME_UNITS)[0] | null;
}

// Constants
const MAX_NUMBER = 1000000;
const SHAPES: Shape[] = [
    { id: 'rectangular-prism', name: 'Rectangular Prism' },
    { id: 'cylinder', name: 'Cylinder' },
    { id: 'cone', name: 'Cone' },
    { id: 'sphere', name: 'Sphere' },
];

const LENGTH_UNITS = [
    { id: 'mm', name: 'Millimeters (mm)', factor: 0.001 },
    { id: 'cm', name: 'Centimeters (cm)', factor: 0.01 },
    { id: 'm', name: 'Meters (m)', factor: 1 },
    { id: 'km', name: 'Kilometers (km)', factor: 1000 },
    { id: 'in', name: 'Inches (in)', factor: 0.0254 },
    { id: 'ft', name: 'Feet (ft)', factor: 0.3048 },
];

const VOLUME_UNITS = [
    { id: 'mm3', name: 'Cubic Millimeters (mm³)', factor: 0.000000001 },
    { id: 'cm3', name: 'Cubic Centimeters (cm³)', factor: 0.000001 },
    { id: 'ml', name: 'Milliliters (mL)', factor: 0.000001 },
    { id: 'l', name: 'Litres (L)', factor: 0.001 },
    { id: 'm3', name: 'Cubic Meters (m³)', factor: 1 },
    { id: 'km3', name: 'Cubic Kilometers (km³)', factor: 1000000000 },
    { id: 'in3', name: 'Cubic Inches (in³)', factor: 0.0000163871 },
    { id: 'ft3', name: 'Cubic Feet (ft³)', factor: 0.0283168 },
    { id: 'gal', name: 'Gallons (gal)', factor: 0.00378541 },
    { id: 'qt', name: 'Quarts (qt)', factor: 0.000946353 },
    { id: 'pt', name: 'Pints (pt)', factor: 0.000473176 },
    { id: 'cup', name: 'Cups', factor: 0.000236588 },
];

const explanation = `
<p>This calculator helps you find the volume of different 3D shapes:</p>
<ul>
    <li>Rectangular Prism: Volume = length × width × height</li>
    <li>Cylinder: Volume = π × radius² × height</li>
    <li>Cone: Volume = ⅓ × π × radius² × height</li>
    <li>Sphere: Volume = ⁴⁄₃ × π × radius³</li>
</ul>
<p>Enter the required dimensions in your preferred units to calculate the volume.</p>
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
        case 'rectangular-prism':
            validation.length =
                !!formData.value.dimensions.length && formData.value.dimensions.length > 0;
            validation.width =
                !!formData.value.dimensions.width && formData.value.dimensions.width > 0;
            validation.height =
                !!formData.value.dimensions.height && formData.value.dimensions.height > 0;
            break;
        case 'cylinder':
            validation.radius =
                !!formData.value.dimensions.radius && formData.value.dimensions.radius > 0;
            validation.height =
                !!formData.value.dimensions.height && formData.value.dimensions.height > 0;
            break;
        case 'cone':
            validation.radius =
                !!formData.value.dimensions.radius && formData.value.dimensions.radius > 0;
            validation.height =
                !!formData.value.dimensions.height && formData.value.dimensions.height > 0;
            break;
        case 'sphere':
            validation.radius =
                !!formData.value.dimensions.radius && formData.value.dimensions.radius > 0;
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
        let volume: number;
        let formula: string;
        const inputFactor = formData.value.inputUnit.factor;

        switch (formData.value.shape.id) {
            case 'rectangular-prism': {
                const length = formData.value.dimensions.length! * inputFactor;
                const width = formData.value.dimensions.width! * inputFactor;
                const height = formData.value.dimensions.height! * inputFactor;
                volume = length * width * height;
                formula = `${formatNumber(formData.value.dimensions.length!)} ${
                    formData.value.inputUnit.id
                } × ${formatNumber(formData.value.dimensions.width!)} ${
                    formData.value.inputUnit.id
                } × ${formatNumber(formData.value.dimensions.height!)} ${
                    formData.value.inputUnit.id
                }`;
                break;
            }
            case 'cylinder': {
                const radius = formData.value.dimensions.radius! * inputFactor;
                const height = formData.value.dimensions.height! * inputFactor;
                volume = Math.PI * radius * radius * height;
                formula = `π × (${formatNumber(formData.value.dimensions.radius!)} ${
                    formData.value.inputUnit.id
                })² × ${formatNumber(formData.value.dimensions.height!)} ${
                    formData.value.inputUnit.id
                }`;
                break;
            }
            case 'cone': {
                const radius = formData.value.dimensions.radius! * inputFactor;
                const height = formData.value.dimensions.height! * inputFactor;
                volume = (Math.PI * radius * radius * height) / 3;
                formula = `⅓ × π × (${formatNumber(formData.value.dimensions.radius!)} ${
                    formData.value.inputUnit.id
                })² × ${formatNumber(formData.value.dimensions.height!)} ${
                    formData.value.inputUnit.id
                }`;
                break;
            }
            case 'sphere': {
                const radius = formData.value.dimensions.radius! * inputFactor;
                volume = (4 / 3) * Math.PI * radius * radius * radius;
                formula = `⁴⁄₃ × π × (${formatNumber(formData.value.dimensions.radius!)} ${
                    formData.value.inputUnit.id
                })³`;
                break;
            }
            default:
                throw new Error('Invalid shape');
        }

        // Convert to output unit
        const convertedVolume = volume / formData.value.outputUnit.factor;
        const formattedVolume = formatNumber(convertedVolume);

        result.value = `${formattedVolume} ${formData.value.outputUnit.id}`;
        resultFormula.value = `Volume = ${formula} = ${formattedVolume} ${formData.value.outputUnit.id}`;

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
