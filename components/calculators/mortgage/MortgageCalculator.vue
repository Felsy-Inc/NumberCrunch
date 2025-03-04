<template>
    <Dialog
        v-model:visible="showSchedule"
        modal
        :style="{ width: '90vw' }"
        :maximizable="true"
        :closable="true"
        closeIcon="pi pi-times"
    >
        <template #header>
            <div class="text-2xl font-bold">Payment Schedule</div>
        </template>
        <PaymentSchedule
            ref="scheduleRef"
            :loan-amount="scheduleProps.loanAmount"
            :interest-rate="scheduleProps.interestRate"
            :loan-term="scheduleProps.loanTerm"
            :mortgage-type="formData.mortgageType"
            :property-tax="scheduleProps.propertyTax"
            :insurance="scheduleProps.insurance"
            :currency="userPreferences.currency"
        />
    </Dialog>
    <CalculatorBase
        color="emerald"
        icon="home"
        title="Mortgage Calculator"
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
                <!-- Mortgage Type -->
                <div class="form-group">
                    <label class="form__label">Mortgage Type</label>
                    <div class="form__radio-group">
                        <RadioButton
                            v-model="formData.mortgageType"
                            value="annuity"
                            inputId="annuity"
                        />
                        <label for="annuity">Annuity</label>
                        <RadioButton
                            v-model="formData.mortgageType"
                            value="linear"
                            inputId="linear"
                        />
                        <label for="linear">Linear</label>
                    </div>
                </div>

                <!-- Property Value -->
                <div class="form-group">
                    <label class="form__label">Property Value</label>
                    <InputNumber
                        v-model="formData.propertyValue"
                        class="form__input"
                        placeholder="Enter property value"
                        mode="currency"
                        :currency="userPreferences.currency"
                        :min="0"
                        :maxFractionDigits="0"
                        @input="(e) => (formData.propertyValue = Number(e.value))"
                    />
                </div>

                <!-- Interest Rate -->
                <div class="form-group">
                    <label class="form__label">Annual Interest Rate</label>
                    <div class="form__input-wrapper">
                        <InputNumber
                            v-model="formData.interestRate"
                            class="form__input"
                            placeholder="Enter interest rate"
                            :min="0"
                            :max="100"
                            :maxFractionDigits="2"
                            @input="(e) => (formData.interestRate = Number(e.value))"
                        />
                        <span class="form__input-symbol">%</span>
                    </div>
                </div>

                <!-- Loan Term -->
                <div class="form-group">
                    <label class="form__label">Mortgage Term</label>
                    <InputNumber
                        v-model="formData.loanTerm"
                        class="form__input"
                        :min="1"
                        :max="40"
                        placeholder="Enter mortgage term in years"
                        @input="(e) => (formData.loanTerm = Number(e.value))"
                    />
                </div>

                <!-- Down Payment -->
                <div class="form-group">
                    <label class="form__label mb-0">Down Payment</label>
                    <div class="form__radio-group">
                        <RadioButton
                            v-model="formData.hasDownPayment"
                            :value="false"
                            inputId="downPaymentNo"
                        />
                        <label for="downPaymentNo">No</label>
                        <RadioButton
                            v-model="formData.hasDownPayment"
                            :value="true"
                            inputId="downPaymentYes"
                        />
                        <label for="downPaymentYes">Yes</label>
                    </div>
                    <template v-if="formData.hasDownPayment">
                        <div class="form__input-wrapper">
                            <InputNumber
                                v-model="formData.downPaymentPercent"
                                class="form__input"
                                placeholder="Enter down payment percentage"
                                :min="0"
                                :max="100"
                                :maxFractionDigits="2"
                                @input="(e) => (formData.downPaymentPercent = Number(e.value))"
                            />
                            <span class="form__percentage-symbol">%</span>
                        </div>
                        <InputNumber
                            v-model="downPaymentAmount"
                            class="form__input mt-2"
                            placeholder="Down payment amount"
                            mode="currency"
                            :currency="userPreferences.currency"
                            :min="0"
                            @input="(e) => (formData.downPaymentPercent = Number(e.value))"
                        />
                    </template>
                </div>

                <!-- Additional Costs -->
                <div class="form-group">
                    <label class="form__label mb-0">Additional Monthly Costs</label>
                    <div class="form__radio-group">
                        <RadioButton
                            v-model="formData.hasAdditionalCosts"
                            :value="false"
                            inputId="additionalCostsNo"
                        />
                        <label for="additionalCostsNo">No</label>
                        <RadioButton
                            v-model="formData.hasAdditionalCosts"
                            :value="true"
                            inputId="additionalCostsYes"
                        />
                        <label for="additionalCostsYes">Yes</label>
                    </div>
                    <template v-if="formData.hasAdditionalCosts">
                        <InputNumber
                            v-model="formData.propertyTax"
                            class="form__input mb-2"
                            placeholder="Property Tax"
                            mode="currency"
                            :currency="userPreferences.currency"
                            :min="0"
                            @input="(e) => (formData.propertyTax = Number(e.value))"
                        />
                        <InputNumber
                            v-model="formData.insurance"
                            class="form__input"
                            placeholder="Insurance"
                            mode="currency"
                            :currency="userPreferences.currency"
                            :min="0"
                            @input="(e) => (formData.insurance = Number(e.value))"
                        />
                    </template>
                </div>
            </form>
        </template>

        <template #after-result v-if="result">
            <Button class="p-button p-button-primary mt-4 w-full" @click="handleScheduleAction">
                <i class="pi" :class="isMobile ? 'pi-download' : 'pi-table'"></i>
                {{ isMobile ? 'Download Payment Schedule' : 'View Payment Schedule' }}
            </Button>
        </template>
    </CalculatorBase>
</template>

<script setup lang="ts">
import CalculatorBase from '~/components/calculators/CalculatorBase.vue';
import PaymentSchedule from './PaymentSchedule.vue';
import { ref, computed, nextTick } from 'vue';
import { useFormValidation } from '~/composables/useFormValidation';
import { useCurrencyFormatter } from '~/composables/useCurrencyFormatter';
import { useWindowSize } from '@vueuse/core';
import { useUserPreferencesStore } from '~/stores/userPreferences';

// Types
interface MortgageFormData {
    propertyValue: number | null;
    hasDownPayment: boolean;
    downPaymentPercent: number | null;
    hasAdditionalCosts: boolean;
    mortgageType: 'annuity' | 'linear';
    interestRate: number | null;
    loanTerm: number | null;
    termUnit: 'years';
    propertyTax: number | null;
    insurance: number | null;
}

// Update explanation for mortgage-specific content
const explanation = `
<p>This calculator supports two types of mortgages:</p>
<p><strong>Annuity Mortgage:</strong> Fixed monthly payments throughout the term</p>
<p class="formula">
<math>
        <mrow>
            <mi>P</mi>
            <mo>=</mo>
            <mi>L</mi>
            <mo>[</mo>
            <mi>c</mi>
            <mo>(</mo>
            <mn>1</mn>
            <mo>+</mo>
            <mi>c</mi>
            <mo>)</mo>
            <mi>n</mi>
            <mo>]</mo>
            <mo>/</mo>
            <mo>[</mo>
            <mo>(</mo>
            <mn>1</mn>
            <mo>+</mo>
            <mi>c</mi>
            <mo>)</mo>
            <mi>n</mi>
            <mo>-</mo>
            <mn>1</mn>
            <mo>]</mo>
        </mrow>
    </math>
</p>
</p>

<p><strong>Linear Mortgage:</strong> Decreasing monthly payments with fixed principal portion</p>
<p class="formula">
    <math>
        <mrow>
            <mi>P</mi>
            <mo>/</mo>
            <mi>n</mi>
            <mo>+</mo>
            <mi>P</mi>
            <mo>×</mo>
            <mi>r</mi>
        </mrow>
    </math>
</p>
<p>
    P = Monthly Payment<br>
    L = Loan Amount<br>
    r = Monthly Interest Rate<br>
    n = Total Number of Months
</p>
`;

// Refs
const result = ref<string | undefined>(undefined);
const resultFormula = ref<string | undefined>(undefined);
const history = ref<string[]>([]);
const showSchedule = ref(false);
const scheduleRef = ref<InstanceType<typeof PaymentSchedule> | null>(null);

// Initial form state
const formData = ref<MortgageFormData>({
    propertyValue: null,
    hasDownPayment: false,
    downPaymentPercent: 20,
    hasAdditionalCosts: false,
    mortgageType: 'annuity',
    interestRate: null,
    loanTerm: null,
    termUnit: 'years',
    propertyTax: null,
    insurance: null,
});

// Composables
const { formatCurrency } = useCurrencyFormatter();
const { validateForm } = useFormValidation();
const userPreferences = useUserPreferencesStore();

// Computed
const isFormValid = computed(() => {
    return validateForm({
        propertyValue: (formData.value.propertyValue ?? 0) > 0,
        downPaymentPercent: (formData.value.downPaymentPercent ?? 0) >= 0,
        interestRate:
            (formData.value.interestRate ?? 0) > 0 && (formData.value.interestRate ?? 0) <= 100,
        loanTerm: (formData.value.loanTerm ?? 0) > 0,
    });
});

const downPaymentAmount = computed(() => {
    if (
        !formData.value.propertyValue ||
        !formData.value.hasDownPayment ||
        formData.value.downPaymentPercent === null
    )
        return null;
    return (formData.value.propertyValue * formData.value.downPaymentPercent) / 100;
});

const loanAmount = computed(() => {
    if (!formData.value.propertyValue) return null;
    return (
        formData.value.propertyValue -
        (formData.value.hasDownPayment ? downPaymentAmount.value ?? 0 : 0)
    );
});

const scheduleProps = computed(() => ({
    loanAmount: loanAmount.value || undefined,
    interestRate: formData.value.interestRate || undefined,
    loanTerm: formData.value.loanTerm || undefined,
    propertyTax: formData.value.propertyTax || undefined,
    insurance: formData.value.insurance || undefined,
}));

// Methods
const updateDownPaymentPercent = (e: { value: number | null }) => {
    if (e.value && formData.value.propertyValue) {
        formData.value.downPaymentPercent = (e.value / formData.value.propertyValue) * 100;
    }
};

const calculate = () => {
    if (!isFormValid.value || !loanAmount.value) return;

    const monthlyRate = (formData.value.interestRate as number) / 100 / 12;
    const totalMonths = (formData.value.loanTerm as number) * 12;
    const principal = loanAmount.value;

    let monthlyPayment: number;
    let additionalCosts = (formData.value.propertyTax ?? 0) + (formData.value.insurance ?? 0);

    if (formData.value.mortgageType === 'annuity') {
        monthlyPayment = calculateAnnuityPayment(principal, monthlyRate, totalMonths);
    } else {
        monthlyPayment = calculateLinearPayment(principal, monthlyRate, totalMonths);
    }

    updateResults(monthlyPayment, principal, totalMonths, additionalCosts);
};

const calculateAnnuityPayment = (
    principal: number,
    monthlyRate: number,
    totalMonths: number
): number => {
    return (
        (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
    );
};

const calculateLinearPayment = (
    principal: number,
    monthlyRate: number,
    totalMonths: number
): number => {
    const monthlyPrincipal = principal / totalMonths;
    const firstMonthInterest = principal * monthlyRate;
    return monthlyPrincipal + firstMonthInterest;
};

const resetForm = () => {
    formData.value = {
        propertyValue: null,
        hasDownPayment: false,
        downPaymentPercent: 20,
        hasAdditionalCosts: false,
        mortgageType: 'annuity',
        interestRate: null,
        loanTerm: null,
        termUnit: 'years',
        propertyTax: null,
        insurance: null,
    };
    result.value = undefined;
    resultFormula.value = undefined;
    history.value = [];
    showSchedule.value = false;
};

const updateResults = (
    monthlyPayment: number,
    principal: number,
    totalMonths: number,
    additionalCosts: number
) => {
    const totalMonthly = monthlyPayment + additionalCosts;
    const totalPayment = totalMonthly * totalMonths;
    const totalInterest = totalPayment - principal;

    result.value = formatCurrency(totalMonthly, userPreferences.currency);
    resultFormula.value = `Monthly Payment: ${formatCurrency(
        totalMonthly,
        userPreferences.currency
    )}<br>Total Interest: ${formatCurrency(
        totalInterest,
        userPreferences.currency
    )}<br>Total Payment: ${formatCurrency(totalPayment, userPreferences.currency)}`;

    history.value = [
        `${formatCurrency(principal, userPreferences.currency)} mortgage at ${
            formData.value.interestRate
        }% for ${formData.value.loanTerm} ${formData.value.termUnit} = ${formatCurrency(
            totalMonthly,
            userPreferences.currency
        )}/month`,
        ...history.value.slice(0, 4),
    ];
};

const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);

const handleScheduleAction = async () => {
    if (isMobile.value) {
        showSchedule.value = true; // Show dialog first
        await nextTick(); // Wait for component to mount
        if (scheduleRef.value?.downloadPDF) {
            scheduleRef.value.downloadPDF();
            showSchedule.value = false; // Hide dialog after download
        }
    } else {
        showSchedule.value = !showSchedule.value;
    }
};
</script>
